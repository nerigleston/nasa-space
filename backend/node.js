const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const planetsDoc = require("./docs");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3000;

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API está funcionando!");
});

app.post("/chat", async (req, res) => {
  const { userMessage, planet, chatHistory } = req.body;

  if (!userMessage) {
    return res
      .status(400)
      .json({ error: "A mensagem do usuário é obrigatória." });
  }

  try {
    const modelName = "gemini-1.5-flash";
    const generationConfig = {
      temperature: 0.5,
      top_k: 0,
      top_p: 0.95,
      max_output_tokens: 1000,
    };

    const safetySettings = [];

    const model = genAI.getGenerativeModel({
      model: modelName,
      generationConfig: generationConfig,
      safetySettings: safetySettings,
    });

    let chat;

    if (chatHistory) {
      chat = model.startChat({
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
                text: `Explicação: ${planetsDoc}`,
              },
              {
                text: "Você é um especialista em astronomia e exoplanetas",
              },
              {
                text: "Me envie sem formatações, apenas texto",
              },
              {
                text: "Se você não souber a resposta, não tem problema, apenas responda que não sabe",
              },
              {
                text: "Você só pode responder no contexto de astronomia e exoplanetas",
              },
              // Enviar o histórico se não for null
              {
                text: `Histórico: ${JSON.stringify(chatHistory)}`,
              },
            ],
          },
        ],
      });
    } else {
      // Se chatHistory é null
      chat = model.startChat({
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
                text: `Explicação: ${planetsDoc}`,
              },
              {
                text: "Você é um especialista em astronomia e exoplanetas",
              },
              {
                text: "Me envie sem formatações, apenas texto",
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
    }

    const result = await chat.sendMessage(userMessage);
    const text = await result.response.text();

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
