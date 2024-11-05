import { Children, cloneElement, PropsWithChildren, ReactElement, useId } from "react";

export default function TabItem({ children }: PropsWithChildren) {
  const id = useId();

  return Children.map(children, (child) => cloneElement(child as ReactElement, {
    identifier: id
  }))
}