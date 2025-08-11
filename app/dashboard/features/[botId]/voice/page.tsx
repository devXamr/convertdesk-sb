'use client'
import React, {useState} from 'react';

function VoicePage() {
    const [enableVoice, setEnableVoice] = useState(false)
    const [validPlan, setValidPlan] = useState(true)
    // grab the plan here and check if voice can be enabled for this user's agents.

    return (
        <div>

            {!validPlan && <div>
                 <div className='text-xl mt-40 text-gray-600'>Uh-oh, your plan does not allow enabling voice for agents. <span className='block underline mx-auto w-fit underline-offset-2 font-light'>Upgrade Now.</span></div>

            </div>}

            {!enableVoice && validPlan && <div>
                <div className='text-xl mt-20'>Voice has not been enabled for this agent yet.</div>
                <button className='px-5 py-3 bg-black text-white rounded-md mt-3 w-fit mx-auto block' onClick={() => setEnableVoice(true)}>Enable Now</button>
            </div>}

        </div>
    );
}

export default VoicePage;