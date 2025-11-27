// Centralized environment access
// Client-exposed (must start with PUBLIC_)
export const PUBLIC_PROMOTION_ID: number = Number((((import.meta as any).env.PUBLIC_PROMOTION_ID) ?? '').toString()) || 0;
export const PUBLIC_DEBUG_CREATORS = ((import.meta as any).env.PUBLIC_DEBUG_CREATORS || 'false') === 'true';

// Server-only (must NOT start with PUBLIC_)
export const CONTACT_API_HOST = (import.meta as any).env.CONTACT_API_HOST || '';
export const API_TOKEN = (import.meta as any).env.API_TOKEN || '';

// Logging level for server-side logs
export const LOG_LEVEL = (import.meta as any).env.LOG_LEVEL || 'info';

export const isDev = (import.meta as any).env.DEV;
