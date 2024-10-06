import { useState } from "react";
import { Planet } from "./types";
import ModalChat from "./components/ModalChat";
import Modal3D from "./components/Modal3D";
import ModalReferences from "./components/ModalReferences";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
  const [modalTitle, setModalTitle] = useState("");

  const openModalChat = (planet: Planet) => {
    setModalTitle("Talk to Doctor Rob. Otto");
    setModalContent(<ModalChat planet={planet} />);
    setIsModalOpen(true);
  };

  const openModal3D = (planet: Planet) => {
    setModalTitle(`3D View of the planet: ${planet.pl_name}`);
    setModalContent(<Modal3D planet={planet} />);
    setIsModalOpen(true);
  };

  const openModalReferences = (planet: Planet) => {
    setModalTitle(`References of ${planet.pl_name}`);
    setModalContent(<ModalReferences planet={planet} />);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return {
    isModalOpen,
    modalContent,
    modalTitle,
    openModalChat,
    openModal3D,
    openModalReferences,
    closeModal,
  };
};
