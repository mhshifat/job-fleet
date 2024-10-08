import { PropsWithChildren } from "react";
import AdminSidebar from "./admin-sidebar";
import AdminHeader from "./admin-header";

export default function AdminPagesLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-[0_0_auto] border-r border-border/50 shadow-sm">
        <AdminSidebar />
      </div>
      <div className="flex-1 overflow-auto">
        <AdminHeader />
        {children}
      </div>
    </div>
  )
}