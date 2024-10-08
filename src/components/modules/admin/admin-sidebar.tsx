"use client";

import Sidebar from "@/components/ui/sidebar";
import { ROUTE_PATHS } from "@/utils/constants";
import { cn } from "@/utils/helpers";
import { ArrowBigRightDashIcon, BookAudioIcon, LayoutDashboardIcon, ScrollTextIcon, UnfoldHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ADMIN_SIDEBAR_MENUS = [
  {
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    link: ROUTE_PATHS.DASHBOARD,
  },
  {
    title: "Posts",
    icon: BookAudioIcon,
    link: ROUTE_PATHS.DASHBOARD_JOBS,
  },
  {
    title: "Forms",
    icon: ScrollTextIcon,
    link: ROUTE_PATHS.DASHBOARD_FORMS,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <Sidebar.Item className="p-3 cursor-pointer flex items-center gap-2 transition hover:shadow-sm">
        <Sidebar.CollapsedContent className="h-[40px] flex justify-center items-center border border-border rounded-md self-stretch aspect-square">
          <img
            src="/assets/logo-icon.png"
            alt="logo"
            role="presentation"
            className="h-[25px]"
          />
        </Sidebar.CollapsedContent>
        <Sidebar.ExtendContent className="flex-1 flex flex-col gap-0">
          <h3 className="text-base font-geist font-semibold text-foreground leading-[1] flex justify-between gap-5">Job Fleet
            <ArrowBigRightDashIcon className="size-4" />
          </h3>
          <p className="text-xs font-geist-mono font-normal text-foreground/60">Manage your jobs</p>
        </Sidebar.ExtendContent>
      </Sidebar.Item>
      <div className="relative">
        <Sidebar.Toggler className="absolute -right-3 top-[0px] w-6 h-6 rounded-full bg-background shadow-sm border border-border flex justify-center items-center">
          <UnfoldHorizontalIcon className="size-4 text-foreground/60" />
        </Sidebar.Toggler>
        <div className="flex flex-col py-3 gap-1">
          {ADMIN_SIDEBAR_MENUS.map(({icon: Icon, ...item}, idx) => (
            <Sidebar.Item key={item.title} className="px-3 py-0 cursor-pointer" label={idx === 0 ? "Menus" : ""}>
              <Link href={item.link} className={cn("flex text-foreground/60 items-center transition hover:bg-foreground/10 rounded-md", {
                "bg-foreground/10 text-foreground": pathname === item.link
              })}>
                <Sidebar.CollapsedContent className="h-[40px] flex justify-center items-center rounded-md self-stretch aspect-square">
                  <Icon className="size-[20px]" />
                </Sidebar.CollapsedContent>
                <Sidebar.ExtendContent className="text-base font-medium font-geist leading-[1]">{item.title}</Sidebar.ExtendContent>
              </Link>
            </Sidebar.Item>
          ))}
        </div>
      </div>
    </Sidebar>
  )
}