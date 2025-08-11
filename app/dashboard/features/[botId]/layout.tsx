'use client'
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {useParams} from "next/navigation";
import {AppSidebar} from "@/components/app-sidebar";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {createClient} from "@/lib/supabase/client";
import Image from "next/image";
import convertDeskBG from "@/public/convertdesklogo.png";

function BotPageLayout({children} : {
    children: React.ReactNode;
}) {



    const  {botId} = useParams()
    const [botData, setBotData] = useState<any>()

    useEffect(() => {
        fetchBotDetails().then(setBotData)
    }, []);

    async function fetchBotDetails(){

        const supabase = createClient()
        const currentBot = await supabase.from("user_bots").select().eq("botId", botId)

        console.log("here's the bot data", currentBot.data?.[0])
        return currentBot.data?.[0]
    }

    return (
        <div>

            <Breadcrumb className='h-16 border-b flex items-center'>

                <BreadcrumbList>
                    <BreadcrumbItem>

                        <BreadcrumbLink href="/">
                            <div className="flex items-center font-semibold">
                                <Image src={convertDeskBG} alt='convert desk logo' className='w-12'/>
                                <div className='text-blue-950'>ConvertDesk</div>
                            </div>
                        </BreadcrumbLink>

                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block"/>
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="/dashboard">
                            Dashboard
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{botData?.appearance_settings?.chatbot_name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <SidebarProvider>

                <AppSidebar botId={botId}/>

                <SidebarInset>


                    <div className="flex flex-1 flex-col gap-4 p-4">
                        <div className='max-w-5xl mx-auto'>


                            <div>
                                {children}
                            </div>
                        </div>
                    </div>


                </SidebarInset>


            </SidebarProvider>


        </div>
    );
}

export default BotPageLayout;