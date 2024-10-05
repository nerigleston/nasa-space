import { useState } from "react";
import { planetsData } from "./data";

export const usePlanets = () => {
  const [filteredPlanets, setFilteredPlanets] = useState(planetsData);
  const [typeFilter, setTypeFilter] = useState("");
  const [distanceFilter, setDistanceFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedPlanetId, setExpandedPlanetId] = useState<number | null>(null);

  const filterPlanets = (nameSearch = searchTerm) => {
    let filtered = planetsData;

    if (nameSearch) {
      filtered = filtered.filter((planet) =>
        planet.pl_name.toLowerCase().includes(nameSearch.toLowerCase()),
      );
    }

    if (typeFilter) {
      filtered = filtered.filter((planet) => planet.type === typeFilter);
    }

    if (distanceFilter) {
      switch (distanceFilter) {
        case "close":
          filtered = filtered.filter((planet) => planet.distance < 50);
          break;
        case "medium":
          filtered = filtered.filter(
            (planet) => planet.distance >= 50 && planet.distance <= 200,
          );
          break;
        case "far":
          filtered = filtered.filter((planet) => planet.distance > 200);
          break;
        default:
          break;
      }
    }

    setFilteredPlanets(filtered);
  };

  const toggleExpand = (id: number) => {
    setExpandedPlanetId(expandedPlanetId === id ? null : id);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    filterPlanets(searchValue);
  };

  return {
    filteredPlanets,
    typeFilter,
    setTypeFilter,
    distanceFilter,
    setDistanceFilter,
    searchTerm,
    handleSearchChange,
    toggleExpand,
    filterPlanets,
    expandedPlanetId,
  };
};
