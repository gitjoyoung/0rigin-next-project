// src/shared/constants/api.ts

const API_BASE = "/api/v1";

export const API_ENDPOINTS = {
  AUTH: {
    SIGN_IN: `${API_BASE}/auth/sign-in`,
    SIGN_UP: `${API_BASE}/auth/sign-up`,
    SIGN_OUT: `${API_BASE}/auth/sign-out`,
    REFRESH: `${API_BASE}/auth/refresh`,
    PASSWORD: {
      RESET_REQUEST: `${API_BASE}/auth/password/reset-request`,
      RESET: `${API_BASE}/auth/password/reset`,
    },
    EMAIL: {
      VERIFY: `${API_BASE}/auth/email/verify`,
      CHANGE: `${API_BASE}/auth/email/change`,
    },
    OAUTH: {
      CALLBACK: `${API_BASE}/auth/oauth/callback`,
    },
  },

  ME: {
    ROOT: `${API_BASE}/me`,
    PROFILE: `${API_BASE}/me/profile`,
    SESSIONS: `${API_BASE}/me/sessions`,
  },

  USERS: {
    DETAIL: (id: string) => `${API_BASE}/users/${id}`,
  },
} as const;
