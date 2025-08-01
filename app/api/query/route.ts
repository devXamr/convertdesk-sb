
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);




const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });



export async function POST(req: Request) {

    if(!openai || !supabase){
        return NextResponse.json({
            message: "there is a problem with the api keys mate"
        })
    }


    try {
        const { user_id, question, botId, messageContext } = await req.json();

        console.log("Incoming query: ", {
            user_id, question, botId
        })

        if (!botId || !question) {
            return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
        }

        let fetchedUserId= user_id

        if(!fetchedUserId){
            const { data: botData, error: botError } = await supabase
                .from("user_bots")
                .select("user_id")
                .eq("botId", botId)
                .single();

            if (botError || !botData) {
                return NextResponse.json({ error: "Invalid botId" }, { status: 404 });
            }

            console.log("here's whats returned in botData", botData)

            fetchedUserId = botData.user_id;

        }

        console.log(`Processing question for user ${fetchedUserId}: ${question}`);

        // Step 1️⃣ Embed the question
        const embeddingRes = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: question,
        });

        const questionEmbedding = embeddingRes.data[0].embedding;

        // Step 2️⃣ Query similar chunks
        const { data: chunks, error: matchErr } = await supabase.rpc("match_file_chunks", {
            query_embedding: questionEmbedding,
            match_threshold: 0.78, // adjust as needed
            match_count: 5,
            user_id: fetchedUserId,
            bot_id : botId
        });

        if (matchErr) {
            console.error(matchErr);
            return NextResponse.json({ error: "Failed to retrieve relevant chunks" }, { status: 500 });
        }

        if (!chunks || chunks.length === 0) {
            return NextResponse.json({ error: "No relevant context found" }, { status: 404 });
        }

        console.log(`Retrieved ${chunks.length} relevant chunks`);

        const context = chunks.map((c: any) => c.content).join("\n\n");

        // Step 3️⃣ Build prompt

        // todo: add 'suggest other options based on what the user has chosen'
        const prompt = `
Answer the following question using the context below. Keep the answer short and sweet. Only reply to relevant questions and keep the conversation professional. Provide the user with helpful guidance. Be hospitable and ask follow up questions. When the user might want to contact the company or might want to get contacted by the company, ask the user their name and email,

if the user only gives you their name, ask them for their email in the next chat, say something like "And your email please?". You need to collect the fields required from the user. If the email has already been provided, do not ask again.
Once the user provides email as well, say thank you and something along the lines of "Thank you for providing me with your information, our team will contact you soon. Meanwhile," and the followup questions comes after.

Use these messages to see what the user has sent previously: ${messageContext}

Context:
${context}

Question/input:
${question}
Answer:
`;

        // Step 4️⃣ Call LLM
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125", // or Claude if you swap provider
            messages: [{ role: "user", content: prompt }],
            temperature: 0,
        });

        const answer = completion.choices[0]?.message?.content || "No answer generated.";

        return NextResponse.json(
            { answer },

        );
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Server error" },


        );
    }
}