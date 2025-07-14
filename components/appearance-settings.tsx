'use client'
import React, {useEffect, useState} from 'react';

function AppearanceSettings({setAppearanceColor, appearanceColor, setCompanyName, companyName}) {


    return (
        <div className='bg-white px-5 py-5 border rounded-md h-full shadow-sm'>
            <div className='text-lg font-light'>Appearance Settings</div>
            <div className='flex mt-7 gap-4'>
                <div>
                    <div>Primary Color</div>
                    <div className='text-xs text-gray-600'>This color will be the selected color for your bot&apos;s
                        interface
                    </div>
                </div>

                <div className='w-12 h-10'>
                    <input type='color' value={appearanceColor} onChange={(e) => setAppearanceColor(e.target.value)}
                           className='w-full h-full'/>
                </div>
            </div>

            <div className='mt-7 gap-4'>
                <div>
                    <div>Company Name</div>
                    <div className='text-xs text-gray-600 mb-2'> Will appear as the chatbot profile name.</div>
                </div>

                <div className='w-full h-10'>
                    <input type='text' value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                           className='w-full h-full border rounded-md px-2 text-sm'/>
                </div>
            </div>

            <div className='mt-7 gap-4'>
                <div>
                    <div>Chatbot Name</div>
                    <div className='text-xs text-gray-600 mb-2'> This will appear above chatbot messages</div>
                </div>

                <div className='w-full h-10'>
                    <input type='text' value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                           className='w-full h-full border rounded-md px-2 text-sm'/>
                </div>
            </div>

            <div className='mt-7 gap-4'>
                <div>
                    <div>Welcome Message</div>
                    <div className='text-xs text-gray-600 mb-2'> This will appear above chatbot messages</div>
                </div>

                <div className='w-full h-10'>
                    <textarea value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                              className='w-full h-full border rounded-md px-2 text-sm'/>
                </div>
            </div>

            <div className='mt-7 gap-4'>
                <div>
                    <div>Placement</div>
                    <div className='text-xs text-gray-600 mb-2'> Where the chatbot will be placed on the target page.
                    </div>
                </div>

                <div className='w-full h-10 flex'>
                    <div className='px-6 py-3 text-sm bg-gray-50 rounded-l-md w-1/2 text-center'>Bottom Left</div>
                    <div className='px-6 py-3 text-sm bg-gray-200 rounded-r-md w-1/2 text-center'>Bottom Right</div>

                </div>
            </div>

            <div className='mt-7 gap-4'>
                <div>
                    <div>Size</div>
                    <div className='text-xs text-gray-600 mb-2'> Size of the chatbot on the target page.
                    </div>
                </div>

                <div className='w-full h-10 flex'>
                    <div className='px-6 py-3 text-sm bg-gray-50 rounded-l-md w-1/2 text-center'>Small</div>
                    <div className='px-6 py-3 text-sm bg-gray-200 w-1/2 text-center'>Medium</div>
                    <div className='px-6 py-3 text-sm bg-gray-50 rounded-r-md w-1/2 text-center'>Large</div>

                </div>
            </div>

            <div className=' mb-3 mt-7 text-gray-600 text-sm'>Please select the default message options you
                would like the user to have. Some messages have been predefined based on your knowledge base. These
                messages appear in the beggining of the chat when the chat window is empty.
            </div>

            <div className='flex flex-wrap gap-2'>
                <div className='px-4 py-2 bg-gray-100 border text-sm rounded-md'>How long does the process take?</div>
                <div className='px-4 py-2 bg-gray-100 border text-sm rounded-md'>Do I need to be present there?</div>
                <div className='px-4 py-2 bg-gray-100 border text-sm rounded-md'>What documents will I need?</div>

            </div>
            <div className=' mb-3 mt-2 text-gray-600 text-sm'>We recommend having 2-3 messages at most.</div>

            <div className=' mt-10'>Add a default message option</div>
            <div className='flex gap-4 mb-10 mt-1'>

                <div className='w-1/2'>
                    <div className='text-sm text-gray-600'>Option Value</div>
                    <input type='text'
                           className='w-full h-full border rounded-md px-2 text-sm'/>
                </div>
            </div>

            <button className=' hover:bg-black/80 block mt-10 bg-black px-4 py-3 rounded-md text-sm w-full text-white'>
                Save Changes
            </button>
        </div>
    );
}

export default AppearanceSettings;