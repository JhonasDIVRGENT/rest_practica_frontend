const API_BASE_URL = "http://127.0.0.1:8000";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    let message = "Ocurrió un error al comunicarse con la API.";

    try {
      const data = await response.json();
      message = data.detail || data.message || message;
    } catch {
      message = response.statusText || message;
    }

    throw new Error(Array.isArray(message) ? message.map((item) => item.msg).join(", ") : message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function getPokemones() {
  return request("/pokemones/");
}

export function getPokemon(id) {
  return request(`/pokemones/${id}`);
}

export function createPokemon(pokemon) {
  return request("/pokemones/", {
    method: "POST",
    body: JSON.stringify(pokemon),
  });
}

export function updatePokemon(id, pokemon) {
  return request(`/pokemones/${id}`, {
    method: "PUT",
    body: JSON.stringify(pokemon),
  });
}

export function deletePokemon(id) {
  return request(`/pokemones/${id}`, {
    method: "DELETE",
  });
}
