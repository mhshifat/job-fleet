import { PropsWithChildren } from "react";
import AdminSidebar from "./admin-sidebar";
import AdminHeader from "./admin-header";
import CanAccess from "@/components/shared/can-access";

export default function AdminPagesLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-[0_0_auto] border-r border-border/50 shadow-sm">
        <AdminSidebar />
      </div>
      <CanAccess
        authProperties={['uid']}
      >
        <div className="flex-1 overflow-auto relative flex flex-col">
          <AdminHeader />
          {children}
        </div>
      </CanAccess>
    </div>
  )
}