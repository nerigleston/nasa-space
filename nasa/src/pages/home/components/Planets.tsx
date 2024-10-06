import React from "react";
import { PlanetsProps } from "./../types";
import Modal from "./Modal";
import { useModal } from "./../useModal";
import PlanetCard from "./PlanetCard";

const Planets: React.FC<PlanetsProps> = ({
  filteredPlanets,
  expandedPlanetId,
  toggleExpand,
}) => {
  const {
    isModalOpen,
    modalContent,
    modalTitle,
    openModalChat,
    openModal3D,
    openModalReferences,
    closeModal,
  } = useModal();

  return (
    <div className="space-y-4">
      {filteredPlanets?.map((planet) => (
        <PlanetCard
          key={planet.rowid}
          planet={planet}
          expandedPlanetId={expandedPlanetId}
          toggleExpand={toggleExpand}
          openModalChat={openModalChat}
          openModal3D={openModal3D}
          openModalReferences={openModalReferences}
        />
      ))}

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default Planets;
