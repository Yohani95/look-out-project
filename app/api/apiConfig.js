
const apiBaseUrl = "https://localhost:7152/api";

export const userApiUrl = `${apiBaseUrl}/usuarios`;
export const paisApiUrl = `${apiBaseUrl}/pais`;
export const placeApiUrl = `${apiBaseUrl}/SectorComercial`;
//clientes
export const clientApiUrl = `${apiBaseUrl}/clientes`;
export const clientWithEntitiesApiUrl = `${apiBaseUrl}/clientes/WithEntities`;

//person url
export const personApiUrl = `${apiBaseUrl}/personas`;
export const personKamApiUrl = `${apiBaseUrl}/personas/kam/2`;

//comuna url
export const comunaApiUrl = `${apiBaseUrl}/comunas`;

//comuna giros
export const girosApiUrl = `${apiBaseUrl}/giros`;

//comuna estados clientes
export const estadoClienteApiUrl = `${apiBaseUrl}/estadoClientes`;
// Puedes agregar más constantes de URL aquí 

export const apiHeaders = {
  "Content-Type": "application/json",
  // Agrega cualquier otro encabezado 
  //que necesites para todas las solicitudes
};
