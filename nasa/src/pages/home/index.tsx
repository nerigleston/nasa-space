import logo from "./../../assets/react.svg";
import Planets from "./components/components";
import { usePlanets } from "./model";

function App() {
  const {
    filteredPlanets,
    typeFilter,
    setTypeFilter,
    searchTerm,
    handleSearchChange,
    toggleExpand,
    filterPlanets,
    expandedPlanetId,
  } = usePlanets();

  return (
    <div className="h-screen flex flex-col">
      <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <img src={logo} alt="Logo" className="h-10" />
        <h1 className="text-2xl font-bold">Exploração de Exoplanetas</h1>
      </header>

      <div className="flex flex-1">
        <main className="flex-1 p-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar planetas..."
              className="w-full p-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <Planets
            filteredPlanets={filteredPlanets}
            expandedPlanetId={expandedPlanetId}
            toggleExpand={toggleExpand}
          />
        </main>

        <aside className="w-1/4 p-4 bg-gray-100 border-l">
          <h2 className="text-xl font-semibold mb-4">Filtros</h2>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Tipo de Exoplaneta</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="Gasoso">Gasoso</option>
              <option value="Rochoso">Rochoso</option>
              <option value="Terrestre">Terrestre</option>
            </select>
          </div>

          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md"
            onClick={() => filterPlanets()}
          >
            Aplicar Filtros
          </button>
        </aside>
      </div>
    </div>
  );
}

export default App;
