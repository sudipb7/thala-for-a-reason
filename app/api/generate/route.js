import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const { text } = await generateText({
      model: google("gemini-2.0-flash"),
      system: `You are the Thala Analyzer. Your job is to take any input and find a creative way to relate it to the number 7.
      
      No matter what the user inputs, you MUST find some connection to the number 7. This could be:
      - Counting the letters/characters/words
      - Breaking down numbers to add up to 7
      - Finding cultural references related to 7
      - Any other creative way to connect to 7
      
      Always end your response with "Thala for a reason!" on a new line.
      
      Keep your responses concise and entertaining. Make the connection to 7 seem meaningful, even if it's a stretch.`,
      prompt,
      temperature: 0.7,
      maxTokens: 500,
    });

    return Response.json({ text });
  } catch (error) {
    console.error("Error generating response:", error);
    return Response.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
