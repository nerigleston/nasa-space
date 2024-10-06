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
  let page = parseInt(req.query.page) || null;
  const limit = 10;
  const telescopeName = req.query.name;
  const collaborationName = req.query.collaboration;

  try {
    await client.connect();
    const database = client.db("minha_base");
    const collection = database.collection("meus_dados");

    // Crie a query com base nos filtros de telescópio (se aplicável)
    let query = {};

    if (telescopeName) {
      if (telescopeName === "telescop_content_recommendations") {
        query = { telescop_content_recommendations: { $exists: true } };
      } else {
        query = { telescop_content_recommendations: telescopeName };
      }
    }

    // Adicionando a lógica para o novo filtro
    if (collaborationName) {
      if (collaborationName === "telescop_collaboration_recommendations") {
        query = { telescop_collaboration_recommendations: { $exists: true } };
      } else {
        query = { telescop_collaboration_recommendations: collaborationName };
      }
    }

    let dados;
    let totalDocuments = await collection.countDocuments(query);

    if (page === null) {
      // Sem paginação
      dados = await collection.find(query).toArray();
    } else {
      // Com paginação
      dados = await collection
        .find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray();
    }

    res.json({
      page: page !== null ? page : null,
      totalPages: page !== null ? Math.ceil(totalDocuments / limit) : 1,
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
