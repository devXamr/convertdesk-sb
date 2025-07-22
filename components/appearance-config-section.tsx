import React, {useState} from 'react';
import PreviewChat from "@/components/preview-chat";
import AppearanceSettings from "@/components/appearance-settings";

function AppearanceConfigSection() {
    const [appearanceColor, setAppearanceColor] = useState('#000000')
    const [companyName, setCompanyName] = useState('Company Name')
    const [chatbotName, setChatbotName] = useState('AI Assistant')
    const [welcomeMessages, setWelcomeMessages] = useState<string[]>(['Hey there! How can I help you?', `you can ask me anything you want about ${companyName}`])

    //can be either 'right' or 'left'.
    const [botPlacement, setBotPlacement] = useState('right')

    // can be small, medium or large.
    const [botSize, setBotSize] = useState('medium')
    const [defaultMessages, setDefaultMessages] = useState<string[]>([`Tell me about ${companyName}`, `What are the services of ${companyName}?`])


    const [chatColor, setChatColor] = useState('#000000')



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
                    <PreviewChat appearanceColor={appearanceColor} companyName={companyName} chatbotName={chatbotName}
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
                                    setChatColor={setChatColor}/>

            </div>


        </div>
        </div>
            );
}

export default AppearanceConfigSection;