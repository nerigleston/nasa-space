import React, { useState } from "react";
import Modal from "./modal";

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
}> = ({ planet, onClose }) => {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState<{ from: string; text: string }[]>(
    [],
  );

  const handleSendMessage = async () => {
    if (!userMessage) return; // Não enviar se a mensagem estiver vazia
    // Adiciona a mensagem do usuário à lista de mensagens
    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);

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
      // Adiciona a resposta da IA à lista de mensagens
      setMessages((prev) => [...prev, { from: "ai", text: result.response }]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text: "Erro ao enviar mensagem. Tente novamente mais tarde.",
        },
      ]);
    }

    setUserMessage(""); // Limpa o campo de entrada
  };

  return (
    <div>
      <p>
        Aqui você pode interagir com a IA para saber mais sobre {planet.name}.
      </p>
      <div className="space-y-2 mt-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-2 rounded-md ${
                msg.from === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              } max-w-xs`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Digite sua mensagem"
        className="w-full p-2 border border-gray-300 rounded-md mt-2"
      />
      <button
        className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 transition-colors mt-2"
        onClick={handleSendMessage}
      >
        Enviar
      </button>
      <button onClick={onClose} className="mt-4 text-red-500">
        Fechar
      </button>
    </div>
  );
};

export default ModalChat;
