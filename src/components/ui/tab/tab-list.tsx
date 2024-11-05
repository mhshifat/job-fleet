import { ReactNode } from "react";
import { useTab } from ".";

interface TabListProps {
  className?: string;
  renderItem?: ({ content }: {
    content: ReactNode;
    isSelected: boolean;
  }) => JSX.Element;
}

export default function TabList({ className, renderItem }: TabListProps) {
  const { tabContents, setSelectedKey, isSelected } = useTab();

  return (
    <ul className={className}>
      {Object.keys(tabContents).map(key => (
        <li key={key} onClick={() => setSelectedKey(key)}>
          {renderItem ? renderItem({
            content: tabContents[key].content,
            isSelected: isSelected(key)
          }) : tabContents[key].content}
        </li>
      ))}
    </ul>
  )
}