# Exoplanet Chat Backend

Este é o backend de uma aplicação que utiliza a API do Google Generative AI para gerar respostas de IA com base em dados de exoplanetas. A API é construída com Express.js e possui um ponto de extremidade para interagir com a IA e fornecer informações sobre exoplanetas através de um chatbot.

## Funcionalidades

- **Interação com o Google Generative AI**: Utiliza a biblioteca oficial da API para interagir com o modelo generativo.
- **Chatbot de Exoplanetas**: Responde perguntas sobre exoplanetas com base em dados fornecidos.
- **Histórico de Conversa**: O chatbot pode manter um histórico de conversa para melhorar a interação.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no lado do servidor.
- **Express.js**: Framework web rápido e minimalista para Node.js.
- **@google/generative-ai**: Biblioteca oficial da API Google Generative AI.
- **dotenv**: Carrega variáveis de ambiente de um arquivo `.env` para o código.
- **cors**: Middleware para permitir requisições de outros domínios.

## Pré-requisitos

Certifique-se de ter o Node.js e o npm instalados na sua máquina. Além disso, você precisará de uma chave de API do Google Generative AI.

## Instalação

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/nerigleston/nasa-space
   cd seu-repositorio-backend
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Crie um arquivo `.env`** na raiz do projeto com sua chave de API:
   ```bash
   GOOGLE_API_KEY=your-google-api-key
   ```

4. **Inicie o servidor**:
   ```bash
   npm run dev
   ```

   O servidor estará disponível em `http://localhost:3000`.

## Endpoint

### `POST /chat`

- **Descrição**: Envia uma mensagem para o chatbot de exoplanetas e recebe uma resposta da IA.
- **Requisição**:
  ```json
  {
    "userMessage": "Qual a distância do planeta Kepler-22b?",
    "planet": {
      "name": "Kepler-22b",
      "distance": 600,
      "type": "Super Terra",
      "additionalInfo": "Exoplaneta que orbita a estrela Kepler-22 na constelação de Cygnus."
    },
    "chatHistory": [
      {
        "role": "user",
        "message": "Me fale sobre o Kepler-22b."
      }
    ]
  }
  ```
- **Resposta**:
  ```json
  {
    "response": "Kepler-22b está a aproximadamente 600 anos-luz da Terra e é classificado como uma Super Terra."
  }
  ```

### Variáveis no Corpo da Requisição:

- `userMessage` (obrigatório): Mensagem enviada pelo usuário.
- `planet` (opcional): Dados do planeta sobre o qual o usuário está perguntando.
- `chatHistory` (opcional): Histórico de conversa anterior para manter o contexto.

## Estrutura do Código

- **`index.js`**: Arquivo principal onde a API Express é configurada.
- **`docs.js`**: Contém uma documentação sobre os planetas (exemplos de dados).
- **`/chat` endpoint**: Gerencia as interações com o modelo generativo da Google AI e responde perguntas com base em informações de exoplanetas.

## Dependências

- `@google/generative-ai`: Interface para se conectar à API do Google Generative AI.
- `express`: Framework para a criação do servidor backend.
- `cors`: Middleware para permitir requisições cross-origin.
- `dotenv`: Carrega variáveis de ambiente a partir de um arquivo `.env`.
