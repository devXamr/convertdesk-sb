'use client'
import React, {useEffect, useState} from 'react';
import {X} from "lucide-react";

function AppearanceSettings({wantsLeadCapture, setWantsLeadCapture, chatColor, onSaveClickFunc, setChatColor, setAppearanceColor, appearanceColor, chatbotName, setChatbotName, setCompanyName, companyName, setWelcomeMessages, welcomeMessages, setDefaultMessages, defaultMessages, botPlacement, setBotPlacement, botSize, setBotSize}) {

    const [currentWelcomeMessage, setCurrentWelcomeMessage] = useState('')
    const [currentDefaultMessage, setCurrentDefaultMessage] = useState('')

    function handleDefaultMessageAddition(){
        if (currentDefaultMessage === ''){
            return
        }
        setDefaultMessages(prev => [...prev, currentDefaultMessage])

        setCurrentDefaultMessage('')
    }

    function handleWelcomeMessageAddition(){
        if(currentWelcomeMessage === ''){
            return;
        }
        setWelcomeMessages(prev => [...prev, currentWelcomeMessage])

        setCurrentWelcomeMessage('')
    }

    useEffect(() => {
        console.log("wantsLeadCapture", wantsLeadCapture)
    }, [wantsLeadCapture]);

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

            <div className='flex mt-7 gap-4'>
                <div>
                    <div>Chat Color</div>
                    <div className='text-xs text-gray-600'>This color will be applied to user chats.
                    </div>
                </div>

                <div className='w-12 h-10'>
                    <input type='color' value={chatColor} onChange={(e) => setChatColor(e.target.value)}
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

            <div className='flex mt-7 gap-4 items-center'>
                <div>
                    <div>Capture Contact Info. <span className='px-2 py-1 text-xs text-gray-500 rounded-md mx-2 font-light bg-gray-100'>Recommended</span></div>
                    <div className='text-xs text-gray-600 mb-2 mt-1'> Asks visitor for basic contact information (Information is added to the leads table).</div>
                </div>

                <div className='w-12 h-5'>
                    <input type='checkbox' checked={wantsLeadCapture} onChange={(e) => setWantsLeadCapture(e.target.checked)}
                           className='w-full h-full border rounded-md px-2 text-sm'/>
                </div>
            </div>

            <div className='mt-7 gap-4'>
                <div>
                    <div>Chatbot Name</div>
                    <div className='text-xs text-gray-600 mb-2'> This will appear above chatbot messages</div>
                </div>

                <div className='w-full h-10'>
                    <input type='text' value={chatbotName} onChange={(e) => setChatbotName(e.target.value)}
                           className='w-full h-full border rounded-md px-2 text-sm'/>
                </div>
            </div>

            <div className='mt-7 gap-4'>
                <div>
                    <div>Welcome Message</div>
                    <div className='text-xs text-gray-600 mb-2'> This will appear above chatbot messages</div>

                </div>

                <div className='w-full h-14'>
                    <textarea value={currentWelcomeMessage} onChange={(e) => setCurrentWelcomeMessage(e.target.value)}
                              className='w-full h-full border rounded-md px-2 text-sm py-2'/>

                </div>
                <button className='block mb-4 ml-auto bg-black text-white px-4 py-2 mt-1 rounded-md text-sm'
                        onClick={handleWelcomeMessageAddition}>Add
                </button>

                <div className='flex flex-wrap gap-2'>{welcomeMessages.map(each => <div
                        className='px-4 py-2 bg-blue-100 border text-sm rounded-md flex gap-3 '>{each}
                        <div className='text-gray-500'><X size={20} className='cursor-pointer'
                                                          onClick={() => setWelcomeMessages(prev => prev.filter(eachMessage => eachMessage !== each))}/>
                        </div>
                    </div>
                )}</div>
            </div>

            <div className='mt-7 gap-4'>
                <div>
                    <div>Placement</div>
                    <div className='text-xs text-gray-600 mb-2'> Where the chatbot will be placed on the target page.
                    </div>
                </div>

                <div className='w-full h-10 flex'>
                    <div
                        className={`px-6 py-3 text-sm transition-colors cursor-pointer ${botPlacement === 'bottom-left' ? 'bg-gray-900 text-white' : 'bg-gray-50'} rounded-l-md w-1/2 text-center`}
                        onClick={() => setBotPlacement('bottom-left')}>Bottom Left
                    </div>
                    <div
                        className={`px-6 py-3 text-sm transition-colors cursor-pointer ${botPlacement === 'bottom-right' ? 'bg-gray-900 text-white' : 'bg-gray-50'} bg-gray-200 rounded-r-md w-1/2 text-center`}
                        onClick={() => setBotPlacement('bottom-right')}>Bottom Right
                    </div>

                </div>
            </div>

            <div className='mt-7 gap-4'>
                <div>
                    <div>Size</div>
                    <div className='text-xs text-gray-600 mb-2'> Size of the chatbot on the target page.
                    </div>
                </div>

                <div className='w-full h-10 flex'>
                    <div
                        className={`px-6 py-3 text-sm cursor-pointer transition-colors ${botSize === 'small' && 'bg-black text-white'} rounded-l-md w-1/2 text-center`}
                        onClick={() => setBotSize('small')}>Small
                    </div>
                    <div
                        className={`px-6 py-3 text-sm cursor-pointer transition-colors   ${botSize === 'medium' && 'bg-black text-white'} w-1/2 text-center`}
                        onClick={() => setBotSize('medium')}>Medium
                    </div>
                    <div
                        className={`px-6 py-3 text-sm cursor-pointer transition-colors ${botSize === 'large' && 'bg-black text-white'} rounded-r-md w-1/2 text-center`}
                        onClick={() => setBotSize('large')}>Large
                    </div>

                </div>
            </div>

            <div className=' mb-3 mt-7 text-gray-600 text-sm'> Select the default message options you
                would like the user to have. Shown when the chat window is empty.
            </div>

            <div className='flex flex-wrap gap-2'>

                {defaultMessages.map(each => <div
                    className='px-4 py-2 bg-blue-100 border text-sm rounded-md flex gap-3 '>{each}
                    <div className='text-gray-500'><X size={20} className='cursor-pointer'
                                                      onClick={() => setDefaultMessages(prev => prev.filter(eachMessage => eachMessage !== each))}/>
                    </div>
                </div>)}


            </div>
            <div className=' mb-3 text-gray-600 text-sm text-center mt-6'>We recommend having 2-3 messages at most.
            </div>


            <div className='mt-7'>Add a message option</div>
            <div className='flex gap-4 mt-1'>

                <div className='w-full'>
                    <input type='text'
                           className='w-full h-full border rounded-md px-2 py-2.5 text-sm' value={currentDefaultMessage}
                           onChange={(e) => setCurrentDefaultMessage(e.target.value)}/>
                </div>

            </div>
            <button className='block mb-4 ml-auto bg-black text-white px-4 py-2 mt-1 rounded-md text-sm'
                    onClick={handleDefaultMessageAddition}>Add
            </button>


            <button onClick={onSaveClickFunc}
                    className=' hover:bg-black/80 block mt-7 bg-black px-4 py-3 rounded-md text-sm w-full text-white'>
                Save Changes
            </button>
        </div>
    );
}

export default AppearanceSettings;