import { useState, useEffect } from "react";

export const usePlanets = () => {
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [distanceFilter, setDistanceFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedPlanetId, setExpandedPlanetId] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPlanets = async (page = 1) => {
    try {
      const response = await fetch(`http://localhost:3000/dados?page=${page}`);
      const data = await response.json();
      setFilteredPlanets(data.dados);
      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Erro ao buscar planetas:", error);
    }
  };

  useEffect(() => {
    fetchPlanets(currentPage);
  }, [currentPage, typeFilter, distanceFilter, searchTerm]);

  const toggleExpand = (id: number) => {
    setExpandedPlanetId(expandedPlanetId === id ? null : id);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
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
    expandedPlanetId,
    currentPage,
    totalPages,
    setCurrentPage,
  };
};
