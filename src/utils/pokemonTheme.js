const TYPE_THEME = {
  planta: "green",
  veneno: "violet",
  agua: "blue",
  bicho: "green",
  electrico: "yellow",
  eléctrico: "yellow",
  fuego: "orange",
  tierra: "amber",
  roca: "stone",
  hada: "pink",
  psiquico: "pink",
  psíquico: "pink",
  lucha: "red",
  fantasma: "purple",
  volador: "sky",
  hielo: "cyan",
  dragon: "indigo",
  dragón: "indigo",
  acero: "slate",
  normal: "neutral",
  siniestro: "slate",
  oscuro: "slate",
};

const THEME_PRESETS = {
  green: {
    accent: "#8eff55",
    accentSoft: "rgba(142, 255, 85, 0.16)",
    accentGlow: "rgba(142, 255, 85, 0.28)",
    accentInk: "#08130b",
    accentAlt: "#d6ffb7",
    pageBackground:
      "radial-gradient(circle at 12% 10%, rgba(142, 255, 85, 0.18), transparent 32rem), radial-gradient(circle at 85% 22%, rgba(82, 255, 138, 0.12), transparent 24rem), linear-gradient(180deg, #050808 0%, #081110 48%, #061012 100%)",
  },
  blue: {
    accent: "#4ea6ff",
    accentSoft: "rgba(78, 166, 255, 0.17)",
    accentGlow: "rgba(78, 166, 255, 0.3)",
    accentInk: "#07131f",
    accentAlt: "#d2eeff",
    pageBackground:
      "radial-gradient(circle at 12% 10%, rgba(78, 166, 255, 0.18), transparent 32rem), radial-gradient(circle at 85% 22%, rgba(99, 216, 255, 0.12), transparent 24rem), linear-gradient(180deg, #050810 0%, #071521 48%, #06131b 100%)",
  },
  yellow: {
    accent: "#ffd84a",
    accentSoft: "rgba(255, 216, 74, 0.18)",
    accentGlow: "rgba(255, 216, 74, 0.3)",
    accentInk: "#1c1706",
    accentAlt: "#fff7bf",
    pageBackground:
      "radial-gradient(circle at 12% 10%, rgba(255, 216, 74, 0.18), transparent 32rem), radial-gradient(circle at 85% 22%, rgba(255, 240, 110, 0.12), transparent 24rem), linear-gradient(180deg, #090804 0%, #16120a 48%, #101008 100%)",
  },
  orange: {
    accent: "#ff9b4a",
    accentSoft: "rgba(255, 155, 74, 0.16)",
    accentGlow: "rgba(255, 155, 74, 0.28)",
    accentInk: "#1e1006",
    accentAlt: "#ffe1be",
    pageBackground:
      "radial-gradient(circle at 12% 10%, rgba(255, 155, 74, 0.20), transparent 32rem), radial-gradient(circle at 85% 22%, rgba(255, 197, 110, 0.12), transparent 24rem), linear-gradient(180deg, #0d0604 0%, #1b0f09 48%, #120a06 100%)",
  },
  red: {
    accent: "#ff5f77",
    accentSoft: "rgba(255, 95, 119, 0.16)",
    accentGlow: "rgba(255, 95, 119, 0.28)",
    accentInk: "#1f070d",
    accentAlt: "#ffd1d8",
    pageBackground:
      "radial-gradient(circle at 12% 10%, rgba(255, 95, 119, 0.20), transparent 32rem), radial-gradient(circle at 85% 22%, rgba(255, 138, 160, 0.12), transparent 24rem), linear-gradient(180deg, #0f0507 0%, #1b0a10 48%, #12070a 100%)",
  },
  violet: {
    accent: "#b47bff",
    accentSoft: "rgba(180, 123, 255, 0.16)",
    accentGlow: "rgba(180, 123, 255, 0.28)",
    accentInk: "#12081d",
    accentAlt: "#eadbff",
    pageBackground:
      "radial-gradient(circle at 12% 10%, rgba(180, 123, 255, 0.18), transparent 32rem), radial-gradient(circle at 85% 22%, rgba(223, 156, 255, 0.12), transparent 24rem), linear-gradient(180deg, #09060f 0%, #140b1e 48%, #10091a 100%)",
  },
  cyan: {
    accent: "#49e6ff",
    accentSoft: "rgba(73, 230, 255, 0.16)",
    accentGlow: "rgba(73, 230, 255, 0.28)",
    accentInk: "#061519",
    accentAlt: "#d0fbff",
    pageBackground:
      "radial-gradient(circle at 12% 10%, rgba(73, 230, 255, 0.18), transparent 32rem), radial-gradient(circle at 85% 22%, rgba(152, 242, 255, 0.12), transparent 24rem), linear-gradient(180deg, #04090d 0%, #07151a 48%, #051015 100%)",
  },
  indigo: {
    accent: "#8a97ff",
    accentSoft: "rgba(138, 151, 255, 0.16)",
    accentGlow: "rgba(138, 151, 255, 0.28)",
    accentInk: "#080b1c",
    accentAlt: "#e2e6ff",
    pageBackground:
      "radial-gradient(circle at 12% 10%, rgba(138, 151, 255, 0.18), transparent 32rem), radial-gradient(circle at 85% 22%, rgba(194, 200, 255, 0.12), transparent 24rem), linear-gradient(180deg, #06070f 0%, #0b0f1f 48%, #090b16 100%)",
  },
  slate: {
    accent: "#94a3b8",
    accentSoft: "rgba(148, 163, 184, 0.16)",
    accentGlow: "rgba(148, 163, 184, 0.28)",
    accentInk: "#0d1117",
    accentAlt: "#edf2f7",
    pageBackground:
      "radial-gradient(circle at 12% 10%, rgba(148, 163, 184, 0.18), transparent 32rem), radial-gradient(circle at 85% 22%, rgba(203, 213, 225, 0.12), transparent 24rem), linear-gradient(180deg, #06080a 0%, #11161c 48%, #0b0f13 100%)",
  },
  neutral: {
    accent: "#8eff55",
    accentSoft: "rgba(142, 255, 85, 0.16)",
    accentGlow: "rgba(142, 255, 85, 0.28)",
    accentInk: "#08130b",
    accentAlt: "#d6ffb7",
    pageBackground:
      "radial-gradient(circle at 12% 10%, rgba(142, 255, 85, 0.14), transparent 32rem), radial-gradient(circle at 85% 22%, rgba(82, 255, 138, 0.10), transparent 24rem), linear-gradient(180deg, #050808 0%, #10191b 48%, #061012 100%)",
  },
};

function normalizeType(type) {
  return String(type || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function getPokemonTypes(pokemon) {
  return String(pokemon?.tipo || "")
    .split("/")
    .map((type) => type.trim())
    .filter(Boolean);
}

export function getPokemonPrimaryType(pokemon) {
  return getPokemonTypes(pokemon)[0] || "normal";
}

export function getPokemonThemeType(pokemon) {
  return TYPE_THEME[normalizeType(getPokemonPrimaryType(pokemon))] || "neutral";
}

export function getPokemonThemePreset(pokemon) {
  const themeType = getPokemonThemeType(pokemon);

  return {
    themeType,
    ...THEME_PRESETS[themeType],
  };
}
