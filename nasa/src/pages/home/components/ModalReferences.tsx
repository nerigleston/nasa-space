import React from "react";
import { Planet } from "../types";

interface ModalReferencesProps {
  planet: Planet;
}

const ModalReferences: React.FC<ModalReferencesProps> = ({ planet }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Data for {planet.pl_name}</h2>
      <ul className="mt-4 space-y-2">
        <li>
          <strong>Orbital Period:</strong>
          <p className="text-gray-600">{planet.pl_orbper_reflink}</p>
        </li>
        <li>
          <strong>Semi-Major Axis:</strong>
          <p className="text-gray-600">{planet.pl_orbsmax_reflink}</p>
        </li>
        <li>
          <strong>Planet Radius:</strong>
          <p className="text-gray-600">{planet.pl_rade_reflink}</p>
        </li>
        <li>
          <strong>Planet Mass:</strong>
          <p className="text-gray-600">{planet.pl_bmasse_reflink}</p>
        </li>
        <li>
          <strong>Planet Density:</strong>
          <p className="text-gray-600">{planet.pl_dens_reflink}</p>
        </li>
        <li>
          <strong>Star Spectral Type:</strong>
          <p className="text-gray-600">{planet.st_spectype_reflink}</p>
        </li>
        <li>
          <strong>Star Effective Temperature:</strong>
          <p className="text-gray-600">{planet.st_teff_reflink}</p>
        </li>
        <li>
          <strong>Star Radius:</strong>
          <p className="text-gray-600">{planet.st_rad_reflink}</p>
        </li>
        <li>
          <strong>Star Mass:</strong>
          <p className="text-gray-600">{planet.st_mass_reflink}</p>
        </li>
      </ul>
    </div>
  );
};

export default ModalReferences;
