const ADMIN_TOKEN_KEY = "hyprtip_admin_token";

async function readJsonSafely(response) {
  const text = await response.text();
  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch (_error) {
    throw new Error("Server returned an invalid response");
  }
}

export function getAdminToken() {
  return localStorage.getItem(ADMIN_TOKEN_KEY) || "";
}

export function setAdminToken(token) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

export async function loginAdmin({ username, password }) {
  const response = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await readJsonSafely(response);
  if (!response.ok) {
    throw new Error(data.error || "Login failed");
  }
  return data;
}

export async function fetchAdminPayments(token) {
  const response = await fetch("/api/admin/payments", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await readJsonSafely(response);
  if (!response.ok) {
    throw new Error(data.error || "Could not fetch admin payments");
  }
  return data;
}
