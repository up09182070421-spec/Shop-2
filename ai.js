import OpenAI from "openai";
import { catalog, findProducts, money } from "./catalog.js";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function catalogContext() {
  return catalog.map(p => `${p.id} | ${p.category} | ${p.name} | ${money(p.price)} | ${p.details}`).join("\n");
}

export async function answerCustomer(message) {
  const relevant = findProducts(message).slice(0, 8);
  const relevantText = relevant.map(p => `${p.name} — ${money(p.price)} — ${p.details}`).join("\n");

  const prompt = `You are the WhatsApp sales assistant for India Furniture Service.
Reply in natural Hindi/Hinglish, concise and friendly.
Store: ${process.env.STORE_NAME}
Phone: ${process.env.STORE_PHONE}
Address: ${process.env.STORE_ADDRESS}

Rules:
- Never invent a product, price, stock status, delivery promise, discount, or warranty.
- Prices in the catalog are reference prices; say "online/reference price" when relevant.
- If the customer wants to buy or asks for availability, collect: product, quantity, name, city/area, and preferred contact time, then say a human will confirm.
- If they ask for a category, show up to 6 matching products with prices.
- If the customer asks for photos, tell them you can send the catalog image.
- Keep replies under about 900 characters.

Matching catalog products:
${relevantText}

Full catalog:
${catalogContext()}

Customer message:
${message}`;

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
    input: prompt
  });

  return response.output_text?.trim() || "जी, कृपया अपना सवाल दोबारा भेजें।";
}
