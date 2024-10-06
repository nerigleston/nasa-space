import { useState, useEffect } from "react";

export const usePlanets = () => {
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [collaborationFilter, setCollaborationFilter] = useState("");
  const [distanceFilter, setDistanceFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedPlanetId, setExpandedPlanetId] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPlanets = async (filter: {
    type?: string;
    collaboration?: string;
    page?: number;
  }) => {
    try {
      // Construa a query string com apenas um filtro
      let filterQuery = "";

      if (filter.type) {
        filterQuery = `&name=${filter.type}`;
      } else if (filter.collaboration) {
        filterQuery = `&collaboration=${filter.collaboration}`;
      } else if (filter.page) {
        filterQuery = `&page=${filter.page}`;
      }

      const response = await fetch(
        `http://localhost:3000/dados?${filterQuery}`,
      );
      const data = await response.json();
      setFilteredPlanets(data.dados);
      setTotalPages(data.totalPages);

      // Se estiver filtrando, forçar a página para 1
      if (!filter.type && !filter.collaboration) {
        setCurrentPage(filter.page || 1);
      }
    } catch (error) {
      console.error("Erro ao buscar planetas:", error);
    }
  };

  useEffect(() => {
    fetchPlanets({
      type: typeFilter,
      collaboration: collaborationFilter,
      page: currentPage,
    });
  }, [currentPage, typeFilter, collaborationFilter]);

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
    collaborationFilter,
    setCollaborationFilter,
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
