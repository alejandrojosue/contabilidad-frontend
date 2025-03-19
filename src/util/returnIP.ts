export const returnIP = async ():Promise<string> => {
  let origin: string = '';
  try {
    const resIP = await fetch('https://api.ipify.org?format=json');
    const resJSON = await resIP.json();
    origin = resJSON.ip;
  } catch (error) {
    console.error('Error al obtener la IP:', error);
  }
  return origin
}