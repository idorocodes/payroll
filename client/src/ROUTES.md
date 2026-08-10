# Frontend routes

- `/` — existing marketing landing page
- `/signup/company` — company multi-step onboarding
- `/signup/employee` — employee multi-step onboarding
- `/company` — company dashboard with mock data
- `/employee` — employee dashboard with mock data
- `*` — custom 404

## API placeholders

The frontend calls these routes through `src/lib/api.ts`:

- `POST /api/auth/company/signup`
- `POST /api/auth/employee/signup`
- `POST /api/auth/login`
- `GET /api/company/dashboard`
- `GET /api/company/employees`
- `GET /api/company/payroll`
- `GET /api/employee/dashboard`
- `GET /api/employee/profile`
- `GET /api/employee/payouts`



The dashboards intentionally fall back to mock data when the API is unreachable, so frontend development does not depend on the backend being finished.
