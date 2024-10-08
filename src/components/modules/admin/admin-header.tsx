"use client";

import { useAuth } from "@/components/providers/auth";
import Avatar from "@/components/shared/avatar";
import Spinner from "@/components/shared/spinner";
import Button from "@/components/ui/button";
import Popup from "@/components/ui/popup";
import useSignOutMutation from "@/domain/auth/use-sign-out-mutation";
import { ROUTE_PATHS } from "@/utils/constants";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function AdminHeader() {
  const signOut = useSignOutMutation();
  const { updateAuthState } = useAuth();
  const popUpRef = useRef<{ toggle: () => void; }>({
    toggle() {},
  });
  const loading = signOut.isPending;

  async function handleLogout() {
    await signOut.mutateAsync();
    popUpRef.current.toggle();
    updateAuthState(null);
  }
  return (
    <div className="p-3 flex items-center justify-end gap-5 border-b border-border/50">
      <Popup
        comRef={popUpRef}
      >
        <Popup.Trigger>
          <Avatar size={40} />
        </Popup.Trigger>
        <Popup.Content
          className="p-0"
        >
          <div className="w-full flex-col">
            <div className="py-3 px-5 flex gap-3 border-b border-border">
              <Avatar size={40} />
              <div className="flex flex-col">
                <h3 className="text-base font-medium font-geist leading-[1]">Mehedi Hassan</h3>
                <p className="text-sm font-medium font-geist leading-[1] text-foreground/80 mt-1 w-[350px]">mehedihassanshifat01@gmail.com</p>
              </div>
            </div>
            <div className="flex flex-col">
              <Button disabled={loading} onClick={handleLogout} variant="ghost" className="!py-1 !px-5 justify-start text-foreground/80 capitalize font-geist hover:bg-foreground/10 rounded-none">
                <div className="flex items-center gap-2 flex-1">
                  <LogOutIcon className="size-4" />
                  <span>Sign Out</span>
                </div>

                {loading && <Spinner variant="secondary" className="w-max" />}
              </Button>
            </div>
          </div>
        </Popup.Content>
      </Popup>
    </div>
  )
}