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

type AppSidebarDashboardProps = React.ComponentProps<typeof Sidebar>

export function AppSidebarDashboard({...props}: AppSidebarDashboardProps) {
    return (
        <Sidebar {...props} className='w-[200px] bg-white relative sticky top-0'>
            <SidebarContent>
                {/* We create a SidebarGroup for each parent. */}

                <SidebarGroup>

                    <SidebarGroupContent>
                        <SidebarMenu>

                            <SidebarMenuItem >
                                <SidebarMenuButton asChild>
                                    <Link href={`/dashboard`}>Agents</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>


                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>

        </Sidebar>
    )
}
