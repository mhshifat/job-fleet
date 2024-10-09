import { useState } from "react";
import Spinner from "./spinner";
import Button from "../ui/button";

interface ConfirmationProps {
  onCancel: () => void;
  onOk: () => void;
}

export default function Confirmation({ onCancel, onOk }: ConfirmationProps) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full h-auto flex items-center gap-5">
      <Button disabled={loading} className="flex-1 text-foreground" variant="secondary-outlined" onClick={onCancel}>Cancel</Button>
      <Button disabled={loading} className="flex-1" variant="default" onClick={() => {
        setLoading(true);
        onOk();
      }}>
        {loading ? <Spinner /> : "Ok"}
      </Button>
    </div>
  )
}