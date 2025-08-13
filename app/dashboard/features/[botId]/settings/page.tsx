'use client'
import React, {useEffect, useState} from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input";
import {createClient} from "@/lib/supabase/client";
import {redirect, useParams} from "next/navigation";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";

function Page() {

    const {botId} = useParams()

    console.log("The botId receieved on the settings page.", botId)



    const [botDetails, setBotDetails] = useState<any | undefined>(undefined)

    const [deletionConfirmationText, setDeletionConfirmationText] = useState('')
    const [deletionError, setDeletionError] = useState(0)



    async function fetchBotDetails(){
        const supabase = createClient()

        const botInfo = await supabase.from('user_bots').select().eq("botId", botId)

        console.log("This is the botInfo received", botInfo.data[0])

        setBotDetails(botInfo.data[0])

    }

    //fetch bot deets here (name ) on load

    useEffect(() => {
        fetchBotDetails()
    }, []);

    async function handleDeletion(){
        if(deletionConfirmationText !== 'I confirm'){
            setDeletionError(1)
            return
        }

        setDeletionError(0)
        const supabase = createClient()

        const deleteBot = await supabase.from("user_bots").delete().eq("botId", botId)
        console.log("The deletion has taken place!", deleteBot)
        const getBotCount = await supabase.from("User_Info").select("bots_created").eq("user_id", botDetails.user_id)
        console.log("This is the botCount before", getBotCount.data[0].bots_created)
        const decrementBotCount = await supabase.from("User_Info").update({bots_created : getBotCount.data[0].bots_created - 1}).eq("user_id", botDetails.user_id)


        const getBotCountAgain = await supabase.from("User_Info").select("bots_created").eq("user_id", botDetails.user_id)

        console.log("This is the botCount after", getBotCountAgain.data)


        const deleteKnowledge  = await supabase.storage.from("botdescriptions").remove([`${botDetails.user_id}/${botId}`])

        toast.success("The bot has been deleted successfully!")
        redirect('/dashboard/features')


    }



    return (
        <div>
            <div>Settings</div>
            <div>
                <div>Integrate Into Your Website</div>
                <div>Paste the following script tag into your page to add your chatbot.</div>


                <div>Delete your bot</div>
                <div>This is a destructive action. Once a bot is deleted, it cannot be recovered. (all conversations and knowledge base associated with the bot is permanently deleted)</div>


                <Dialog>
                    <DialogTrigger>Delete</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you sure you want to delete the bot  "{botDetails && botDetails.appearance_settings.chatbot_name}"?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers. Type "I confirm" below to proceed.
                            </DialogDescription>
                            <Input type='text' placeholder='I confirm' value={deletionConfirmationText} onChange={(e) => setDeletionConfirmationText(e.target.value)}/>
                            {deletionError === 1 && <div className='text-sm text-red-500'>The value entered is incorrect</div>}
                            <Button onClick={handleDeletion}>Delete</Button>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

export default Page;