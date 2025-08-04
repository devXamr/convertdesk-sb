import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    });
}
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const botId = searchParams.get("botId");

    if (!botId) {
        return NextResponse.json({ error: "Missing botId" }, { status: 400 });
    }

    const { data, error } = await supabase
        .from("user_bots")
        .select("appearance_settings")
        .eq("botId", botId)
        .single();

    if (error || !data) {
        return NextResponse.json({ error: "Bot not found" }, { status: 404 });
    }

    return NextResponse.json(data.appearance_settings, {
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    });
}