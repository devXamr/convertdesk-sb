import React, {useEffect, useState} from 'react';
import {Dropzone, DropzoneContent, DropzoneEmptyState, useDropzoneContext} from "@/components/dropzone";
import {useSupabaseUpload} from "@/hooks/use-supabase-upload";
import {createClient} from "@/lib/supabase/client";
import axios from "axios";



function BotConfigSection() {
    const [userId, setUserId] = useState(null)

    async function fetchUserId(){
        const supabase = createClient()
        const currentsession = await supabase.auth.getSession()
        return currentsession.data.session?.user.id

    }

    useEffect(() => {
         fetchUserId().then(setUserId)
        console.log(userId)
    }, []);

    useEffect(() => {
        console.log(userId)
    }, [userId]);




    // add this later to the supported types: 'application/pdf'
    const props = useSupabaseUpload({
        bucketName: 'botdescriptions',
        path: userId,
        allowedMimeTypes: ['text/plain',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        maxFiles: 1,

        maxFileSize: 1000 * 200, // 10MB,


    })

    useEffect(() => {

        if(props.acceptedFiles.length > 0){
            console.log("Here are the props", props.acceptedFiles)
            sendEmbedRequest()
        }

    }, [props.onUpload]);


    async function sendEmbedRequest(){
        console.log(`${userId} is the user_id`)
        console.log(`${props.acceptedFiles[0].path} is the filePath being called` )
       const embedded = await axios.post('/api/process', {user_id: userId, filePath: `${userId}/${props.acceptedFiles[0].name}`})
       console.log(embedded.data)
    }




    return (
        <div>
            {/* just use the name of the chatbot as the knowledge base name. <div className='mb-5'>
                        <div className='text-lg text-gray-800'>Knowlege Base Name</div>
                        <div className='text-sm text-gray-500 mb-1'>This name will help you find this knowledge base when you need it for some other bot.</div>
                        <input type='text'
                               className='w-1/3 py-3 h-full border rounded-md px-2 text-sm'/>
                    </div>*/}

            <div className='text-lg'>Knowledge Base</div>
            <div className=' mb-3 text-gray-600 text-sm'>Please submit files describing your business or answering common questions below. (only .docx, .text and .pdf extensions supported.)
            </div>

            <Dropzone {...props}>
                <DropzoneEmptyState/>
                <DropzoneContent/>
            </Dropzone>

            <div className='mt-5 text-gray-600 text-sm'>Is there anything else you would like to include about your business?
            </div>

            <textarea className='w-full min-h-[100px] bg-gray-50 border px-2 py-2 text-gray-800'/>

            <button className='px-5 py-2 w-fit ml-auto block bg-black text-sm rounded-md mt-3 text-white'>Save
                Changes
            </button>
        </div>
    );
}

export default BotConfigSection;