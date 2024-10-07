import { PropsWithChildren } from "react";
import Spinner from "./spinner";
import { ArrowRightIcon } from "lucide-react";

interface LoadingBtnProps {
  loading?: boolean;
  icon?: boolean | JSX.Element;
}

export default function LoadingBtn({ children, loading, icon }: PropsWithChildren<LoadingBtnProps>) {
  return (
    <>
      {loading && <Spinner className="size-4 animate-spin text-foreground/50" />}
      {loading ? "Loading..." : children}
      {icon !== false && !loading && (
        <>
          {icon || <ArrowRightIcon className="size-4" />}
        </>
      )}
    </>
  )
}