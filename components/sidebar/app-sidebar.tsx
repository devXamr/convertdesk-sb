import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,

  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,

} from "@/components/ui/sidebar"
import Link from "next/link";
import {ParamValue} from "next/dist/server/request/params";


type AppSidebarDashboardProps = React.ComponentProps<typeof Sidebar> & {
  botId: ParamValue; // or whatever type botId is
};

export function AppSidebar({ botId, ...props}: AppSidebarDashboardProps) {
  return (
    <Sidebar {...props} className='w-[200px] bg-white relative sticky top-0'>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}

          <SidebarGroup>

            <SidebarGroupContent>
              <SidebarMenu>

                  <SidebarMenuItem >
                    <SidebarMenuButton asChild>
                      <Link href={`/dashboard/features/${botId}/appearance`}>Appearance</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                <SidebarMenuItem >
                  <SidebarMenuButton asChild>
                    <Link href={`/dashboard/features/${botId}/config`}>Configuration</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem >
                  <SidebarMenuButton asChild>
                    <Link href={`/dashboard/features/${botId}/settings`}>Settings</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem >
                  <SidebarMenuButton asChild>
                    <Link href={`/dashboard/features/${botId}/leads`}>Leads</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>


                <SidebarMenuItem >
                  <SidebarMenuButton asChild>
                    <Link href={`/dashboard/features/${botId}/integrations`}>Integrations</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

      </SidebarContent>

    </Sidebar>
  )
}
