import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { sendText, sendImage, sendButtons } from "./whatsapp.js";
import { answerCustomer } from "./ai.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json({ limit: "2mb" }));
app.use(express.static(path.join(__dirname, "../public")));

app.get("/health", (_req,res) => res.json({ ok:true, service:"India Furniture WhatsApp Bot" }));

// Meta webhook verification
app.get("/webhook", (req,res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

// Incoming WhatsApp messages
app.post("/webhook", async (req,res) => {
  // Acknowledge Meta quickly.
  res.sendStatus(200);

  try {
    const changes = req.body?.entry?.[0]?.changes?.[0]?.value;
    const msg = changes?.messages?.[0];
    if (!msg) return;

    const from = msg.from;
    let text = "";

    if (msg.type === "text") text = msg.text?.body || "";
    else if (msg.type === "interactive") {
      text = msg.interactive?.button_reply?.title || msg.interactive?.list_reply?.title || "";
    } else {
      await sendText(from, "जी, अभी मैं text messages पर सबसे अच्छा काम करता हूँ। कृपया अपना furniture का सवाल लिखकर भेजें।");
      return;
    }

    const lower = text.toLowerCase();
    if (["hi","hello","hey","नमस्ते","हेलो","start","menu"].some(x => lower.trim() === x)) {
      await sendButtons(from,
        `नमस्ते! 👋 India Furniture Service में आपका स्वागत है।\n\nआप क्या देखना चाहते हैं?`,
        [
          {id:"beds", title:"Beds"},
          {id:"sofas", title:"Sofas"},
          {id:"catalog", title:"Full Catalog"}
        ]
      );
      return;
    }

    if (lower === "catalog" || lower.includes("full catalog") || lower.includes("पूरा कैटलॉग")) {
      const base = process.env.BASE_PUBLIC_URL;
      if (!base) throw new Error("BASE_PUBLIC_URL is missing");
      await sendImage(from, `${base}/assets/furniture-catalog.png`, "India Furniture Service — Furniture Catalog");
      await sendText(from, "किसी भी product का नाम लिखें, जैसे: Bed, Sofa, Wardrobe या Dining Set। मैं उसकी जानकारी बता दूँगा।");
      return;
    }

    const reply = await answerCustomer(text);
    await sendText(from, reply);
  } catch (err) {
    console.error(err);
  }
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`India Furniture WhatsApp Bot running on :${port}`));
