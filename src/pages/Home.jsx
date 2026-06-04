import { useEffect, useMemo, useState } from "react";
import { createPokemon, deletePokemon, getPokemones, updatePokemon } from "../api/pokemonApi.js";
import Hero from "../components/Hero.jsx";
import PokemonCard from "../components/PokemonCard.jsx";
import PokemonForm from "../components/PokemonForm.jsx";
import SearchBar from "../components/SearchBar.jsx";
import TypeFilters from "../components/TypeFilters.jsx";
import { getFallbackImage, getPokemonImage } from "../utils/pokemonImage.js";
import { getPokemonThemePreset, getPokemonThemeType, getPokemonTypes } from "../utils/pokemonTheme.js";

export default function Home() {
  const [pokemones, setPokemones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("Todos");
  const [editingPokemon, setEditingPokemon] = useState(null);
  const [detailPokemon, setDetailPokemon] = useState(null);
  const [featuredPokemon, setFeaturedPokemon] = useState(null);

  async function loadPokemones() {
    setLoading(true);
    setError("");

    try {
      const data = await getPokemones();
      setPokemones(Array.isArray(data) ? data : []);
    } catch (apiError) {
      setError(`${apiError.message} Si el navegador bloquea la petición, habilita CORS en FastAPI para este frontend.`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPokemones();
  }, []);

  useEffect(() => {
    setFeaturedPokemon((currentFeatured) => {
      if (!pokemones.length) {
        return null;
      }

      const stillExists = currentFeatured && pokemones.some((pokemon) => pokemon.id === currentFeatured.id);

      return stillExists ? currentFeatured : pokemones[0];
    });
  }, [pokemones]);

  const types = useMemo(() => {
    const allTypes = pokemones.flatMap((pokemon) =>
      String(pokemon.tipo || "")
        .split("/")
        .map((type) => type.trim())
        .filter(Boolean)
    );

    return [...new Set(allTypes)].sort((a, b) => a.localeCompare(b));
  }, [pokemones]);

  const filteredPokemones = useMemo(() => {
    return pokemones.filter((pokemon) => {
      const matchesName = pokemon.nombre.toLowerCase().includes(search.trim().toLowerCase());
      const matchesType =
        selectedType === "Todos" ||
        String(pokemon.tipo || "")
          .split("/")
          .map((type) => type.trim())
          .includes(selectedType);

      return matchesName && matchesType;
    });
  }, [pokemones, search, selectedType]);

  const activePokemon = featuredPokemon || pokemones[0] || null;
  const activeTheme = getPokemonThemePreset(activePokemon);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = activeTheme.themeType;
    root.style.setProperty("--page-bg", activeTheme.pageBackground);
    root.style.setProperty("--accent", activeTheme.accent);
    root.style.setProperty("--accent-soft", activeTheme.accentSoft);
    root.style.setProperty("--accent-glow", activeTheme.accentGlow);
    root.style.setProperty("--accent-ink", activeTheme.accentInk);
    root.style.setProperty("--accent-alt", activeTheme.accentAlt);
  }, [activeTheme]);

  async function handleCreate(pokemon) {
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      await createPokemon(pokemon);
      setSuccess("Pokémon agregado correctamente.");
      await loadPokemones();
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleUpdate(pokemon) {
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      await updatePokemon(editingPokemon.id, pokemon);
      setSuccess("Pokémon actualizado correctamente.");
      setEditingPokemon(null);
      await loadPokemones();
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(pokemon) {
    const confirmed = window.confirm(`¿Eliminar a ${pokemon.nombre}?`);

    if (!confirmed) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      await deletePokemon(pokemon.id);
      setSuccess("Pokémon eliminado correctamente.");
      await loadPokemones();
    } catch (apiError) {
      setError(apiError.message);
    }
  }

  return (
    <main className="app-shell" data-theme={activeTheme.themeType}>
      <header className="topbar">
        <div className="topbar__brand">
          <span className="brand__mark">◉</span>
          <span>PokeDex</span>
        </div>
        <div className="topbar__actions">
          <span className="status-chip">Base de datos local</span>
          <button className="ghost-button" onClick={loadPokemones} type="button">
            Refrescar
          </button>
        </div>
      </header>

      <Hero pokemon={activePokemon} onDetails={setDetailPokemon} />

      <section className="toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <TypeFilters types={types} selectedType={selectedType} onSelect={setSelectedType} />
      </section>

      <section className="create-panel">
        <div className="section-heading">
          <h2>Agregar Pokémon</h2>
          <button className="ghost-button" onClick={loadPokemones} type="button">
            Refrescar
          </button>
        </div>
        <PokemonForm onSubmit={handleCreate} submitting={submitting} />
      </section>

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}

      <section className="pokemon-section">
        {loading ? (
          <div className="state-panel">Cargando Pokémon...</div>
        ) : filteredPokemones.length === 0 ? (
          <div className="state-panel">No hay Pokémon para mostrar.</div>
        ) : (
          <div className="pokemon-grid">
            {filteredPokemones.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onDetails={setDetailPokemon}
                onEdit={setEditingPokemon}
                onDelete={handleDelete}
                onSelect={setFeaturedPokemon}
              />
            ))}
          </div>
        )}
      </section>

      {editingPokemon && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Editar Pokémon"
          onClick={() => setEditingPokemon(null)}
        >
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <div className="section-heading">
              <h2>Editar Pokémon</h2>
              <button type="button" className="icon-button" onClick={() => setEditingPokemon(null)} aria-label="Cerrar">
                ×
              </button>
            </div>
            <PokemonForm
              mode="edit"
              initialPokemon={editingPokemon}
              onSubmit={handleUpdate}
              onCancel={() => setEditingPokemon(null)}
              submitting={submitting}
            />
          </div>
        </div>
      )}

      {detailPokemon && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Detalles de Pokémon"
          onClick={() => setDetailPokemon(null)}
        >
          <div
            className="modal-card detail-card"
            data-theme={getPokemonThemeType(detailPokemon)}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="detail-card__header">
              <span className="detail-card__badge">Detalle Pokémon</span>
              <button
                type="button"
                className="icon-button close-button"
                onClick={() => setDetailPokemon(null)}
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>

            <div className="detail-card__media">
              <img
                src={getPokemonImage(detailPokemon)}
                alt={detailPokemon.nombre}
                onError={(event) => {
                  if (!event.currentTarget.dataset.fallbackApplied) {
                    event.currentTarget.dataset.fallbackApplied = "true";
                    event.currentTarget.src = getFallbackImage(detailPokemon);
                  }
                }}
              />
            </div>

            <h2 className="detail-card__title">{detailPokemon.nombre}</h2>

            <div className="chip-row detail-card__types">
              {getPokemonTypes(detailPokemon).map((type) => (
                <span className="type-chip" key={type}>
                  {type}
                </span>
              ))}
            </div>

            <div className="detail-card__facts">
              <p>
                <strong>Nivel</strong>
                <span>{detailPokemon.nivel}</span>
              </p>
              <p>
                <strong>Habilidad</strong>
                <span>{detailPokemon.habilidad}</span>
              </p>
            </div>

            <p className="detail-card__description">{detailPokemon.descripcion}</p>
          </div>
        </div>
      )}
    </main>
  );
}
