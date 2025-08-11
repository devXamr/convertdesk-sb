'use client'
import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import {createClient} from "@/lib/supabase/client";
import Link from "next/link";
import {Session} from "@supabase/auth-js";
import {MoveRight} from "lucide-react";



function DashboardPage() {
    const nav = useRouter()
    const [userSession, setUserSession] = useState<Session | null>(null)
    const [userBotCount, setUserBotCount] = useState<number | undefined>(undefined)
    const [error, setError] = useState(false)
    const [allUserBots, setAllUserBots] = useState<any[] | null | undefined>(null)

    const supabase = createClient()

    useEffect(() => {
        fetchSession().then(setUserSession)

    }, []);





    useEffect(() => {
        if(userSession){
            fetchUserBotCount().then(setUserBotCount)
            fetchAllUserBots().then(setAllUserBots)
        }
    }, [userSession]);


    async function fetchAllUserBots(){
        if(userSession){
            const allBots = await supabase.from("user_bots").select().eq("user_id", userSession.user.id)
            return allBots.data

        }


    }
    async function fetchUserBotCount(){
        if(userSession){
            const botCount = await supabase.from("User_Info").select("bots_created").eq("user_id", userSession.user.id)
            return botCount?.data?.[0]?.bots_created
        }

    }



    async function fetchSession(){
        const session = await supabase.auth.getSession()
        return session.data.session
    }

    useEffect(() => {
        if(error){
            setTimeout(() => {
                setError(false)
            }, 3000)
        }

    }, [error]);

    function handleRouting(){
        // check the count of bots this user has
        // if creating this one would exceed it, return with an error
        // else continue.

        //will change the limit here once the rate limits are set.

        // todo: change this limit back to 1 bot only at the end.
        if(userBotCount && userBotCount > 1){
            setError(true)
            return
        }

        const id = uuidv4();
        console.log("newId: ", id)
        handleBotCreation(id)
        // use this id to create a new bot in bot_info and also increase the users count here.

        // here, pass in the id and fetch it at the route to then add files to that subfolder in the users storage folder
        nav.push(`/dashboard/features/${id}`)
    }

    async function handleBotCreation(id: string){
        const createBot = await supabase.from("user_bots").insert({user_id: userSession?.user.id, botId: id})
        console.log("bot created successfully ", createBot.data)
        const newBotCount = (userBotCount || 0) + 1
        console.log("The new bot count is:", newBotCount)
        if(userSession){
            const increaseBotCount = await supabase.from("User_Info").update({"bots_created": newBotCount}).eq('user_id', userSession.user.id)
            console.log("data returned from increase bot count: ", increaseBotCount.data)

        }

    }

    return (
        <div>
            <div className='flex justify-between'>
                <div>
                    <div className='text-xl font-medium'>Your Features</div>
                    <div className='text-gray-600 dark:text-gray-200'>Deploy new and manage existing features.</div>
                </div>
                <div className='relative'>
                <Button onClick={handleRouting}
                        className='bg-gray-600 block h-fit px-4 py-2 rounded-sm border border-gray-500 hover:bg-gray-400 text-sm'>Create New Feature
                </Button>
                    {error && <div className='top-10 w-[400px] text-sm absolute text-red-600 bg-red-200 border border-red-400 rounded-md px-5 py-3'>You have created the maximum number of bots allowed on your account, upgrade for more.</div>}
                </div>

            </div>
            {allUserBots && allUserBots.length === 0 && <div> you havent created any bots </div>}
            <div className='mt-10'>
            {allUserBots && allUserBots.map(eachBot => <div  className='grid my-2 relative grid-cols-10 justify-between px-5 py-6 rounded-md col-span-1 border bg-gradient-to-r from-blue-300 via-blue-100 to-blue-100 hover:bg-blue-50 transition-colors'>
                <div className='col-span-2'>
                    <div className='text-xs text-gray-500'>Feature Type</div>
                    <div>Chatbot</div>


                </div>
                <div className='col-span-2'>
                    <div className='text-xs text-gray-500'>Name</div>
                    <div>{eachBot.appearance_settings.chatbot_name}</div>
                </div>
                <div className='col-span-3'>
                    <div className='text-xs text-gray-500'>Company Name</div>
                    <div>{eachBot.appearance_settings.company_name}</div>
                </div>

                <Link title='Manage Feature' href={`/dashboard/features/${eachBot.botId}/appearance`} className='text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 text-sm text-center'>
                    <MoveRight/>
                </Link>
            </div>)}
            </div>


        </div>
    );
}

export default DashboardPage;