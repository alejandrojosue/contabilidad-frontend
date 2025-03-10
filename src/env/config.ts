// Variables extraídas de .env
export const {
  PUBLIC_STRAPI_HOST,
  PUBLIC_COMPANY_NAME,
  PUBLIC_STRAPI_HOST_BASE,
} = import.meta.env;

// Número máximo de intentos de solicitud de la API
export const MAX_RETRIES = 3;
