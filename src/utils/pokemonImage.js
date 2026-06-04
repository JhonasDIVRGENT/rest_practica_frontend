const DEFAULT_SPRITE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png";

export function getPokemonImage(pokemon) {
  if (pokemon?.imagen_url) {
    return pokemon.imagen_url;
  }

  return getFallbackImage(pokemon);
}

export function getFallbackImage(pokemon) {
  if (pokemon?.id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  }

  return DEFAULT_SPRITE;
}
