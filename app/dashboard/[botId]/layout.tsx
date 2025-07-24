'use client'
import React from 'react';
import Link from "next/link";
import {useParams, usePathname} from "next/navigation";

function BotPageLayout({children}) {
    const  {botId} = useParams()
    return (
        <div>
            <Link href='/dashboard'
                  className='bg-gray-200 block mt-7 w-fit mb-7 h-fit px-4 py-2 rounded-sm border border-gray-300 hover:bg-gray-100 text-sm'>Back
                to Dashboard</Link>

            <div className='flex gap-4 mx-auto w-fit my-10'>
                <Link href={`/dashboard/${botId}/appearance`}>Bot Appearance</Link>
                <Link href={`/dashboard/${botId}/config`}>Bot Config</Link>
                <Link href={`/dashboard/${botId}/integrations`}>Integrations</Link>
                <Link href={`/dashboard/${botId}/settings`}>Settings</Link>



            </div>

            <div>
                {children}
            </div>
        </div>
    );
}

export default BotPageLayout;