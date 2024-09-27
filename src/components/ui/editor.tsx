"use client";

import { useDebouncedCallback } from "use-debounce";
import { EditorCommand, EditorCommandEmpty, EditorCommandItem, EditorCommandList, EditorContent, EditorInstance, EditorRoot } from "novel";
import {
	Code,
	Heading1,
	Heading2,
	Heading3,
	ImageIcon,
	List,
	ListOrdered,
	Text,
	TextQuote,
} from "lucide-react";
import { createSuggestionItems, handleCommandNavigation } from "novel/extensions";
import { createImageUpload } from "novel/plugins";
import { toast } from "sonner";
import { Command, renderItems } from "novel/extensions";
import { UploadImagesPlugin } from "novel/plugins";
import { handleImageDrop, handleImagePaste } from "novel/plugins";

import {
	TiptapImage,
	TiptapLink,
	UpdatedImage,
	TaskList,
	TaskItem,
	HorizontalRule,
	StarterKit,
	Placeholder,
} from "novel/extensions";

import { cx } from "class-variance-authority";

const placeholder = Placeholder;

const tiptapLink = TiptapLink.configure({
	HTMLAttributes: {
		class: cx(
			"text-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer"
		),
	},
});

const taskList = TaskList.configure({
	HTMLAttributes: {
		class: cx("not-prose pl-2"),
	},
});
const taskItem = TaskItem.configure({
	HTMLAttributes: {
		class: cx("flex items-start my-4"),
	},
	nested: true,
});

const horizontalRule = HorizontalRule.configure({
	HTMLAttributes: {
		class: cx("mt-4 mb-6 border-t border-border-foreground"),
	},
});

const starterKit = StarterKit.configure({
	bulletList: {
		HTMLAttributes: {
			class: cx("list-disc list-outside leading-3 -mt-2"),
		},
	},
	orderedList: {
		HTMLAttributes: {
			class: cx("list-decimal list-outside leading-3 -mt-2"),
		},
	},
	listItem: {
		HTMLAttributes: {
			class: cx("leading-normal -mb-2"),
		},
	},
	blockquote: {
		HTMLAttributes: {
			class: cx("border-l-4 border-primary"),
		},
	},
	codeBlock: {
		HTMLAttributes: {
			class: cx("rounded-sm bg-muted border p-5 font-mono font-medium"),
		},
	},
	code: {
		HTMLAttributes: {
			class: cx("rounded-md bg-muted  px-1.5 py-1 font-mono font-medium"),
			spellcheck: "false",
		},
	},
	horizontalRule: false,
	dropcursor: {
		color: "#DBEAFE",
		width: 4,
	},
	gapcursor: false,
});

const tiptapImage = TiptapImage.extend({
	addProseMirrorPlugins() {
		return [
			UploadImagesPlugin({
				imageClass: cx("opacity-40 rounded-lg border border-stone-200"),
			}),
		];
	},
}).configure({
	allowBase64: true,
	HTMLAttributes: {
		class: cx("rounded-lg border border-border"),
	},
});

const defaultExtensions = [
	tiptapImage,
	starterKit,
	placeholder,
  tiptapLink,
	TiptapLink,
	TiptapImage,
	UpdatedImage,
	taskList,
	taskItem,
	horizontalRule,
];

