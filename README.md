# ConvertDesk

ConvertDesk is a RAG-powered chatbot builder that allows you to create custom AI chatbots from your own knowledge base and easily integrate them into your applications, websites, or workflows using integration links.

No more generic chatbots — ConvertDesk ensures your bots provide accurate, context-aware answers grounded in your data.

### 🚀 Features

1. RAG (Retrieval-Augmented Generation) powered chatbots
2. Upload or connect your knowledge base (documents, FAQs, websites, etc.)
3. Automatic embedding + vector search for accurate responses
4. Customizable personalities & instructions for each bot
5. Integration links to embed or connect bots with just a URL
6. No-code setup — launch a chatbot in minutes
7. Multi-user support — build and manage multiple bots under one account

### 📦 Installation

Clone the repo:

`git clone https://github.com/yourusername/convertdesk.git
cd convertdesk
`

Install dependencies:

`npm install`


Set up environment variables in .env:
`
OPENAI_API_KEY=your_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
`

Run the dev server:
`
npm run dev
`


### 🛠️ Usage
**1. Create a Knowledge Base**

Upload your content (PDFs, Docs, CSVs, or URLs). ConvertDesk will process and store embeddings for retrieval.

**2. Configure Your Bot**

Add instructions (e.g., tone, role, behavior).

Choose model + parameters.

Save your configuration.

**3. Generate Integration Link**

ConvertDesk generates a secure integration link you can:

* Embed in your website (iframe, script widget).
* Connect with apps via API.
* Share directly with users.

Example Embed:
`<script src="https://convertdesk.ai/embed.js" data-bot="your-bot-id"></script>`

📚 API

You can also interact with your chatbot programmatically:

POST https://api.convertdesk.ai/v1/query


Body:
```

{
  "bot_id": "your-bot-id",
  "message": "What’s in my knowledge base?"
}
```


Response:

```
{
  "answer": "Your knowledge base contains..."
}
```

🧑‍💻 Tech Stack

* Next.js – frontend + dashboard
* Supabase – storage + authentication
* Vector Database – Supabase (semantic search)
* OpenAI / Anthropic – LLM inference
* n8n / webhooks – integrations




📜 License

MIT License. See [LICENSE](https://github.com/devXamr/convertdesk-sb/blob/main/LICENSE)
 for details.