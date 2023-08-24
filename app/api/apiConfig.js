
const apiBaseUrl = "https://localhost:44337/api";

export const userApiUrl = `${apiBaseUrl}/usuarios`;
export const paisApiUrl = `${apiBaseUrl}/pais`;
export const placeApiUrl = `${apiBaseUrl}/SectorComercials`;
export const clientApiUrl = `${apiBaseUrl}/clientes`;
// Puedes agregar más constantes de URL aquí

export const apiHeaders = {
  "Content-Type": "application/json",
  // Agrega cualquier otro encabezado que necesites para todas las solicitudes
};
