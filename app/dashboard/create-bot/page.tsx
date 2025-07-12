import React from 'react';
import Link from "next/link";

function CreateBotPage(props) {
    return (
        <div className='mt-10'>
            <Link href='/dashboard' className='bg-gray-200 block w-fit mb-7 h-fit px-4 py-2 rounded-sm border border-gray-300 hover:bg-gray-100 text-sm'>Back to Dashboard</Link>
            <div>
                <div>Bot Appearance</div>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='col-span-1'>
                        <div>Preview</div>
                        <div className='min-h-[450px] bg-gray-100 rounded-sm mt-7 relative'>
                        </div>
                    </div>
                    <div className='col-span-1'>Settings</div>

                </div>
            </div>

            <div>
                <div>Bot Config</div>
            </div>

        </div>
    );
}

export default CreateBotPage;