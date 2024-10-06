import logo from "./../../assets/telescope-svgrepo-com.svg";
import Planets from "./components/Planets";
import { usePlanets } from "./model";

function App() {
  const {
    filteredPlanets,
    typeFilter,
    setTypeFilter,
    setCollaborationFilter,
    toggleExpand,
    currentPage,
    totalPages,
    setCurrentPage,
    expandedPlanetId,
    loading, // Adiciona o estado de carregamento
  } = usePlanets();

  // Function to set the type filter
  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value);
    if (value) {
      setCollaborationFilter("");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-2xl font-semibold">
          Navigation for Habitable Worlds Observatory
        </h1>
        <img src={logo} alt="Logo" className="h-12 w-12" />
      </header>

      <div className="flex flex-1">
        <main className="flex-1 p-4">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <p>Loading...</p>
            </div>
          ) : (
            <>
              <Planets
                filteredPlanets={filteredPlanets}
                expandedPlanetId={expandedPlanetId}
                toggleExpand={toggleExpand}
              />

              <div className="flex justify-between mt-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md disabled:opacity-50"
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </main>

        <aside className="w-1/4 p-4 bg-gray-100 border-l">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Best Matches for this Telescope
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={typeFilter}
              onChange={(e) => handleTypeFilterChange(e.target.value)}
            >
              <option value="">All</option>
              <option value="0.1 m TESS Telescope">0.1 m TESS Telescope</option>
              <option value="0.10 m Schmidt Telescope">
                0.10 m Schmidt Telescope
              </option>
              <option value="0.18 m Takahashi Epsilon Astrograph">
                0.18 m Takahashi Epsilon Astrograph
              </option>
              <option value="0.27 m CoRoT Telescope">
                0.27 m CoRoT Telescope
              </option>
              <option value="0.4 m MEarth Telescope">
                0.4 m MEarth Telescope
              </option>
            </select>
          </div>
          {/*
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Collaboration-based Recommendations
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={collaborationFilter}
              onChange={(e) => handleCollaborationFilterChange(e.target.value)}
            >
              <option value="">All</option>
              <option value="0.1 m TESS Telescope">0.1 m TESS Telescope</option>
              <option value="0.10 m Schmidt Telescope">
                0.10 m Schmidt Telescope
              </option>
              <option value="0.18 m Takahashi Epsilon Astrograph">
                0.18 m Takahashi Epsilon Astrograph
              </option>
              <option value="0.27 m CoRoT Telescope">
                0.27 m CoRoT Telescope
              </option>
              <option value="0.4 m MEarth Telescope">
                0.4 m MEarth Telescope
              </option>
            </select>
          </div> */}
        </aside>
      </div>
    </div>
  );
}

export default App;
