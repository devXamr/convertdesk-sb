'use client'
import React, {useEffect, useState} from 'react';
import {MessageSquareDot, Send} from "lucide-react";
import AiMessage from "@/components/ai-message";
import Image from 'next/image'
import logo from '../public/convertdesklogo.png'

function getTextColor(backgroundColor: string): string {
    const r = parseInt(backgroundColor.substr(1, 2), 16);
    const g = parseInt(backgroundColor.substr(3, 2), 16);
    const b = parseInt(backgroundColor.substr(5, 2), 16);

    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    return luminance < 128 ? '#FFFFFF' : '#000000';
}

function PreviewChat({appearanceColor, chatbotName, companyName, defaultMessages, welcomeMessages, chatColor, botPlacement, botSize}) {
    const [chatIconClicked, setChatIconClicked] = useState(true)
    const [textColor, setTextColor] = useState(() => getTextColor(chatColor))


    useEffect(() => {
       setTextColor(() => getTextColor(chatColor))
    }, [chatColor]);


    return (
        <div className={`absolute ${botPlacement === 'right' ? 'right-2' : 'left-2'} bottom-2`}>
            {chatIconClicked && <div className={`bottom-14 flex flex-col relative ${botSize === 'large' && 'h-[600px] w-[450px]'} ${botSize === 'medium' && 'h-[500px] w-[400px]'} ${botSize === 'small' && 'h-[400px] w-[300px]'} bg-gray-50 border-gray-300 shadow-sm rounded-md border`}>
                <div className='flex py-2 px-2 items-center gap-4' style={{backgroundColor: appearanceColor}}>
                    <div className='rounded-full w-10 h-10 bg-black'></div>
                    <div className='text-white'>{companyName}</div>
                </div>

                <div className='flex-1 flex flex-col justify-between overflow-y-scroll py-3'>
                    <div>
                    {welcomeMessages.map(each => <AiMessage message={each} chatbotName={chatbotName}/>)}


                    <div style={{color: textColor, backgroundColor: chatColor}}
                         className='text-sm px-4 py-2 mt-2 bg-green-100 rounded-l-md text-gray-700 w-fit max-w-[70%] ml-auto'>This
                        message will be sent by the user.
                    </div>
                    </div>

                    <div className='flex w-full flex-wrap gap-1 px-2 py-2 mt-4'>
                        {defaultMessages.map(each => <div
                            className='text-xs px-3 py-1 border bg-gray-100 text-gray-600 cursor-pointer rounded-lg'>{each}</div>)}
                    </div>
                </div>


                <div className='flex border-b rounded-b-lg'>
                    <input className='outline-0 py-4 flex-1 px-2 text-sm' placeholder='type your message here.'/>
                    <button className='bg-white text-gray-500 px-3'><Send size='20px'/></button>
                </div>
                <div className='text-center text-xs py-1 text-gray-500 font-light flex items-center justify-center'><Image src={logo} className='w-6'/>powered by ConvertDesk</div>
            </div>}
            <div style={{backgroundColor: appearanceColor}} onClick={() => setChatIconClicked(prev => !prev)} className={`rounded-full px-3 py-3 text-white absolute transition-all ${botPlacement === 'right' ? 'bottom-0 right-0' : 'bottom-0 left-0'}`}><div><MessageSquareDot/></div></div>
        </div>
    );
}

export default PreviewChat;