import React from 'react';

function AiMessage({message, chatbotName} : {message: string, chatbotName: string}) {
    return (
        <div>
            <div className='text-xs ml-1 text-gray-500 font-light mt-4'>{chatbotName}</div>
        <div className='text-sm px-4 py-2 bg-gray-100 rounded-r-md text-gray-700 w-fit max-w-[70%]'>{message}</div>
        </div>
);
}

export default AiMessage;