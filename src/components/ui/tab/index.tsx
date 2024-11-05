"use client";

import { createContext, Dispatch, PropsWithChildren, ReactNode, SetStateAction, useCallback, useContext, useId, useState } from "react"
import TabItem from "./tab-item";
import TabTrigger from "./tab-trigger";
import TabContent from "./tab-content";
import TabList from "./tab-list";

interface TabProps {
  className?: string;
}

interface TabCtxProps extends TabProps {
  tabContents: Record<string, {
    title: string;
    content: ReactNode;
  }>;
  setTabContents: Dispatch<SetStateAction<Record<string, {
    title: string;
    content: ReactNode;
  }>>>;
  setSelectedKey: Dispatch<SetStateAction<string | null>>;
  isSelected: (key: string) => boolean;
}

const TabCtx = createContext<TabCtxProps | null>(null);

export default function Tab({ children, className }: PropsWithChildren<TabProps>) {
  const id = useId();
  const identifier = id;
  const [tabContents, setTabContents] = useState<Record<string, {
    title: string;
    content: ReactNode;
  }>>({});
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const isSelected = (key: string) => (selectedKey || Object.keys(tabContents)[0]) === key;

  return (
    <TabCtx.Provider value={{
      tabContents,
      setTabContents,
      setSelectedKey,
      isSelected
    }}>
      <div className={className}>
        {children}
      </div>
    </TabCtx.Provider>
  )
}

Tab.Item = TabItem;
Tab.Trigger = TabTrigger;
Tab.Content = TabContent;
Tab.List = TabList;

export function useTab() {
  const res = useContext(TabCtx);
  if (!res) throw new Error("Component needs to wrapped with Tab");
  return res;
}