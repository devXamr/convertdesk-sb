'use client'
import React, {useEffect, useState} from 'react';
import {Loader, MessageSquareDot, Send} from "lucide-react";
import AiMessage from "@/components/ai-message";
import Image from 'next/image'
import logo from '../public/convertdesklogo.png'
import {createClient} from "@/lib/supabase/client";
import UserMessage from "@/components/user-message";
import axios from "axios";

function getTextColor(backgroundColor: string): string {
    const r = parseInt(backgroundColor.substr(1, 2), 16);
    const g = parseInt(backgroundColor.substr(3, 2), 16);
    const b = parseInt(backgroundColor.substr(5, 2), 16);

    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    return luminance < 128 ? '#FFFFFF' : '#000000';
}

function PreviewChat({botId, chatLoading, appearanceColor, chatbotName, companyName, defaultMessages, welcomeMessages, chatColor, botPlacement, botSize}) {
    const [chatIconClicked, setChatIconClicked] = useState(true)
    const [textColor, setTextColor] = useState(() => getTextColor(chatColor))


    const [currentUserMessage, setCurrentUserMessage] = useState('')

    /* set these rate limits later, after you're done with pricing,
        async function fetchSession(){
        const supabase = createClient()
        const userSession =
    }
    */
    interface MessageType {
        sender: string,
        message: string
    }

    const [userMessages, setUserMessages] = useState<MessageType[]>([])
    const [allMessages, setAllMessages] = useState<MessageType[]>([])
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState('')
    const [messageContext, setMessageContext] = useState<MessageType[]>([])

    useEffect(() => {
        if(allMessages.length > 5){
            setMessageContext(allMessages.slice(allMessages.length - 5))
        } else {
            setMessageContext(allMessages)
        }
    }, [allMessages]);


    useEffect(() => {
        fetchSession().then(setUserId)
    }, []);


    async function fetchSession(){
        const supabase = createClient()
        const user = await supabase.auth.getSession()
        console.log("Session data", user.data.session?.user.id)
        return user.data.session?.user.id
    }

    useEffect(() => {
        fetchSession().then(setUserId)
    }, []);


    useEffect(() => {
        console.log('here is the user data', userId)
    }, [userId]);

    useEffect(() => {
       setTextColor(() => getTextColor(chatColor))
    }, [chatColor]);

    async function handleAIResponse(){
        console.log("The process has reached the AI CALL")


        const ctxt = allMessages.length < 5 ? allMessages : allMessages.slice(allMessages.length - 5)
        console.log("Here's the message window context I am sending", ctxt)
        console.log("Here's the user's input", currentUserMessage)
        const data = await axios.post('/api/query', {user_id: userId, question: currentUserMessage, botId: botId, messageContext: ctxt})
        console.log("here's the data that was returned", data.data.answer)



        setAllMessages(prev => [...prev, {sender: 'AI', message: data.data.answer}])
    }

    function handleUserMessageSubmission(){
        if(currentUserMessage === ''){
            return
        }


        setAllMessages(prev => [...prev, {sender: 'user', message: currentUserMessage}])
        setUserMessages(prev => [...prev, {sender: 'user', message: currentUserMessage}])

        handleAIResponse()

        setCurrentUserMessage('')
    }


    return (
        <div>
            {chatLoading && <div className='mx-auto w-fit mt-10 animate-spin text-gray-600'><Loader/></div>}
        {!chatLoading && <div className={`absolute ${botPlacement === 'bottom-right' ? 'right-2' : 'left-2'} bottom-2`}>
            {chatIconClicked && <div className={`bottom-14 flex flex-col relative ${botSize === 'large' && 'h-[600px] w-[450px]'} ${botSize === 'medium' && 'h-[500px] w-[400px]'} ${botSize === 'small' && 'h-[400px] w-[300px]'} bg-gray-50 border-gray-300 shadow-sm rounded-md border`}>
                <div className='flex py-2 px-2 items-center gap-4' style={{backgroundColor: appearanceColor}}>
                    <div className='rounded-full w-10 h-10 bg-black'></div>
                    <div className='text-white'>{companyName}</div>
                </div>

                <div className='flex-1 flex flex-col justify-between overflow-y-scroll py-3'>
                    <div>
                        {welcomeMessages.map(each => <AiMessage message={each} chatbotName={chatbotName}/>)}


                        {allMessages.map(eachMessage => eachMessage.sender === 'AI' ?
                            <AiMessage message={eachMessage.message} chatbotName={chatbotName}/> :
                            <UserMessage textColor={textColor} chatColor={chatColor} message={eachMessage.message}/>)}
                        
                    </div>

                    {userMessages.length === 0 && <div className='flex w-full flex-wrap gap-1 px-2 py-2 mt-4'>
                        {defaultMessages.map(each => <div
                            className='text-xs px-3 py-1 border bg-gray-100 text-gray-600 cursor-pointer rounded-lg'>{each}</div>)}
                    </div>}


                </div>


                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleUserMessageSubmission()
                }} className='flex border-b rounded-b-lg'>
                    <input value={currentUserMessage} onChange={(e) => setCurrentUserMessage(e.target.value)} className='outline-0 py-4 flex-1 px-2 text-sm' placeholder='type your message here.'/>
                    <button type='submit' className='bg-white text-gray-500 px-3'><Send size='20px'/></button>
                </form>
                <div className='text-center text-xs py-1 text-gray-500 font-light flex items-center justify-center'><Image src={logo} className='w-6'/>powered by ConvertDesk</div>
            </div>}
            <div style={{backgroundColor: appearanceColor}} onClick={() => setChatIconClicked(prev => !prev)} className={`rounded-full px-3 py-3 text-white absolute transition-all ${botPlacement === 'bottom-right' ? 'bottom-0 right-0' : 'bottom-0 left-0'}`}><div><MessageSquareDot/></div></div>
        </div>}
        </div>
    );

}

export default PreviewChat;