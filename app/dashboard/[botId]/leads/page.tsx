'use client'
import React, {useEffect, useState} from 'react';
import {useParams} from "next/navigation";
import {createClient} from "@/lib/supabase/client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

function LeadsPage(props) {
    const {botId} = useParams()
    const [allBotLeads, setAllBotLeads] = useState([])

    useEffect(() => {
        fetchLeads().then(setAllBotLeads)
    }, []);


    async function fetchLeads(){
        const supabase = createClient()
        const leads = await supabase.from("user_leads").select().eq("bot_id", botId)
        console.log("leads table data", leads.data)
        return leads.data

    }


    return (
        <div>
            <div className='text-xl mb-6 px-1 text-gray-600'>Leads</div>
            <Table className='border-x'>
                <TableCaption>A list leads received through your bot.</TableCaption>
                <TableHeader>
                    <TableRow>

                        <TableHead>Name</TableHead>
                        <TableHead>Lead Email</TableHead>
                        <TableHead className="text-right">Capture Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allBotLeads.map(eachLead => <TableRow>
                        <TableCell>{eachLead.lead_name}</TableCell>
                        <TableCell>{eachLead.lead_email}</TableCell>
                        <TableCell className="text-right">{eachLead.created_at.slice(0,10).replaceAll('-', '/')}</TableCell>
                    </TableRow> )}

                </TableBody>
            </Table>

        </div>
    );
}

export default LeadsPage;