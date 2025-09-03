import React from 'react';

function UserMessage({textColor, chatColor, message}: {
    textColor: string, chatColor: string, message: string
}) {
    return (
        <div style={{color: textColor, backgroundColor: chatColor}}
             className='text-sm px-4 py-2 mt-2 bg-green-100 rounded-l-md text-gray-700 w-fit max-w-[70%] ml-auto'>{message}
        </div>
    );
}

export default UserMessage;