
export const BASE_URL = "https://spotify.f8team.dev";

export const storage = {
  getAccessToken: () => localStorage.getItem("access_token"),
  getRefreshToken: () => localStorage.getItem("refresh_token"),
  setTokens({ access_token, refresh_token }) {
    if (access_token) localStorage.setItem("access_token", access_token);
    if (refresh_token) localStorage.setItem("refresh_token", refresh_token);
  },
  getUser() {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  },
  setUser(user) {
    if (user) localStorage.setItem("user", JSON.stringify(user));
  },
  clear() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
  },
};

export const isLoggedIn = () => Boolean(storage.getAccessToken());

export class ApiError extends Error {
  constructor(status, data) {
    super(getErrorMessage(data, status));
    this.status = status;
    this.data = data;
  }
}

export function getErrorMessage(data, status) {
  const err = data?.error;
  if (Array.isArray(err?.details) && err.details.length) {
    return err.details.map((d) => d.message).join(". ");
  }
  if (err?.code === "EMAIL_EXISTS") return "Email này đã được đăng ký.";
  return err?.message || data?.message || `Có lỗi xảy ra (mã ${status}).`;
}

let refreshPromise = null;

export function refreshAccessToken() {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const refresh_token = storage.getRefreshToken();
    if (!refresh_token) throw new Error("Không có refresh token");

    const res = await fetch(`${BASE_URL}/api/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.access_token) throw new ApiError(res.status, data);

    storage.setTokens(data);
    return data.access_token;
  })();

  refreshPromise.finally(() => (refreshPromise = null));
  return refreshPromise;
}

export function forceLogout(reason = "expired") {
  storage.clear();
  window.location.href = `/login.html?reason=${reason}`;
}

export async function apiFetch(path, { method = "GET", body, auth = true, _retry = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = storage.getAccessToken();
  if (auth && token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));

  if (res.status === 401 && auth && !_retry && storage.getRefreshToken()) {
    try {
      await refreshAccessToken();
    } catch {
      forceLogout("expired");
      throw new ApiError(401, data);
    }
    return apiFetch(path, { method, body, auth, _retry: true });
  }

  if (res.status === 401 && auth && token) {
    forceLogout("expired");
  }

  if (!res.ok) throw new ApiError(res.status, data);
  return data;
}

export const auth = {
  async login(email, password) {
    const data = await apiFetch("/api/auth/login", {
      method: "POST",
      body: { email, password },
      auth: false,
    });
    storage.setTokens(data);
    storage.setUser(data.user);
    return data;
  },

  async register(payload) {
    const data = await apiFetch("/api/auth/register", {
      method: "POST",
      body: payload,
      auth: false,
    });
  
    storage.setTokens(data);
    storage.setUser(data.user);
    return data;
  },

  logout() {
    storage.clear();
    window.location.href = "/login.html?reason=logout";
  },
};

export function requireAuth() {
  if (!isLoggedIn()) window.location.replace("/login.html?reason=required");
}
export function redirectIfLoggedIn() {
  if (isLoggedIn()) window.location.replace("/index.html");
}