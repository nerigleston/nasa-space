import React from "react";

interface Planet {
  id: number;
  name: string;
  description: string;
  type: string;
  distance: number;
  image: string;
  additionalInfo: string;
}

const Modal3D: React.FC<{ planet: Planet; onClose: () => void }> = ({
  planet,
  onClose,
}) => {
  return (
    <div>
      <h2>{planet.name} - Visualização em 3D</h2>
      {/* Aqui você pode adicionar seu código para visualização em 3D */}
      <button onClick={onClose}>Fechar</button>
    </div>
  );
};

export default Modal3D;
