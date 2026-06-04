export default function TypeFilters({ types, selectedType, onSelect }) {
  return (
    <div className="type-filters" aria-label="Filtros por tipo">
      <button
        className={selectedType === "Todos" ? "filter-chip active" : "filter-chip"}
        onClick={() => onSelect("Todos")}
      >
        Todos
      </button>
      {types.map((type) => (
        <button
          className={selectedType === type ? "filter-chip active" : "filter-chip"}
          key={type}
          onClick={() => onSelect(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
