import React from "react";
import { Planet } from "../types";

interface ModalReferencesProps {
  planet: Planet;
}

const extractHref = (ref: string | null | undefined) => {
  if (!ref) {
    return "Reference not found";
  }
  const match = ref.match(/href=([^ ]*)/);
  return match ? match[1] : ref;
};

const ModalReferences: React.FC<ModalReferencesProps> = ({ planet }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Data for {planet?.pl_name}</h2>
      <ul className="mt-4 space-y-2">
        <li>
          <strong>Orbital Period:</strong>
          <p className="text-gray-600">
            <a
              href={extractHref(planet?.pl_orbper_reflink)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {extractHref(planet?.pl_orbper_reflink)}
            </a>
          </p>
        </li>
        <li>
          <strong>Semi-Major Axis:</strong>
          <p className="text-gray-600">
            <a
              href={extractHref(planet?.pl_orbsmax_reflink)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {extractHref(planet?.pl_orbsmax_reflink)}
            </a>
          </p>
        </li>
        <li>
          <strong>Planet Radius:</strong>
          <p className="text-gray-600">
            <a
              href={extractHref(planet?.pl_rade_reflink)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {extractHref(planet?.pl_rade_reflink)}
            </a>
          </p>
        </li>
        <li>
          <strong>Planet Mass:</strong>
          <p className="text-gray-600">
            <a
              href={extractHref(planet?.pl_bmasse_reflink)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {extractHref(planet?.pl_bmasse_reflink)}
            </a>
          </p>
        </li>
        <li>
          <strong>Planet Density:</strong>
          <p className="text-gray-600">
            <a
              href={extractHref(planet?.pl_dens_reflink)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {extractHref(planet?.pl_dens_reflink)}
            </a>
          </p>
        </li>
        <li>
          <strong>Star Spectral Type:</strong>
          <p className="text-gray-600">
            <a
              href={extractHref(planet?.st_spectype_reflink)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {extractHref(planet?.st_spectype_reflink)}
            </a>
          </p>
        </li>
        <li>
          <strong>Star Effective Temperature:</strong>
          <p className="text-gray-600">
            <a
              href={extractHref(planet?.st_teff_reflink)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {extractHref(planet?.st_teff_reflink)}
            </a>
          </p>
        </li>
        <li>
          <strong>Star Radius:</strong>
          <p className="text-gray-600">
            <a
              href={extractHref(planet?.st_rad_reflink)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {extractHref(planet?.st_rad_reflink)}
            </a>
          </p>
        </li>
        <li>
          <strong>Star Mass:</strong>
          <p className="text-gray-600">
            <a
              href={extractHref(planet?.st_mass_reflink)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {extractHref(planet?.st_mass_reflink)}
            </a>
          </p>
        </li>
      </ul>
    </div>
  );
};

export default ModalReferences;
