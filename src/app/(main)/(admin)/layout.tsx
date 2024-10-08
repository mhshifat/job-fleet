import AdminPagesLayout from "@/components/modules/admin";
import Protected from "@/components/shared/protected";
import { PropsWithChildren } from "react";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <Protected>
      <AdminPagesLayout>
        {children}
      </AdminPagesLayout>
    </Protected>
  )
}