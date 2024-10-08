"use client";

import { cn } from "@/utils/helpers";
import { createContext, HTMLAttributes, PropsWithChildren, useCallback, useContext, useState } from "react";

interface SidebarContextState {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextState | null>(null);

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
}

export default function Sidebar({ children, className }: PropsWithChildren<SidebarProps>) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = useCallback(() => {
    setCollapsed(value => !value);
  }, []);

  return (
    <SidebarContext.Provider value={{
      collapsed,
      toggleSidebar
    }}>
      <div className={cn("w-full flex flex-col min-w-[250px]", className, {
        "min-w-max": collapsed
      })}>
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const res = useContext(SidebarContext);
  if (!res) throw new Error("Component needs to be wrapped with `Sidebar`");
  return res;
}

interface SidebarItemProps {
  className?: string;
  label?: string;
}

Sidebar.Item = ({ children, className, label }: PropsWithChildren<SidebarItemProps>) => {
  const { collapsed } = useSidebar();

  return (
    <div className={cn("", className)}>
      {collapsed && label && <span className="flex items-center justify-center h-[1px] w-full rounded-md bg-foreground/10 mb-6" />}
      {label && !collapsed && <span className="text-sm capitalize font-medium font-geist text-foreground/60 mb-1 flex items-center">{label}</span>}
      {children}
    </div>
  )
}

interface SidebarCollapsedContentProps {
  className?: string;
}

Sidebar.CollapsedContent = ({ children, className }: PropsWithChildren<SidebarCollapsedContentProps>) => {
  return (
    <div className={cn("cursor-pointer", className)}>
      {children}
    </div>
  )
}

interface SidebarExtendContentProps {
  className?: string;
}

Sidebar.ExtendContent = ({ children, className }: PropsWithChildren<SidebarExtendContentProps>) => {
  const { collapsed } = useSidebar();

  if (collapsed) return null;
  return (
    <div className={cn("cursor-pointer", className)}>
      {children}
    </div>
  )
}

interface SidebarTogglerProps {
  className?: string;
}

Sidebar.Toggler = ({ children, className }: PropsWithChildren<SidebarTogglerProps>) => {
  const { toggleSidebar } = useSidebar();

  return (
    <div role="button" onClick={toggleSidebar} className={cn("cursor-pointer", className)}>
      {children}
    </div>
  )
}