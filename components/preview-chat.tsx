'use client'
import React, {useEffect, useState} from 'react';
import {MessageSquareDot, Send} from "lucide-react";
import AiMessage from "@/components/ai-message";



function PreviewChat({appearanceColor, companyName, defaultMessages, welcomeMessages, botPlacement}) {
    const [chatIconClicked, setChatIconClicked] = useState(true)



    return (
        <div className={`absolute ${botPlacement === 'right' ? 'right-2' : 'left-2'} bottom-2`}>
            {chatIconClicked && <div className='bottom-14 flex flex-col relative h-[600px] w-[400px] bg-gray-50 border-gray-300 shadow-sm rounded-md border'>
                <div className='flex py-2 px-2 items-center gap-4' style={{backgroundColor: appearanceColor}}>
                    <div className='rounded-full w-10 h-10 bg-black'></div>
                    <div className='text-white'>{companyName}</div>
                </div>

                <div className='flex-1 overflow-y-scroll py-3'>
                    {welcomeMessages.map(each => <AiMessage message={each}/>)}


                    <div className='text-sm px-4 py-2 mt-2 bg-green-100 rounded-l-md text-gray-700 w-fit max-w-[70%] ml-auto'>This message will be sent by the user.</div>
                </div>

                <div className='flex border-b rounded-b-lg'>
                    <input className='outline-0 py-3 flex-1 px-2 text-sm' placeholder='type your message here.'/>
                    <button className='bg-white text-gray-500 px-3'><Send size='20px'/></button>
                </div>
            </div>}
            <div style={{backgroundColor: appearanceColor}} onClick={() => setChatIconClicked(prev => !prev)} className={`rounded-full px-3 py-3 text-white absolute transition-all ${botPlacement === 'right' ? 'bottom-0 right-0' : 'bottom-0 left-0'}`}><div><MessageSquareDot/></div></div>
        </div>
    );
}

export default PreviewChat;