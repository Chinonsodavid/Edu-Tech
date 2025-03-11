export default async function handler(req, res) {
    try {
        // Allow both local and production origins
        const allowedOrigins = ["http://localhost:5173", "https://edu-videos.vercel.app"];
        const origin = req.headers.origin;

        if (allowedOrigins.includes(origin)) {
            res.setHeader("Access-Control-Allow-Origin", origin);
        }

        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        // Handle preflight request
        if (req.method === "OPTIONS") {
            return res.status(200).end();
        }

        // Ensure request is a POST request
        if (req.method !== "POST") {
            return res.status(405).json({ error: "Method Not Allowed" });
        }

        // Extract message from request body
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        // Retrieve API Key securely
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            console.error("Missing OpenAI API Key");
            return res.status(500).json({ error: "Server configuration error" });
        }

        // Call OpenAI API
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful AI." },
                    { role: "user", content: message }
                ],
            }),
        });

        // Handle OpenAI API errors
        if (!response.ok) {
            const errorData = await response.text();
            console.error("OpenAI API Error:", errorData);
            return res.status(response.status).json({ error: JSON.parse(errorData) });
        }

        // Parse and return OpenAI response
        const data = await response.json();
        return res.status(200).json({ reply: data.choices[0].message.content });
    } catch (error) {
        console.error("Chatbot API Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
