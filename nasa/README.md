Aqui está o conteúdo sugerido para o arquivo `README.md` em português para o seu projeto:

---

# Projeto de Visualização e Chat sobre Exoplanetas

Este é um projeto React que permite aos usuários visualizar informações sobre exoplanetas, incluindo uma visualização 3D dos planetas e uma interface de chat com uma IA, onde é possível conversar sobre os planetas.

## Funcionalidades

- **Visualização de Planetas**: Veja informações detalhadas sobre diferentes exoplanetas.
- **Visualização 3D**: Explore os planetas em uma visualização tridimensional usando a biblioteca `@react-three/fiber`.
- **Chat com IA**: Converse com uma IA sobre os exoplanetas usando um chat intuitivo e dinâmico.
- **Filtros de Pesquisa**: Filtre os planetas por tipo e faça buscas personalizadas.

## Estrutura do Projeto

- **App**: Componente principal que gerencia os planetas e os filtros de pesquisa.
- **Modal**: Componente de modal genérico usado para exibir conteúdo em sobreposições.
- **ModalChat**: Modal específico para o chat com IA, onde o usuário pode interagir com a IA sobre um planeta específico.
- **Modal3D**: Modal para visualizar os planetas em 3D.
- **PlanetCard**: Componente que exibe as informações de cada planeta de maneira compacta, com opções para expandir mais detalhes ou abrir o chat/visualização 3D.
- **Planets**: Componente que lista os planetas filtrados com base nos critérios definidos pelo usuário.
- **usePlanets**: Hook customizado que gerencia o estado dos planetas, filtros e expansão de informações.
- **useModal**: Hook customizado que controla a abertura e o conteúdo dos modais (chat e visualização 3D).

## Tecnologias Utilizadas

- **React**: Biblioteca principal para construção da interface de usuário.
- **TypeScript**: Adiciona tipagem estática ao JavaScript para garantir maior confiabilidade e manutenção do código.
- **@react-three/fiber**: Biblioteca para renderizar gráficos 3D em React.
- **@react-three/drei**: Coleção de utilitários para facilitar a criação de cenas 3D em `@react-three/fiber`.
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida e customizável.
- **fetch**: API nativa do JavaScript para realizar chamadas HTTP e lidar com a comunicação no chat com a IA.

## Instalação e Execução

### Pré-requisitos

Certifique-se de que você tem o Node.js instalado em sua máquina.

1. Clone o repositório:

   ```bash
   git clone https://github.com/nerigleston/nasa-space
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd seu-repositorio
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Execute o projeto:

   ```bash
   npm start
   ```

O projeto estará disponível em `http://localhost:3000`.

## Como Usar

1. **Pesquisar Planetas**: Use a barra de busca para procurar planetas pelo nome.
2. **Aplicar Filtros**: Use o menu lateral para filtrar planetas por tipo.
3. **Ver mais informações**: Clique em "Mostrar mais informações" em um card de planeta para ver detalhes adicionais.
4. **Interagir com a IA**: Clique em "Fale com a nossa IA" para abrir um chat e conversar com a inteligência artificial sobre o planeta.
5. **Visualizar em 3D**: Clique no botão "3D" para abrir uma visualização tridimensional do planeta e sua órbita.

## Hooks Customizados

### `usePlanets`

Este hook gerencia os dados dos planetas, a lógica de filtragem e a expansão de informações.

### `useModal`

Gerencia a exibição de modais, como o chat com IA e a visualização 3D dos planetas.

## Estrutura de Dados

O tipo `Planet` contém as seguintes propriedades:

```typescript
export interface Planet {
  id: number;
  rowid: number;
  name: string;
  description: string;
  type: string;
  distance: number;
  image: string;
  additionalInfo: string;
  disc_pubdate: string;
  disc_locale: string;
  disc_facility: string;
  disc_telescope: string;
  disc_instrument: string;
  discoverymethod: string;
  disc_year: number;
  pl_name: string;
  pl_rade: number;
  pl_imppar: number;
  pl_orbper: number;
  st_rad: number;
}
```
