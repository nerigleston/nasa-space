import React from "react";
import { Planet } from "../types";

interface ModalReferencesProps {
  planet: Planet;
}

const ModalReferences: React.FC<ModalReferencesProps> = ({ planet }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Dados para {planet.pl_name}</h2>
      <ul className="mt-4 space-y-2">
        <li>
          <strong>Período Orbital:</strong>
          <p className="text-gray-600">{planet.pl_orbper_reflink}</p>
        </li>
        <li>
          <strong>Eixo Semi-Maior:</strong>
          <p className="text-gray-600">{planet.pl_orbsmax_reflink}</p>
        </li>
        <li>
          <strong>Raio do Planeta:</strong>
          <p className="text-gray-600">{planet.pl_rade_reflink}</p>
        </li>
        <li>
          <strong>Massa do Planeta:</strong>
          <p className="text-gray-600">{planet.pl_bmasse_reflink}</p>
        </li>
        <li>
          <strong>Densidade do Planeta:</strong>
          <p className="text-gray-600">{planet.pl_dens_reflink}</p>
        </li>
        <li>
          <strong>Tipo Espectral da Estrela:</strong>
          <p className="text-gray-600">{planet.st_spectype_reflink}</p>
        </li>
        <li>
          <strong>Temperatura Efetiva da Estrela:</strong>
          <p className="text-gray-600">{planet.st_teff_reflink}</p>
        </li>
        <li>
          <strong>Raio da Estrela:</strong>
          <p className="text-gray-600">{planet.st_rad_reflink}</p>
        </li>
        <li>
          <strong>Massa da Estrela:</strong>
          <p className="text-gray-600">{planet.st_mass_reflink}</p>
        </li>
      </ul>
    </div>
  );
};

export default ModalReferences;
