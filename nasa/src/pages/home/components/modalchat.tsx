import React, { useState } from "react";

interface Planet {
  id: number;
  name: string;
  description: string;
  type: string;
  distance: number;
  image: string;
  additionalInfo: string;
}

const ModalChat: React.FC<{
  planet: Planet;
  onClose: () => void;
}> = ({ planet }) => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { user: string; response: string }[]
  >([
    {
      user: "",
      response: `Seja bem-vindo ao planeta ${planet.pl_name}! Como posso ajudá-lo hoje?`,
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    setChatHistory([
      ...chatHistory,
      { user: userMessage, response: "Gerando resposta..." },
    ]);

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage: userMessage,
          planet: planet,
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
              <img
                src="https://img.icons8.com/ios-glyphs/30/robot-3.png"
                alt="IA"
                className="w-8 h-8 rounded-full"
              />
              <div className="bg-green-100 p-2 rounded-md max-w-xs">
                <strong>IA:</strong> {chat.response}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Container do input e botão fixo no fim */}
      <div className="sticky bottom-0 p-2 bg-white border-t border-gray-300">
        <div className="flex space-x-2">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Digite sua mensagem"
            className="flex-grow p-2 border border-gray-300 rounded-md"
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
