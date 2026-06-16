import API_URL from "../config/api";

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Invalid email or password");
  }

  localStorage.setItem("user", JSON.stringify(data.user));

  return data.user;
}

export function getLoggedUser() {
  const savedUser = localStorage.getItem("user");

  if (!savedUser) {
    return null;
  }

  return JSON.parse(savedUser);
}

export function getCurrentUser() {
  return getLoggedUser();
}

export function logoutUser() {
  localStorage.removeItem("user");
}

export function getAuthHeaders() {
  const savedUser = localStorage.getItem("user");

  if (!savedUser) {
    return {
      "Content-Type": "application/json",
    };
  }

  const user = JSON.parse(savedUser);

  return {
    "Content-Type": "application/json",
    "x-role": user.role,
  };
}