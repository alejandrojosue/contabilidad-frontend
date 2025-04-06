import { errorResponse } from '../types/types';
import { MAX_RETRIES, PUBLIC_STRAPI_HOST } from '../env/config';
import { getCookie } from './cookies';
import { returnIP } from './returnIP';

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
  method = 'GET',
  data,
  isLogin = false
}: {
  url: string;
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
  data?: Object;
  isLogin?: boolean;
}): Promise<any> => {
  if(!navigator.onLine) return {error: {msg: "No hay conexión a internet", details:[]}} as errorResponse;
  console.log({connected: navigator.onLine})
  const userid: number = parseInt(localStorage.getItem('userid') || '0');
  const uType: string = localStorage.getItem('uType') || 'USER';
  const token = getCookie('token')
  let origin: string = await returnIP();
  if (method !== 'GET'){
    data = { ...data, user: userid, ipAddress: origin, uType, channel: 'W' } as Object;
  }
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

      // if (!response.ok) {

        if (response.status === 401 && !isLogin) {
          window.location.href = '/signin';
          return;
        }

        if (response.status === 403) {
          location.href = '/unauthorized'
          return;
        }

      //   const errorMessages: { [key: number]: string } = {
      //     400: 'Datos no válidos',
      //     404: 'Recurso no encontrado',
      //     500: 'Ha ocurrido un error en el servidor',
      //     503: 'Servicio no disponible. Por favor, intente más tarde.',
      //   };

      //   throw new Error(errorMessages[response.status] || response.statusText);
      // }

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

  if (errorResponse?.message === 'Failed to fetch') return {error: {msg: "Servicio no disponible. Por favor intentelo más tarde.", details:[]}} as errorResponse;
  return {error: {msg: errorResponse ? errorResponse.message : '', details:[]}} as errorResponse
};
