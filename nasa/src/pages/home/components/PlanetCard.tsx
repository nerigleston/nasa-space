import React from "react";
import { Planet } from "../types";

interface PlanetCardProps {
  planet: Planet;
  expandedPlanetId: number | null;
  toggleExpand: (rowid: number) => void;
  openModalChat: (planet: Planet) => void;
  openModal3D: (planet: Planet) => void;
}

const PlanetCard: React.FC<PlanetCardProps> = ({
  planet,
  expandedPlanetId,
  toggleExpand,
  openModalChat,
  openModal3D,
}) => {
  return (
    <div className="p-4 bg-white rounded-md shadow-md space-y-2">
      <div className="flex justify-between items-start">
        <div className="w-3/4">
          <h2 className="text-xl font-semibold">Planeta: {planet.pl_name}</h2>
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
            onClick={() => openModalChat(planet)}
          >
            Fale com a nossa IA
          </button>
          <button
            className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 transition-colors"
            onClick={() => openModal3D(planet)}
          >
            3D
          </button>
        </div>
      </div>
      {expandedPlanetId === planet.rowid && (
        <div className="p-2 bg-gray-100 rounded-md text-sm">
          <p>
            <strong>Data de Publicação:</strong> {planet.disc_pubdate}
          </p>
          <p>
            <strong>Local:</strong> {planet.disc_locale}
          </p>
          <p>
            <strong>Instalação:</strong> {planet.disc_facility}
          </p>
          <p>
            <strong>Telescópio:</strong> {planet.disc_telescope}
          </p>
          <p>
            <strong>Instrumento:</strong> {planet.disc_instrument}
          </p>
          <p>
            <strong>Método de Descoberta:</strong> {planet.discoverymethod}
          </p>
          <p>
            <strong>Ano da Descoberta:</strong> {planet.disc_year}
          </p>
          <p>{planet.additionalInfo}</p>
        </div>
      )}
    </div>
  );
};

export default PlanetCard;
