import * as React from "react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link";



export function AppSidebar({ botId, ...props}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className='w-[200px] bg-white relative sticky top-0'>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}

          <SidebarGroup>

            <SidebarGroupContent>
              <SidebarMenu>

                  <SidebarMenuItem >
                    <SidebarMenuButton asChild>
                      <Link href={`/dashboard/${botId}/appearance`}>Appearance</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                <SidebarMenuItem >
                  <SidebarMenuButton asChild>
                    <Link href={`/dashboard/${botId}/config`}>Configuration</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem >
                  <SidebarMenuButton asChild>
                    <Link href={`/dashboard/${botId}/settings`}>Settings</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem >
                  <SidebarMenuButton asChild>
                    <Link href={`/dashboard/${botId}/leads`}>Leads</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>


                <SidebarMenuItem >
                  <SidebarMenuButton asChild>
                    <Link href={`/dashboard/${botId}/integrations`}>Integrations</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

      </SidebarContent>

    </Sidebar>
  )
}
