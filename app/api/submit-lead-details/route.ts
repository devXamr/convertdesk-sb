import {createClient} from "@supabase/supabase-js";
import {NextResponse} from "next/server";


const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


export async function POST(req: Request){


    const {bot_id, lead_name, lead_email} = await req.json()

    if(!bot_id || !lead_name || !lead_email){
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    console.log("adding the following to the lead table:", bot_id, "lead_name:", lead_name, "lead_email", lead_email  )

    const result = await supabase.from("user_leads").insert({bot_id: bot_id, lead_name: lead_name, lead_email: lead_email})

    console.log("Here's what the result of the data addition is: ", result.data)

    return NextResponse.json({msg: "new user form data added to table."}, {status: 200})

}