export const suggestionItems = createSuggestionItems([
	{
		title: "Text",
		description: "Just start typing with plain text.",
		searchTerms: ["p", "paragraph"],
		icon: <Text size={18} />,
		command: ({ editor, range }) => {
			editor
				.chain()
				.focus()
				.deleteRange(range)
				.toggleNode("paragraph", "paragraph")
				.run();
		},
	},
	{
		title: "Heading 1",
		description: "Big section heading.",
		searchTerms: ["title", "big", "large"],
		icon: <Heading1 size={18} />,
		command: ({ editor, range }) => {
			editor
				.chain()
				.focus()
				.deleteRange(range)
				.setNode("heading", { level: 1 })
				.run();
		},
	},
	{
		title: "Heading 2",
		description: "Medium section heading.",
		searchTerms: ["subtitle", "medium"],
		icon: <Heading2 size={18} />,
		command: ({ editor, range }) => {
			editor
				.chain()
				.focus()
				.deleteRange(range)
				.setNode("heading", { level: 2 })
				.run();
		},
	},
	{
		title: "Heading 3",
		description: "Small section heading.",
		searchTerms: ["subtitle", "small"],
		icon: <Heading3 size={18} />,
		command: ({ editor, range }) => {
			editor
				.chain()
				.focus()
				.deleteRange(range)
				.setNode("heading", { level: 3 })
				.run();
		},
	},
	{
		title: "Bullet List",
		description: "Create a simple bullet list.",
		searchTerms: ["unordered", "point"],
		icon: <List size={18} />,
		command: ({ editor, range }) => {
			editor.chain().focus().deleteRange(range).toggleBulletList().run();
		},
	},
	{
		title: "Numbered List",
		description: "Create a list with numbering.",
		searchTerms: ["ordered"],
		icon: <ListOrdered size={18} />,
		command: ({ editor, range }) => {
			editor.chain().focus().deleteRange(range).toggleOrderedList().run();
		},
	},
	{
		title: "Quote",
		description: "Capture a quote.",
		searchTerms: ["blockquote"],
		icon: <TextQuote size={18} />,
		command: ({ editor, range }) =>
			editor
				.chain()
				.focus()
				.deleteRange(range)
				.toggleNode("paragraph", "paragraph")
				.toggleBlockquote()
				.run(),
	},
	{
		title: "Code",
		description: "Capture a code snippet.",
		searchTerms: ["codeblock"],
		icon: <Code size={18} />,
		command: ({ editor, range }) =>
			editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
	},
	// {
	// 	title: "Image",
	// 	description: "Upload an image from your computer.",
	// 	searchTerms: ["photo", "picture", "media"],
	// 	icon: <ImageIcon size={18} />,
	// 	command: ({ editor, range }) => {
	// 		editor.chain().focus().deleteRange(range).run();
	// 		// upload image
	// 		const input = document.createElement("input");
	// 		input.type = "file";
	// 		input.accept = "image/*";
	// 		input.onchange = async () => {
	// 			if (input.files?.length) {
	// 				const file = input.files[0];
	// 				const pos = editor.view.state.selection.from;
	// 				uploadFn(file, editor.view, pos);
	// 			}
	// 		};
	// 		input.click();
	// 	},
	// },
]);

const slashCommand = Command.configure({
	suggestion: {
		items: () => suggestionItems,
		render: renderItems,
	},
});

const onUpload = async (file: File) => {
	const promise = fetch("/api/upload", {
		method: "POST",
		headers: {
			"content-type": file?.type || "application/octet-stream",
			"x-vercel-filename": file?.name || "image.png",
		},
		body: file,
	});

	//This should return a src of the uploaded image
	return promise;
};

export const uploadFn = createImageUpload({
	onUpload,
	validateFn: (file) => {
		if (!file.type.includes("image/")) {
			toast.error("File type not supported.");
			return false;
		} else if (file.size / 1024 / 1024 > 20) {
			toast.error("File size too big (max 20MB).");
			return false;
		}
		return true;
	},
});

interface EditorProps {
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  disabled?: boolean;
}

const Editor = ({ onChange, value, disabled, onFocus }: EditorProps) => {
  const parsedVal = JSON.parse(value || "{}");
	const debouncedUpdates = useDebouncedCallback(
		async (editor: EditorInstance) => {
			const json = editor.getJSON();
			onChange?.(JSON.stringify(json));
		},
		500
	);

	return (
		<EditorRoot>
			<EditorContent
				initialContent={parsedVal}
        onFocus={() => onFocus?.()}
				extensions={[...defaultExtensions, slashCommand]}
				editorProps={{
					handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
					handleDrop: (view, event, _slice, moved) =>
						handleImageDrop(view, event, moved, uploadFn),
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          attributes: {
            class: `prose prose-lg text-foreground prose-headings:font-title font-default focus:outline-none max-w-full border border-border min-h-40 rounded-md overflow-hidden transition py-3 px-3 font-medium font-archivo text-sm focus-within:shadow-[0_0_0_1px_white,0_0_0_3px_hsl(var(--primary))]`,
          },
          editable: () => !disabled
				}}
				onUpdate={({ editor }) => debouncedUpdates(editor)}
			>
				<EditorCommand className="z-50 h-auto max-h-[330px]  w-72 overflow-y-auto rounded-md border border-border bg-background px-1 py-2 shadow-md transition-all">
					<EditorCommandEmpty className="px-2 text-foreground">
						No results
					</EditorCommandEmpty>
					<EditorCommandList>
						{suggestionItems.map((item) => (
							<EditorCommandItem
								value={item.title}
								onCommand={(val) => item?.command?.(val)}
								className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm border-2 border-background hover:border-foreground aria-selected:border-foreground text-foreground`}
								key={item.title}
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background">
									{item.icon}
								</div>
								<div>
									<p className="font-medium">{item.title}</p>
									<p className="text-xs text-foreground">
										{item.description}
									</p>
								</div>
							</EditorCommandItem>
						))}
					</EditorCommandList>
				</EditorCommand>
			</EditorContent>
		</EditorRoot>
	);
};
export default Editor;
