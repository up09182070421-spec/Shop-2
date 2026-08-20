# India Furniture Service — WhatsApp AI Chatbot

यह project WhatsApp पर आने वाले customers को furniture catalog, prices और basic sales assistance देने के लिए बनाया गया है।

## Architecture

Customer → WhatsApp → Meta Cloud API → `/webhook` → OpenAI Responses API → WhatsApp reply

## Features

- Hindi/Hinglish customer support
- Beds, Sofas, Dressing Tables, Chairs, Tables, Dining Sets, Wardrobes & Storage
- Catalog image भेजना
- Product/price lookup from `src/catalog.js`
- Purchase enquiry में customer details collect करने की कोशिश
- Human handoff के लिए store phone/address
- `/health` health endpoint
- Local web catalog at `/`

## 1. Install

```bash
npm install
```

## 2. Environment

`.env.example` को `.env` नाम से copy करें और values भरें:

```bash
cp .env.example .env
```

Required:
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `WHATSAPP_VERIFY_TOKEN`
- `BASE_PUBLIC_URL`
- `OPENAI_API_KEY`

## 3. Run

```bash
npm start
```

Local test:

```text
http://localhost:3000
http://localhost:3000/health
```

WhatsApp/Meta webhook के लिए server को public HTTPS URL पर deploy करना जरूरी है। Localhost को Meta सीधे webhook के रूप में use नहीं कर सकता; development में HTTPS tunnel का उपयोग किया जा सकता है।

## 4. Meta WhatsApp setup

Meta Developer dashboard में WhatsApp Cloud API app बनाएं और:
1. Phone Number ID लें.
2. Access Token बनाएं.
3. Webhook URL रखें:
   `https://YOUR-DOMAIN.example.com/webhook`
4. Verify token वही रखें जो `.env` में `WHATSAPP_VERIFY_TOKEN` है.
5. WhatsApp messages webhook field subscribe करें.
6. Test number से message भेजकर verify करें.

## 5. Deploy

इस project को किसी Node.js hosting provider पर deploy करें जो public HTTPS URL देता हो। Deploy के बाद:
- `BASE_PUBLIC_URL=https://your-domain.example.com`
- webhook URL `https://your-domain.example.com/webhook`

## 6. Catalog images

`public/assets/furniture-catalog.png` में अभी generated catalog poster है। WhatsApp image message के लिए यह file public HTTPS URL पर accessible होनी चाहिए।

अगर बाद में हर product की अलग image चाहिए, तो `catalog.js` में `image` URL field जोड़ें और bot को product-specific image भेजने के लिए `sendImage()` call करें।

## Important

Catalog में मौजूद prices reference/catalog prices हैं। वास्तविक stock, final price, delivery और discounts human staff से confirm कराएं।
