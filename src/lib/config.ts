// Centralized configuration for API endpoints.
// Use Vite environment variable `VITE_API_BASE` when available (set in .env files),
// otherwise fall back to localhost for local development.
const DEFAULT_API_BASE = 'http://localhost:5000/api/v1'

// import.meta.env is provided by Vite. The env var should be named VITE_API_BASE.
// Example .env: VITE_API_BASE="https://api.example.com/api/v1"
export const API_BASE =
  (import.meta.env?.VITE_API_BASE as string) || DEFAULT_API_BASE
