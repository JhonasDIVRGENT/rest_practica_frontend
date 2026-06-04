import { getFallbackImage, getPokemonImage } from "../utils/pokemonImage.js";
import { getPokemonThemeType, getPokemonTypes } from "../utils/pokemonTheme.js";

export default function PokemonCard({ pokemon, onDetails, onEdit, onDelete, onSelect }) {
  const types = getPokemonTypes(pokemon);
  const themeType = getPokemonThemeType(pokemon);

  return (
    <article
      className="pokemon-card"
      data-theme={themeType}
      role="button"
      tabIndex={0}
      aria-label={`Seleccionar ${pokemon.nombre} como Pokémon destacado`}
      onClick={() => onSelect?.(pokemon)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect?.(pokemon);
        }
      }}
    >
      <div className="pokemon-card__image">
        <img
          src={getPokemonImage(pokemon)}
          alt={pokemon.nombre}
          onError={(event) => {
            if (!event.currentTarget.dataset.fallbackApplied) {
              event.currentTarget.dataset.fallbackApplied = "true";
              event.currentTarget.src = getFallbackImage(pokemon);
            }
          }}
        />
      </div>

      <div className="pokemon-card__content">
        <h3>{pokemon.nombre}</h3>
        <div className="chip-row">
          {types.map((type) => (
            <span className="type-chip small" key={type}>
              {type}
            </span>
          ))}
        </div>
        <p className="pokemon-card__meta">
          <strong>Nivel:</strong> {pokemon.nivel}
        </p>
        <p className="pokemon-card__meta">
          <strong>Habilidad:</strong> {pokemon.habilidad}
        </p>
        <p className="pokemon-card__description">{pokemon.descripcion}</p>
      </div>

      <div className="pokemon-card__actions">
        <button className="outline-button" onClick={(event) => {
          event.stopPropagation();
          onDetails(pokemon);
        }}>
          Más detalles
        </button>
        <button className="icon-button" aria-label={`Editar ${pokemon.nombre}`} onClick={(event) => {
          event.stopPropagation();
          onEdit(pokemon);
        }}>
          ✎
        </button>
        <button className="icon-button danger" aria-label={`Eliminar ${pokemon.nombre}`} onClick={(event) => {
          event.stopPropagation();
          onDelete(pokemon);
        }}>
          🗑
        </button>
      </div>
    </article>
  );
}
