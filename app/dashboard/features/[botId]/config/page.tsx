'use client'
import React from 'react';
import {useParams} from "next/navigation";
import BotConfigSection from "@/components/appearance-page/bot-config-section";

function Page() {
    const {botId} = useParams()

    return (

            <div>
                <div className='text-xl font-medium mt-14'>Bot Configuration</div>
                <div className='mb-5 text-sm text-gray-500'>Manage the information resources of your bot and other
                    preferences.
                </div>
                <div className='mt-3 py-10 px-10 rounded-md shadow-sm border'>
                    <BotConfigSection botId={botId}/>
                </div>
                <button
                    className='block mx-auto mt-10 px-5 py-3 bg-black text-white rounded-sm mb-10 text-lg'>Create
                    Chatbot
                </button>

            </div>


    );
}

export default Page;