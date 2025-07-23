import React, {useEffect, useState} from 'react';
import PreviewChat from "@/components/preview-chat";
import AppearanceSettings from "@/components/appearance-settings";
import {createClient} from "@/lib/supabase/client";

function AppearanceConfigSection({botId}) {

    //a setter function and a getter function will be needed in the children of this component, give the setter to the settings panel and the getter to the preview.
    const supabase = createClient()
    async function getAppearanceConfig(){
        const config = await supabase.from('user_bots').select("appearance_settings").eq("botId", botId)
        return config.data[0]
    }

    const [appearanceConfig, setAppearanceConfig] = useState(null)

    function handleInitialSettings(config) {
        setAppearanceColor(config.primary_color)
        setCompanyName(config.company_name)
        setChatbotName(config.chatbot_name)

        console.log("Config welcome messages: ", config.welcome_messages )
        setWelcomeMessages(config.welcome_messages)
        setBotPlacement(config.placement)
        setBotSize(config.size)
        setDefaultMessages(config.default_messages)
        setChatColor(config.chat_color)
        setIsChatLoading(false)
    }

    useEffect(() => {
        setIsChatLoading(true)
        getAppearanceConfig().then((config) => {
            console.log(config.appearance_settings)
            setAppearanceConfig(config.appearance_settings)
            handleInitialSettings(config.appearance_settings)

        })
    }, []);

    const [isChatloading, setIsChatLoading] = useState(false)
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

    async function handleChanges(){
        const config = {
            "size": botSize,
            "placement": botPlacement,
            "chat_color": chatColor,
            "chatbot_name": chatbotName,
            "company_name": companyName,
            "primary_color": appearanceColor,
            "default_messages": defaultMessages,
            "welcome_messages": welcomeMessages

        }
        const syncSupabase = await supabase.from('user_bots').update({'appearance_settings': config}).eq("botId", botId)
        handleInitialSettings(config)

    }

    return (
        <div className='py-10'>
        <div>
            <div className='text-xl font-medium'>Bot Appearance</div>
            <div className='mb-5 text-sm text-gray-500'>Select the appearance of your bot (This can be changed
                later.)
            </div>
        </div>

    <div className='grid grid-cols-5 gap-5'>

        <div className='col-span-3 flex flex-col border rounded-md shadow-sm pt-5 h-fit sticky top-0 '>
            <div className='text-lg px-5 font-light'>Preview</div>
                <div className='min-h-[700px] flex-1  bg-gray-50 rounded-sm mt-4 relative'>
                    <PreviewChat botId={botId} chatLoading={isChatloading} appearanceColor={appearanceColor} companyName={companyName} chatbotName={chatbotName}
                                 welcomeMessages={welcomeMessages} botPlacement={botPlacement} botSize={botSize}
                                 defaultMessages={defaultMessages} chatColor={chatColor}/>
                </div>
            </div>

            <div className='col-span-2'>
                <AppearanceSettings appearanceColor={appearanceColor} setAppearanceColor={setAppearanceColor}
                                    companyName={companyName} setCompanyName={setCompanyName} chatbotName={chatbotName}
                                    setChatbotName={setChatbotName} welcomeMessages={welcomeMessages}
                                    setWelcomeMessages={setWelcomeMessages}
                                    botPlacement={botPlacement} setBotPlacement={setBotPlacement} botSize={botSize}
                                    setBotSize={setBotSize} defaultMessages={defaultMessages}
                                    setDefaultMessages={setDefaultMessages} chatColor={chatColor}
                                    setChatColor={setChatColor} onSaveClickFunc={handleChanges}/>

            </div>


        </div>
        </div>
            );
}

export default AppearanceConfigSection;