import { GoogleGenerativeAI } from "@google/generative-ai";

const parser = async (url, api_key) => {
  const genAI = new GoogleGenerativeAI(api_key);

  const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });

  const imageResp = await fetch(url).then((response) => response.arrayBuffer());

  const result = await model.generateContent([
    {
      inlineData: {
        data: Buffer.from(imageResp).toString("base64"),
        mimeType: "image/jpeg",
      },
    },
    `Extract all available contact details from this business card: 
    Name, Designation, Company Name, Address, Phone Numbers, Email, Website.
    If there is no info regarding any field, replace it with "Not available".
    Return the result as *valid JSON only* inside a single \`\`\`json code block.`,
  ]);

  const text = await result.response.text();

  const cleanedText = text.replace(/```json|```/g, "").trim();

  return JSON.parse(cleanedText);
};

export default parser;
