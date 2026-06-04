import { getFallbackImage, getPokemonImage } from "../utils/pokemonImage.js";
import { getPokemonThemeType, getPokemonTypes } from "../utils/pokemonTheme.js";

const fallbackPokemon = {
  nombre: "Bulbasaur",
  tipo: "Planta/Veneno",
  nivel: 15,
  habilidad: "Látigo Cepa",
  descripcion: "Pokémon inicial con una semilla en el lomo.",
  imagen_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
};

export default function Hero({ pokemon, onDetails }) {
  const featured = pokemon || fallbackPokemon;
  const themeType = getPokemonThemeType(featured);
  const types = getPokemonTypes(featured);
  const abilityIcon = themeType === "green" ? "✦" : themeType === "orange" || themeType === "red" ? "✹" : "◈";

  return (
    <section className="hero" data-theme={themeType}>
      <div className="hero__media">
        <img
          src={getPokemonImage(featured)}
          alt={featured.nombre}
          onError={(event) => {
            if (!event.currentTarget.dataset.fallbackApplied) {
              event.currentTarget.dataset.fallbackApplied = "true";
              event.currentTarget.src = getFallbackImage(featured);
            }
          }}
        />
        <span className="hero__ring" aria-hidden="true" />
      </div>

      <div className="hero__copy">
        <h1>{featured.nombre}</h1>
        <div className="chip-row">
          {types.map((tipo) => (
            <span className="type-chip" key={tipo}>
              {tipo}
            </span>
          ))}
        </div>
        <p className="hero__ability">
          <span>{abilityIcon}</span>
          {featured.habilidad}
        </p>
        <p className="hero__description">{featured.descripcion}</p>
        <button className="primary-button" onClick={() => onDetails(featured)}>
          Más detalles
        </button>
        <p className="hero__credit">
          Creado por Jhonas_10_01 · Hecho con una API en Python y consumiendo la PokeAPI para las imágenes; el contenido es de mi propia API.
        </p>
      </div>

      <div className="hero__sigil" aria-hidden="true" />
    </section>
  );
}
