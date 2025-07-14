import React, {useState} from 'react';
import PreviewChat from "@/components/preview-chat";
import AppearanceSettings from "@/components/appearance-settings";

function AppearanceConfigSection() {
    const [appearanceColor, setAppearanceColor] = useState('#000000')
    const [companyName, setCompanyName] = useState('Company Name')


    return (
        <div className='grid grid-cols-5 gap-5'>
            <div className='col-span-3 flex flex-col border rounded-md shadow-sm pt-5 h-fit sticky top-0 '>
                <div className='text-lg px-5 font-light'>Preview</div>
                <div
                    className='min-h-[450px] flex-1  bg-gray-50 rounded-sm mt-4 relative'>
                    <PreviewChat appearanceColor={appearanceColor} companyName={companyName}/>
                </div>
            </div>

            <div className='col-span-2'>
                <AppearanceSettings appearanceColor={appearanceColor} setAppearanceColor={setAppearanceColor}
                                    companyName={companyName} setCompanyName={setCompanyName}/>

            </div>


        </div>
    );
}

export default AppearanceConfigSection;