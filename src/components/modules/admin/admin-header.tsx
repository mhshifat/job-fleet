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
  const { authState } = useAuth();
  const popUpRef = useRef<{ toggle: () => void; }>({
    toggle() {},
  });
  const loading = signOut.isPending;

  async function handleLogout() {
    await signOut.mutateAsync();
    popUpRef.current.toggle();
  }
  return (
    <div className="p-3 flex items-center justify-end gap-5 border-b border-border/50 sticky w-full top-0 left-0 z-40 bg-background">
      <Popup
        comRef={popUpRef}
      >
        <Popup.Trigger>
          <Avatar 
            size={40}
            text={(authState?.user?.firstName?.charAt(0) || "") + (authState?.user?.lastName?.charAt(0) || "")}
          />
        </Popup.Trigger>
        <Popup.Content
          className="p-0"
        >
          <div className="w-full flex-col">
            <div className="py-3 px-5 flex items-center gap-3 border-b border-border">
              <Avatar 
                size={40}
                text={(authState?.user?.firstName?.charAt(0) || "") + (authState?.user?.lastName?.charAt(0) || "")}
              />
              <div className="flex flex-col">
                <h3 className="text-base font-medium font-geist leading-[1]">{authState?.user?.firstName} {authState?.user?.lastName}</h3>
                <p className="text-sm font-medium font-geist leading-[1] text-foreground/80 mt-1 w-[350px]">{authState?.user?.email}</p>
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