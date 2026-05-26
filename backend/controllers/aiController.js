import { GoogleGenAI } from "@google/genai";

import Report from "../models/report.js";
import dotenv from 'dotenv'

dotenv.config()

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const handleQuery = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(404).json({ message: "No message found" });
    }

    const reports = await Report.find({ status: { $ne: "Resolved" } })
      .select("location description category status")
      .limit(10);

    const systemReport = reports
      .map(
        (report) =>
          `Category: ${report.category}, Location: ${report.location}, Description: ${report.description}, Status: ${report.status}`,
      )
      .join("\n");

    const systemPrompt = `
      You are the WatchDogs AI Assistant, a professional dispatcher tool. 
      Here is the current live database data of reported incidents in the city:
      ${systemReport || "No active incidents reported today."}

      Answer the user's question professionally, using the live data above if relevant. 
      If they ask about something not in the data or general help, guide them on how to file a civic report.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }],
        },
      ],
    });

    return res.status(200).json({ text: response.text });
  } catch (error) {
    console.error("AI Assistant Route Error:", error);
    return res
      .status(500)
      .json({ error: "AI Assistant failed to compute response" });
  }
};

export default handleQuery;
