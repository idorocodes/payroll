
 /* Central API boundary.
 *
 * Replace VITE_API_URL with the real backend URL when the backend is ready.
 * Dashboard pages intentionally fall back to mock data if the API is
 * unavailable during frontend development.
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:5000";

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
      apiRequest("/api/v1/auth/company/signup", {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    employeeSignup: (payload: unknown) =>
      apiRequest("/api/v1/auth/employee/signup", {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    companylogin: (payload: unknown) =>
      apiRequest("/api/v1/auth/company/login", {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    employeelogin: (payload: unknown) =>
      apiRequest("/api/v1/auth/employee/login", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
  },

  company: {
    dashboard: () => apiRequest("/api/v1/company/dashboard"),
    employees: () => apiRequest("/api/v1/company/employees"),
    payroll: () => apiRequest("/api/v1/company/payroll"),
  },

  employee: {
    dashboard: () => apiRequest("/api/v1/employee/dashboard"),
    profile: () => apiRequest("/api/v1/employee/profile"),
    payouts: () => apiRequest("/api/v1/employee/payouts"),
  },
};