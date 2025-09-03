import React, {useEffect, useState} from 'react';
import PreviewChat from "@/components/appearance-page/preview-chat";
import AppearanceSettings from "@/components/appearance-page/appearance-settings";
import {createClient} from "@/lib/supabase/client";
import {ParamValue} from "next/dist/server/request/params";

function AppearanceConfigSection({botId} : {botId: ParamValue}) {

    //a setter function and a getter function will be needed in the children of this component, give the setter to the settings panel and the getter to the preview.
    const supabase = createClient()

    type configType =
        {"size" : string, "placement": string, "chat_color": string, "chatbot_name": string, "company_name": string, "primary_color": string, "default_messages": string[], "wantsLeadCapture": boolean, "welcome_messages": string[]}

    async function getAppearanceConfig(){
        const config = await supabase.from('user_bots').select("appearance_settings").eq("botId", botId)
        return config?.data?.[0].appearance_settings
    }




    function handleInitialSettings(config: configType) {

        console.log("here's everything that config has", config)

        console.log("config primary color:", config.primary_color)
        setAppearanceColor(config.primary_color)
        setCompanyName(config.company_name)
        setChatbotName(config.chatbot_name)

        console.log("Config welcome messages: ", config.welcome_messages )
        setWelcomeMessages(config.welcome_messages)
        setBotPlacement(config.placement)
        setBotSize(config.size)
        setDefaultMessages(config.default_messages)
        setChatColor(config.chat_color)

        console.log("wants lead capture value", config.wantsLeadCapture)
        setWantsLeadCapture(config.wantsLeadCapture)
        setIsChatLoading(false)
    }

    useEffect(() => {
          getAppearanceConfig().then((config) => handleInitialSettings(config))
    }, []);

    const [isChatloading, setIsChatLoading] = useState(true)
    const [appearanceColor, setAppearanceColor] = useState('#000000')
    const [companyName, setCompanyName] = useState('Company Name')
    const [chatbotName, setChatbotName] = useState('AI Assistant')
    const [welcomeMessages, setWelcomeMessages] = useState<string[]>(['Hey there! How can I help you?', `you can ask me anything you want about ${companyName}`])

    //can be either 'bottom-right' or 'bottom-left'.
    const [botPlacement, setBotPlacement] = useState('bottom-right')

    // can be small, medium or large.
    const [botSize, setBotSize] = useState('medium')
    const [defaultMessages, setDefaultMessages] = useState<string[]>([`Tell me about ${companyName}`, `What are the services of ${companyName}?`])


    const [chatColor, setChatColor] = useState('#000000')


    const [wantsLeadCapture, setWantsLeadCapture] = useState(true)
    const [showContactPage, setShowContactPage] = useState(false)

    useEffect(() => {
        if(!wantsLeadCapture){
            setShowContactPage(false)
        }
    }, [wantsLeadCapture]);

    async function handleChanges(){
        const config = {
            "size": botSize,
            "placement": botPlacement,
            "chat_color": chatColor,
            "chatbot_name": chatbotName,
            "company_name": companyName,
            "primary_color": appearanceColor,
            "default_messages": defaultMessages,
            "wantsLeadCapture": wantsLeadCapture,
            "welcome_messages": welcomeMessages

        }
        const syncSupabase = await supabase.from('user_bots').update({'appearance_settings': config}).eq("botId", botId)
        handleInitialSettings(config)

    }




    return <div>




        <div className='grid grid-cols-5 gap-5'>


            <div className='col-span-2 border-r'>

                <AppearanceSettings wantsLeadCapture={wantsLeadCapture} setWantsLeadCapture={setWantsLeadCapture}
                                    appearanceColor={appearanceColor} setAppearanceColor={setAppearanceColor}
                                    companyName={companyName} setCompanyName={setCompanyName} chatbotName={chatbotName}
                                    setChatbotName={setChatbotName} welcomeMessages={welcomeMessages}
                                    setWelcomeMessages={setWelcomeMessages}
                                    botPlacement={botPlacement} setBotPlacement={setBotPlacement} botSize={botSize}
                                    setBotSize={setBotSize} defaultMessages={defaultMessages}
                                    setDefaultMessages={setDefaultMessages} chatColor={chatColor}
                                    setChatColor={setChatColor} onSaveClickFunc={handleChanges}/>

            </div>

            <div className='col-span-3 flex flex-col border rounded-md shadow-sm pt-5 h-fit sticky top-0'>
                <div className='text-lg px-5 font-light'>Preview</div>

                <div id='previewchat' className='min-h-[750px] flex-1  bg-gray-50 rounded-sm mt-4 relative'>
                    {wantsLeadCapture && <button
                        className={`cursor-pointer px-4 py-1 text-sm bg-gray-100 text-gray-500 my-3 mx-3 rounded-md border ${showContactPage && "bg-green-100"}`}
                        onClick={() => setShowContactPage(prev => !prev)}>Show Contact
                        Page {showContactPage && 'X'}</button>}


                    <PreviewChat botId={botId} chatLoading={isChatloading} appearanceColor={appearanceColor}
                                 companyName={companyName} chatbotName={chatbotName}
                                 welcomeMessages={welcomeMessages} botPlacement={botPlacement} botSize={botSize}
                                 defaultMessages={defaultMessages} chatColor={chatColor}
                                 showContactPage={showContactPage}/>

                </div>
            </div>


        </div>
    </div>

}

export default AppearanceConfigSection;