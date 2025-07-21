
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
    try {
        const { user_id, question } = await req.json();

        if (!user_id || !question) {
            return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
        }

        console.log(`Processing question for user ${user_id}: ${question}`);

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
            user_id,
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
Answer the following question using the context below. Keep the answer short and sweet. Only reply to relevant questions and keep the conversation professional. 

Context:
${context}

Question:
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

        return NextResponse.json({ answer });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}