## Estrutura do Projeto

- **Frontend**: Localizado na pasta `cd nasa`, ele exibe os dados e gerencia a interface do usuário. Desenvolvido com as tecnologias modernas de front-end.
- **Backend**: Localizado na pasta `cd backend`, ele gerencia a lógica do chatbot e a interação com a API do Google Generative AI.

## Como rodar o projeto

### 1. Backend

1. **Acesse o diretório do backend**:
   ```bash
   cd backend
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Crie um arquivo `.env`** na raiz do backend com sua chave da API Google Generative AI:
   ```bash
   GOOGLE_API_KEY=your-google-api-key
   ```

4. **Inicie o backend**:
   ```bash
   npm run dev
   ```

   O servidor backend estará disponível em `http://localhost:3000`.

### 2. Frontend (Interface de usuário)

1. **Acesse o diretório do frontend**:
   ```bash
   cd nasa
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Inicie o frontend**:
   ```bash
   npm run dev
   ```

   O frontend estará disponível em `http://localhost:5173`.

## Fluxo da Aplicação

1. O **frontend** exibe uma interface para o usuário digitar perguntas sobre exoplanetas e visualizar as respostas. Ele consome dados da NASA para apresentar as informações sobre dos exoplanetas que o telescópio HWO consegue captar.
2. O **backend** recebe as perguntas do usuário e dados sobre os exoplanetas, envia a solicitação para a API do Google Generative AI, e retorna uma resposta gerada pelo modelo com base nos dados fornecidos.

## Endpoint do Backend

### `POST /chat`
- **Descrição**: Envia uma pergunta ao chatbot e recebe uma resposta da IA.
- **Requisição**:
  ```json
  {
    "userMessage": "Qual a distância do planeta Kepler-22b?",
    "planet": {
      "name": "Kepler-22b",
      "distance": 600,
      "type": "Super Terra"
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

## Scripts Disponíveis

### Frontend

- **`npm run dev`**: Inicia o servidor de desenvolvimento para o frontend.

### Backend

- **`npm run dev`**: Inicia o servidor backend.
