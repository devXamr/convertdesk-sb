'use client'
import React from 'react';
import AppearanceConfigSection from "@/components/appearance-config-section";
import {useParams} from "next/navigation";

function Page() {
    const {botId} = useParams()
    return (
        <div>
            <AppearanceConfigSection botId={botId}/>
        </div>
    );
}

export default Page;