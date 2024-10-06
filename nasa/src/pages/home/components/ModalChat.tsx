import React, { useState } from "react";
import IA from "./../../../assets/ia.png";
import { Planet } from "../types";

interface ModalChatProps {
  planet: Planet;
}

const ModalChat: React.FC<ModalChatProps> = ({ planet }) => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { user: string; response: string }[]
  >([
    {
      user: "",
      response: `Seja bem-vindo ao planeta ${planet.pl_name}! Como posso ajudá-lo hoje?`,
    },
  ]);
  const [history, setHistory] = useState(false);
  const [loading, setLoading] = useState(false);

  const parseMarkdown = (text: string) => {
    let parsedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    parsedText = parsedText.replace(/\*(.*?)\*/g, "<em>$1</em>");
    parsedText = parsedText.replace(/__(.*?)__/g, "<strong>$1</strong>");
    parsedText = parsedText.replace(/_(.*?)_/g, "<em>$1</em>");
    parsedText = parsedText.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2">$1</a>',
    ); // [text](link)
    return parsedText;
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const newChatEntry = { user: userMessage, response: "Gerando resposta..." };
    setChatHistory((prev) => [...prev, newChatEntry]);
    setLoading(true);

    const shouldSendHistory = chatHistory.length > 1;
    setHistory(shouldSendHistory);

    try {
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage: userMessage,
          planet: planet,
          chatHistory: shouldSendHistory ? chatHistory : null,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setChatHistory((prevChatHistory) => {
        const updatedHistory = [...prevChatHistory];
        updatedHistory[updatedHistory.length - 1].response = result.response;
        return updatedHistory;
      });
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setChatHistory((prevChatHistory) => {
        const updatedHistory = [...prevChatHistory];
        updatedHistory[updatedHistory.length - 1].response =
          "Erro ao enviar mensagem. Tente novamente mais tarde.";
        return updatedHistory;
      });
    } finally {
      setLoading(false);
      setUserMessage("");
    }
  };

  return (
    <div className="relative flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {chatHistory.map((chat, index) => (
          <div key={index} className="flex flex-col space-y-2">
            {chat.user && (
              <div className="flex justify-end items-center space-x-2">
                <div className="bg-blue-100 p-2 rounded-md max-w-xs">
                  <strong>Você:</strong> {chat.user}
                </div>
                <img
                  src="https://img.icons8.com/ios-glyphs/30/person-male.png"
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
              </div>
            )}
            <div className="flex justify-start items-center space-x-2">
              <img src={IA} alt="IA" className="w-14 h-14" />
              <div
                className="bg-green-100 p-2 rounded-md max-w-xs"
                dangerouslySetInnerHTML={{
                  __html: parseMarkdown(chat.response),
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 p-2 bg-white ">
        <div className="flex space-x-2">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Digite sua mensagem"
            className="flex-grow p-2 rounded-md"
            disabled={loading}
          />
          <button
            className={`bg-green-500 text-white px-4 py-2 rounded-md ${
              loading ? "bg-gray-400 cursor-not-allowed" : "hover:bg-green-600"
            } transition-colors`}
            onClick={handleSendMessage}
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalChat;
