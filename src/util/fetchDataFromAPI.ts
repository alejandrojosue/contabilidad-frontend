import { MAX_RETRIES, PUBLIC_STRAPI_HOST } from '../env/config';

/**
 * Realiza una solicitud a la API y devuelve los datos.
 * @param {string} url - La ruta de la API a la que se realizará la solicitud.
 * @param {string} method - El método HTTP de la solicitud (por defecto 'GET').
 * @param {Object} data - Los datos a enviar en el cuerpo de la solicitud (para
 *     POST y PUT).
 * @returns {Promise} Una promesa que resuelve en los datos de la respuesta de
 *     la API.
 * @throws {Error} Si se produce un error en la solicitud.
 */
export const fetchDataFromAPI = async ({
  url,
  method = 'POST',
  data,
  token,
}: {
  url: string;
  method?: string;
  data?: Object;
  token?: string;
}): Promise<any> => {
  const userid: number = parseInt(localStorage.getItem('userid') || '0');
  const uType: string = localStorage.getItem('uType') || '';
  let origin: string = '';

  try {
    const resIP = await fetch('https://api.ipify.org?format=json');
    const resJSON = await resIP.json();
    origin = resJSON.ip;
  } catch (error) {
    console.error('Error al obtener la IP:', error);
  }

  data = { ...data, user: userid, origin, uType, channel: 'W' } as Object;
  let retries = 0;
  let errorResponse: Error | null = null;

  while (retries < MAX_RETRIES) {
    try {
      if (!url || typeof url !== 'string') throw new Error('La URL no es válida.');

      let headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const requestOptions: RequestInit = {
        method,
        headers,
      };

      if (data) requestOptions.body = JSON.stringify(data);

      const response = await fetch(PUBLIC_STRAPI_HOST + url, requestOptions);

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          window.location.href = '/unauthorized';
          return;
        }

        const errorMessages: { [key: number]: string } = {
          400: 'Datos no válidos',
          404: 'Recurso no encontrado',
          500: 'Ha ocurrido un error en el servidor',
          503: 'Servicio no disponible. Por favor, intente más tarde.',
        };

        throw new Error(errorMessages[response.status] || response.statusText);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      retries++;
      errorResponse = error as Error;
      console.error(`Error fetching data (attempt ${retries} of ${MAX_RETRIES}): ${errorResponse.message}`);

      if (errorResponse.message.trim() !== 'Failed to fetch' && retries < MAX_RETRIES) {
        break;
      }
    }
  }

  console.error(`Failed to fetch data after ${MAX_RETRIES} attempts: ${errorResponse ? errorResponse.message : ''}`);

  if (errorResponse?.message === 'Failed to fetch') throw new Error('No hay conexión con el servidor');
  throw new Error(`${errorResponse ? errorResponse.message : ''}`);
};
