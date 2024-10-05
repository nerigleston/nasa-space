import React, { useState } from "react";
import Modal from "./modal";
import ModalChat from "./modalchat";
import Modal3D from "./modal3d";

interface Planet {
  rowid: number;
  name: string;
  description: string;
  type: string;
  distance: number;
  image: string;
  additionalInfo: string;
}

interface PlanetsProps {
  filteredPlanets: Planet[];
  expandedPlanetId: number | null;
  toggleExpand: (rowid: number) => void;
}

const Planets: React.FC<PlanetsProps> = ({
  filteredPlanets,
  expandedPlanetId,
  toggleExpand,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
  const [modalTitle, setModalTitle] = useState("");

  const openModalChat = (planet: Planet) => {
    setModalTitle("Fale com a nossa IA");
    setModalContent(<ModalChat planet={planet} onClose={closeModal} />);
    setIsModalOpen(true);
  };

  const openModal3D = (planet: Planet) => {
    setModalTitle("Visualizar em 3D");
    setModalContent(<Modal3D planet={planet} onClose={closeModal} />);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className="space-y-4">
      {filteredPlanets.map((planet) => (
        <div
          key={planet.rowid}
          className="p-4 bg-white rounded-md shadow-md space-y-2"
        >
          <div className="flex justify-between items-start">
            <div className="w-3/4">
              <h2 className="text-xl font-semibold">{planet.pl_name}</h2>
              <p>{planet.description}</p>
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => toggleExpand(planet.rowid)}
                  className="text-blue-500 underline"
                >
                  {expandedPlanetId === planet.rowid
                    ? "Ocultar mais informações"
                    : "Mostrar mais informações"}
                </button>
              </div>
            </div>
            <div className="space-x-2">
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition-colors"
                onClick={() => openModalChat(planet)} // Alterado para usar openModalChat
              >
                Fale com a nossa IA
              </button>
              <button
                className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 transition-colors"
                onClick={() => openModal3D(planet)} // Alterado para usar openModal3D
              >
                3D
              </button>
            </div>
          </div>
          {expandedPlanetId === planet.rowid && (
            <div className="p-2 bg-gray-100 rounded-md text-sm">
              <strong>Mais informações:</strong> {planet.additionalInfo}
            </div>
          )}
        </div>
      ))}

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default Planets;
