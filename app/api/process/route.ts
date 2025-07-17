import {createClient} from "@supabase/supabase-js";

export const runtime = "nodejs";



import { NextResponse } from "next/server";
import OpenAI from "openai";
import mammoth from "mammoth";
import { fileTypeFromBuffer } from "file-type";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
    try {
        // Add detailed logging for debugging
        console.log("API route called");

        // Validate environment variables
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            console.error("Missing Supabase environment variables");
            return new NextResponse(JSON.stringify({ error: "Server configuration error" }), { status: 500 });
        }

        if (!process.env.OPENAI_API_KEY) {
            console.error("Missing OpenAI API key");
            return new NextResponse(JSON.stringify({ error: "Server configuration error" }), { status: 500 });
        }

        let requestBody;
        try {
            requestBody = await req.json();
        } catch (parseError) {
            console.error("Failed to parse request body:", parseError);
            return new NextResponse(JSON.stringify({ error: "Invalid JSON in request body" }), { status: 400 });
        }

        const { user_id, filePath } = requestBody;

        if (!filePath) {
            return new NextResponse(JSON.stringify({ error: "Missing filePath parameter" }), { status: 400 });
        }

        if (!user_id) {
            return new NextResponse(JSON.stringify({ error: "Missing user_id parameter" }), { status: 400 });
        }

        console.log(`Processing file: ${filePath} for user: ${user_id}`);

        // Download file from Supabase storage
        let data, error;
        try {
            const downloadResult = await supabase.storage
                .from("botdescriptions")
                .download(filePath);
            data = downloadResult.data;
            error = downloadResult.error;
        } catch (downloadError) {
            console.error("Supabase download error:", downloadError);
            return new NextResponse(JSON.stringify({ error: "Failed to download file from storage" }), { status: 500 });
        }

        if (error || !data) {
            console.error("Download error:", error);
            return new NextResponse(JSON.stringify({ error: "Failed to download file" }), { status: 404 });
        }

        let buffer;
        try {
            buffer = Buffer.from(await data.arrayBuffer());
        } catch (bufferError) {
            console.error("Buffer conversion error:", bufferError);
            return new NextResponse(JSON.stringify({ error: "Failed to process file data" }), { status: 500 });
        }

        // Detect MIME type
        let fileType;
        try {
            fileType = await fileTypeFromBuffer(buffer);
        } catch (typeError) {
            console.error("File type detection error:", typeError);
            return new NextResponse(JSON.stringify({ error: "Failed to detect file type" }), { status: 500 });
        }

        console.log(`Detected file type: ${fileType?.mime || "unknown"}`);

        let text = "";

        try {
            if (fileType?.mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                const result = await mammoth.extractRawText({ buffer });
                text = result.value.trim();
            } else if (fileType?.mime === "text/plain" || !fileType) {
                text = buffer.toString("utf-8").trim();
            } else {
                return new NextResponse(JSON.stringify({
                    error: `Unsupported file type: ${fileType?.mime}`
                }), { status: 400 });
            }
        } catch (extractError) {
            console.error("Text extraction error:", extractError);
            return new NextResponse(JSON.stringify({ error: "Failed to extract text from file" }), { status: 500 });
        }

        if (!text) {
            return new NextResponse(JSON.stringify({ error: "No text found in file" }), { status: 400 });
        }

        const chunks = splitText(text);
        console.log(`Extracted ${chunks.length} chunks`);

        // Process chunks with better error handling
        const failedChunks = [];
        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];
            try {
                console.log(`Processing chunk ${i + 1}/${chunks.length}`);

                const embedRes = await openai.embeddings.create({
                    model: "text-embedding-3-small",
                    input: chunk,
                });

                const embedding = embedRes.data[0].embedding;

                const { error: insertErr } = await supabase.from("file_chunks").insert({
                    user_id: user_id,
                    file_path: filePath,
                    content: chunk,
                    embedding,
                });

                if (insertErr) {
                    console.error(`Failed to insert chunk ${i + 1}:`, insertErr);
                    failedChunks.push(i + 1);
                }
            } catch (chunkError) {
                console.error(`Error processing chunk ${i + 1}:`, chunkError);
                failedChunks.push(i + 1);
            }
        }

        const response = {
            success: true,
            chunks: chunks.length,
            failedChunks: failedChunks.length > 0 ? failedChunks : undefined
        };

        console.log("Processing completed:", response);
        return NextResponse.json(response);

    } catch (err) {
        console.error("Unexpected error:", err);

        // More specific error information
        let errorMessage = "Server error";
        if (err instanceof Error) {
            errorMessage = err.message;
            console.error("Error stack:", err.stack);
        }

        return new NextResponse(JSON.stringify({
            error: errorMessage,
            details: process.env.NODE_ENV === "development" ? err : undefined
        }), { status: 500 });
    }
}

function splitText(text: string, chunkSize = 1000, overlap = 200) {
    const chunks: string[] = [];
    for (let i = 0; i < text.length; i += chunkSize - overlap) {
        chunks.push(text.slice(i, i + chunkSize));
    }
    return chunks;
}