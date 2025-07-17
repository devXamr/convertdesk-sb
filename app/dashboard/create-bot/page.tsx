'use client'
import React, {useState} from 'react';
import Link from "next/link";
import PreviewChat from "@/components/preview-chat";
import AppearanceSettings from "@/components/appearance-settings";
import AppearanceConfigSection from "@/components/appearance-config-section";
import {Dropzone} from "@/components/dropzone";
import BotConfigSection from "@/components/bot-config-section";


function CreateBotPage() {


    return (
        <div className='mt-10'>
            <Link href='/dashboard'
                  className='bg-gray-200 block w-fit mb-7 h-fit px-4 py-2 rounded-sm border border-gray-300 hover:bg-gray-100 text-sm'>Back
                to Dashboard</Link>
            <div>
                <div className='text-xl font-medium'>Bot Appearance</div>
                <div className='mb-5 text-sm text-gray-500'>Select the appearance of your bot (This can be changed
                    later.)
                </div>
                <AppearanceConfigSection/>
            </div>

            <div className='text-xl font-medium mt-14'>Bot Configuration</div>
            <div className='mb-5 text-sm text-gray-500'>Manage the information resources of your bot and other
                preferences.
            </div>
            <div className='mt-3 py-10 px-10 rounded-md shadow-sm border'>
                <BotConfigSection/>
            </div>


            <div className='mt-3 py-10 px-10 rounded-md shadow-sm border'>
                <div>


                    <div className='text-lg font-medium'>Form Configuration</div>

                    <div className='text-md mt-5'>Form Fields</div>
                    <div className=' mb-3 text-gray-600 text-sm'>Please select the fields you would like to include in
                        the form
                    </div>
                    <div>
                        <div className='flex flex-wrap gap-2'>
                            <div className='px-4 py-2 bg-gray-100 border text-sm rounded-md'>Name</div>
                            <div className='px-4 py-2 bg-gray-100 border text-sm rounded-md'>Contact Number</div>
                            <div className='px-4 py-2 bg-gray-100 border text-sm rounded-md'>Email</div>
                            <div className='px-4 py-2 bg-gray-100 border text-sm rounded-md'>Message</div>
                            <div className='px-4 py-2 bg-gray-100 border text-sm rounded-md'>Name</div>
                        </div>
                        <div>
                            <div className='text-md mt-10'>Add a field (optional)</div>

                            <div className='flex gap-4 mb-10 mt-1'>
                                <div>
                                    <div className='text-sm text-gray-600'>Field Name</div>
                                    <input type='email'
                                           className='w-full h-full border rounded-md px-2 text-sm'/>
                                </div>

                                <div>
                                    <div className='text-sm text-gray-600'>Type</div>
                                    <select className='w-full h-full border rounded-md px-2 text-sm'>
                                        <option>Text</option>
                                        <option>Number</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='text-md mt-10'>Receiving Email</div>
                    <div className='text-gray-600 text-sm'>The email that will receive all form submissions.
                    </div>
                    <input type='text'
                           className='w-1/4 h-full border rounded-md px-2 py-3 text-sm'/>


                    <button className='px-5 py-2 w-fit ml-auto block bg-black text-sm rounded-md mt-3 text-white'>Save
                        Changes
                    </button>
                </div>
            </div>

            <div className='mt-10 py-10'>
                <div className='text-xl font-medium'>Bot Add-ons</div>
                <div className='mb-5 text-sm text-gray-500'> This is where you can configure the addons (Whatsapp,
                    Slack, etc) for your chatbot.
                </div>

                <div>
                    <div>THis is</div>
                </div>
            </div>

        </div>
    );
}

export default CreateBotPage;