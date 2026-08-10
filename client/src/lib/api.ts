
 /* Central API boundary.
 *
 * Replace VITE_API_URL with the real backend URL when the backend is ready.
 * Dashboard pages intentionally fall back to mock data if the API is
 * unavailable during frontend development.
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "https://api.your-payroll-domain.com";

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  auth: {
    companySignup: (payload: unknown) =>
      apiRequest("/api/auth/company/signup", {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    employeeSignup: (payload: unknown) =>
      apiRequest("/api/auth/employee/signup", {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    login: (payload: unknown) =>
      apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
  },

  company: {
    dashboard: () => apiRequest("/api/company/dashboard"),
    employees: () => apiRequest("/api/company/employees"),
    payroll: () => apiRequest("/api/company/payroll"),
  },

  employee: {
    dashboard: () => apiRequest("/api/employee/dashboard"),
    profile: () => apiRequest("/api/employee/profile"),
    payouts: () => apiRequest("/api/employee/payouts"),
  },
};