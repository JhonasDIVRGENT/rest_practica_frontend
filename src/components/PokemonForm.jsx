import { useEffect, useState } from "react";

const emptyPokemon = {
  nombre: "",
  tipo: "",
  nivel: 1,
  habilidad: "",
  descripcion: "",
  imagen_url: "",
};

export default function PokemonForm({ mode = "create", initialPokemon, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(emptyPokemon);

  useEffect(() => {
    if (initialPokemon) {
      const { id, ...editablePokemon } = initialPokemon;
      setForm({ ...emptyPokemon, ...editablePokemon });
    } else {
      setForm(emptyPokemon);
    }
  }, [initialPokemon]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: name === "nivel" ? Number(value) : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      ...form,
      nivel: Number(form.nivel),
    });

    if (mode === "create") {
      setForm(emptyPokemon);
    }
  }

  const buttonText = mode === "edit" ? "Guardar cambios" : "Agregar Pokémon";

  return (
    <form className={mode === "edit" ? "pokemon-form modal-form" : "pokemon-form"} onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Nombre
          <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: Pikachu" required />
        </label>
        <label>
          Tipo
          <input name="tipo" value={form.tipo} onChange={handleChange} placeholder="Ej: Eléctrico" required />
        </label>
        <label>
          Nivel
          <input name="nivel" type="number" min="1" value={form.nivel} onChange={handleChange} required />
        </label>
        <label>
          Habilidad
          <input name="habilidad" value={form.habilidad} onChange={handleChange} placeholder="Ej: Impactrueno" required />
        </label>
        <label className="wide">
          URL de imagen
          <input
            name="imagen_url"
            value={form.imagen_url}
            onChange={handleChange}
            placeholder="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
            required={mode !== "edit"}
            readOnly={mode === "edit"}
            aria-readonly={mode === "edit"}
          />
          {mode === "edit" && (
            <small className="muted">La imagen proviene de la API y no puede modificarse aquí.</small>
          )}
        </label>
        <label className="wide">
          Descripción
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Breve descripción..."
            rows="3"
            required
          />
        </label>
      </div>

      <div className="form-actions">
        {onCancel && (
          <button type="button" className="ghost-button" onClick={onCancel}>
            Cancelar
          </button>
        )}
        <button className="primary-button" type="submit" disabled={submitting}>
          {submitting ? "Guardando..." : buttonText}
        </button>
      </div>
    </form>
  );
}
