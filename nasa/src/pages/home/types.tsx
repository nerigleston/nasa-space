export interface Planet {
  id: number;
  rowid: number;
  name: string;
  description: string;
  type: string;
  distance: number;
  image: string;
  additionalInfo: string;
  disc_pubdate: string;
  disc_locale: string;
  disc_facility: string;
  disc_telescope: string;
  disc_instrument: string;
  discoverymethod: string;
  disc_year: number;
  pl_name: string;
  pl_rade: number;
  pl_imppar: number;
  pl_orbper: number;
  st_rad: number;
  pl_orbper_reflink: string;
  pl_orbsmax_reflink: string;
  pl_rade_reflink: string;
  pl_bmasse_reflink: string;
  pl_dens_reflink: string;
  st_spectype_reflink: string;
  st_teff_reflink: string;
  st_rad_reflink: string;
  st_mass_reflink: string;
}

export interface PlanetsProps {
  filteredPlanets: Planet[];
  expandedPlanetId: number | null;
  toggleExpand: (rowid: number) => void;
}
