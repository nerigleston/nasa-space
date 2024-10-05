const express = require("express");
const cors = require("cors");
const {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} = require("@google/generative-ai");

const app = express();
const port = 3000;

const genAI = new GoogleGenerativeAI("AIzaSyAi-bAKgQcfYlfJwrWlxi02MkAWSXHzjzY");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API está funcionando!");
});

app.post("/chat", async (req, res) => {
  const { userMessage, planet } = req.body;

  if (!userMessage) {
    return res
      .status(400)
      .json({ error: "A mensagem do usuário é obrigatória." });
  }

  try {
    const modelName = "gemini-1.5-flash";
    const generationConfig = {
      maxOutputTokens: 100,
    };

    const safetySettings = [];

    const model = genAI.getGenerativeModel({
      model: modelName,
      generationConfig: generationConfig,
      safetySettings: safetySettings,
    });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: `Dados: ${JSON.stringify(planet)}`,
            },
            {
              text: `Pergunta: ${userMessage}`,
            },
            {
              text: "Você é um especialista em astronomia e exoplanetas",
            },
            {
              text: "Me envie sem foramtações, apenas texto",
            },
            {
              text: "Se você não souber a resposta, não tem problema, apenas responda que não sabe",
            },
            {
              text: "Você só pode responder no contexto de astronomia e exoplanetas",
            },
          ],
        },
      ],
    });

    const result = await chat.sendMessage(userMessage);

    // O response.text() é uma função, precisamos esperar ela retornar o texto
    const text = await result.response.text();

    // Retornando a resposta gerada
    res.json({ response: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: `Erro ao gerar resposta: ${error.message}`,
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
