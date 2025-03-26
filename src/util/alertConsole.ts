import { returnIP } from "./returnIP";

export const alertConsole = async () => {
  const ip = await returnIP()
  const data = {
    address: ip,
    platform: navigator?.platform === 'Win32' ? 'Windows' : navigator?.platform === 'MacIntel' ? 'Mac' : navigator?.platform === 'Linux x86_64' ? 'Linux' : navigator?.platform,
    deviceType: navigator?.userAgentData?.mobile ? 'mobile' : 'Desktop'
  };
  console.clear()
  console.log(
      '%c¡Advertencia!',
      'color: red; font-size: 35px; font-weight: bold;',
  );
  console.log(
      `%cEsta función del navegador está pensada para desarrolladores. Si alguien te indicó que copiaras y pegaras algo aquí para habilitar una función de este sitio o para "hackear" la cuenta de alguien, se trata de un fraude. Si lo haces, esta persona podrá acceder a tu cuenta.`,
      'color: black;  font-size: 1.2em;',
  );
  console.log(
      `address: ${data.address}\nplatform: ${data.platform}\ndeviceType: ${data.deviceType}`
  );
}