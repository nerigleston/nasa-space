const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const planetsDoc = require("./docs");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");

dotenv.config();

const app = express();
const port = 3000;

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const mongoUri = process.env.MONGO_URI;
const client = new MongoClient(mongoUri);

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
              {
                text: `Histórico: ${JSON.stringify(chatHistory)}`,
              },
            ],
          },
        ],
      });
    } else {
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

app.get("/dados", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;

  try {
    await client.connect();
    const database = client.db("minha_base");
    const collection = database.collection("meus_dados");

    // Consulta paginada
    const dados = await collection
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    // Conta o total de documentos
    const totalDocuments = await collection.countDocuments();

    res.json({
      page,
      totalPages: Math.ceil(totalDocuments / limit),
      totalDocuments,
      dados,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar dados." });
  } finally {
    await client.close();
  }
});

app.get("/search", async (req, res) => {
  const { pl_name } = req.query;

  if (!pl_name) {
    return res.status(400).json({ error: "O nome do planeta é obrigatório." });
  }

  try {
    await client.connect();
    const database = client.db("minha_base");
    const collection = database.collection("meus_dados");

    const regex = new RegExp(pl_name, "i");
    const resultados = await collection.find({ pl_name: regex }).toArray();

    res.json({
      totalResults: resultados.length,
      resultados,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar dados." });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
