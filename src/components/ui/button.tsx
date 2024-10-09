import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/helpers";

const buttonVariants = cva(
  "w-full rounded-md flex items-center justify-center text-sm uppercase transition overflow-hidden leading-normal tracking-wider font-geist-mono font-medium disabled:border disabled:border-foreground/10 flex items-center gap-2",
  {
    variants: {
      variant: {
        default: "bg-primary border border-primary text-background hover:bg-primary/80 active:bg-primary/90 disabled:bg-foreground/10 disabled:cursor-not-allowed disabled:text-foreground/30",
        outlined: "bg-background border border-primary text-primary hover:bg-primary/80 hover:text-background active:bg-primary/90 disabled:bg-foreground/10 disabled:cursor-not-allowed disabled:text-foreground/30",
        "secondary-outlined": "bg-background border border-border text-foreground hover:bg-foreground/80 hover:text-background active:bg-foreground/90 disabled:bg-foreground/10 disabled:cursor-not-allowed disabled:text-foreground/30",
        link: "text-primary hover:text-primary/80 active:text-primary/90 disabled:cursor-not-allowed disabled:text-foreground/30",
        ghost: "text-foreground/50 hover:text-foreground/80 active:text-foreground/90 disabled:cursor-not-allowed disabled:text-foreground/30 !p-0",
      },
      size: {
        default: "h-[var(--size)] px-4",
        icon: "h-[var(--size)] w-[var(--size)]",
        max: "h-[var(--size)] w-max",
        sm: "h-[calc(var(--size)-7px)] px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "link" | "outlined" | "ghost" | "secondary-outlined";
  size?: "default" | "icon" | "max" | "sm";
}

export default function Button({ children, className, disabled, variant = "default", size = "default", ...restProps }: PropsWithChildren<ButtonProps>) {
  return <button type="button" disabled={disabled} className={cn(buttonVariants({ className, variant, size }))} {...restProps}>{children}</button>
}