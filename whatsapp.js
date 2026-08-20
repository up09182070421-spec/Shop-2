import "dotenv/config";

const GRAPH = `https://graph.facebook.com/${process.env.META_GRAPH_VERSION || "v23.0"}`;

async function graph(path, options = {}) {
  const res = await fetch(`${GRAPH}${path}`, {
    ...options,
    headers: {
      "Authorization": `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`WhatsApp API ${res.status}: ${JSON.stringify(data)}`);
  return data;
}

export async function sendText(to, body) {
  return graph(`/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
    method: "POST",
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "text",
      text: { preview_url: false, body }
    })
  });
}

export async function sendImage(to, imageUrl, caption = "") {
  return graph(`/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
    method: "POST",
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "image",
      image: { link: imageUrl, caption }
    })
  });
}

export async function sendButtons(to, body, buttons) {
  return graph(`/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
    method: "POST",
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "interactive",
      interactive: {
        type: "button",
        body: { text: body },
        action: { buttons: buttons.slice(0,3).map((b,i)=>({
          type:"reply", reply:{ id:b.id || `btn_${i}`, title:b.title.slice(0,20) }
        })) }
      }
    })
  });
}
