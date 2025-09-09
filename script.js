const API_KEY = "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"; // 🔑 Bu yerga API key qo'yasiz

async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userMessage = input.value.trim();
  if (!userMessage) return;

  chatBox.innerHTML += `<div><b>Siz:</b> ${userMessage}</div>`;
  input.value = "";

  // Maxsus javoblar
  const lowerMsg = userMessage.toLowerCase();
  if (
    lowerMsg.includes("seni kim yaratgan") ||
    lowerMsg.includes("kim yaratdi") ||
    lowerMsg.includes("seni kim yasagan") ||
    lowerMsg.includes("kim yasadi")
  ) {
    chatBox.innerHTML += `<div><b>SafiyaGPT:</b> Meni Sodiqjonov Yusuf yasagan 🤗</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
    return;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: userMessage }],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const reply =
      data?.choices?.[0]?.message?.content ||
      data?.error?.message ||
      "Javob topilmadi";

    chatBox.innerHTML += `<div><b>SafiyaGPT:</b> ${reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    chatBox.innerHTML += `<div><b>SafiyaGPT (xato):</b> ${err.message}</div>`;
  }
}
