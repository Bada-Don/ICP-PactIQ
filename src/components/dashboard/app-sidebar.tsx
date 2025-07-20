import React from "react"
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"

// Adjust these imports to match your project's structure
import { NavDocuments } from "../dashboard/nav-documents"
import { NavMain } from "../dashboard/nav-main"
import { NavSecondary } from "../dashboard/nav-secondary"
import { NavUser } from "../dashboard/nav-user"
import { ThemeToggle } from "../theme-toggle"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: ListIcon,
    },
    {
      title: "Analytics",
      url: "#",
      icon: BarChartIcon,
    },
    {
      title: "Projects",
      url: "#",
      icon: FolderIcon,
    },
    {
      title: "Team",
      url: "#",
      icon: UsersIcon,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: CameraIcon,
      isActive: true,
      url: "#",
      items: [
        { title: "Active Proposals", url: "#" },
        { title: "Archived", url: "#" },
      ],
    },
    {
      title: "Proposal",
      icon: FileTextIcon,
      url: "#",
      items: [
        { title: "Active Proposals", url: "#" },
        { title: "Archived", url: "#" },
      ],
    },
    {
      title: "Prompts",
      icon: FileCodeIcon,
      url: "#",
      items: [
        { title: "Active Proposals", url: "#" },
        { title: "Archived", url: "#" },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: SearchIcon,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: DatabaseIcon,
    },
    {
      name: "Reports",
      url: "#",
      icon: ClipboardListIcon,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: FileIcon,
    },
  ],
}

const contractSidebarData = {
  user: data.user,
  navMain: [
    {
      title: "Upload Contract",
      url: "#upload",
      icon: FileTextIcon,
    },
    {
      title: "Recent Analyses",
      url: "#recent",
      icon: BarChartIcon,
    },
    {
      title: "Contract Templates",
      url: "#templates",
      icon: FileCodeIcon,
    },
  ],
  documents: [
    {
      name: "Sample NDA",
      url: "#nda",
      icon: FileTextIcon,
    },
    {
      name: "Employment Agreement",
      url: "#employment",
      icon: FileTextIcon,
    },
    {
      name: "Consulting Contract",
      url: "#consulting",
      icon: FileTextIcon,
    },
  ],
  navSecondary: [
    {
      title: "Help Center",
      url: "#help",
      icon: HelpCircleIcon,
    },
    {
      title: "Settings",
      url: "#settings",
      icon: SettingsIcon,
    },
  ],
};

export function AppSidebar(props: React.ComponentPropsWithoutRef<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Contract Analysis</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={contractSidebarData.navMain} />
        <NavDocuments items={contractSidebarData.documents} />
        <NavSecondary items={contractSidebarData.navSecondary} className="mt-auto" />
        <div className="flex justify-start  mt-4">
          <div className="flex items-center px-4 gap-2">
            <ThemeToggle />
            <span className="text-sm text-muted-foreground">Toggle Theme</span>
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={contractSidebarData.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
export default AppSidebar
export { AppSidebar as Sidebar }