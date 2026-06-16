const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function getSavedUser() {
  const savedUser = localStorage.getItem("user");

  if (!savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser);
  } catch {
    return null;
  }
}

export function getApiHeaders(extraHeaders = {}) {
  const user = getSavedUser();

  return {
    "Content-Type": "application/json",
    ...(user?.role ? { "x-role": user.role } : {}),
    ...extraHeaders,
  };
}

export function apiFetch(path, options = {}) {
  return fetch(`${API_URL}${path}`, {
    ...options,
    headers: getApiHeaders(options.headers || {}),
  });
}

export default API_URL;