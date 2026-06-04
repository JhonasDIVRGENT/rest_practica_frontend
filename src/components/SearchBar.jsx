export default function SearchBar({ value, onChange }) {
  return (
    <label className="search-bar">
      <span>⌕</span>
      <input
        type="search"
        placeholder="Buscar Pokémon"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
