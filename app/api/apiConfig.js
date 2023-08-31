
const apiBaseUrl = "https://localhost:7152/api";

export const userApiUrl = `${apiBaseUrl}/usuarios`;
export const paisApiUrl = `${apiBaseUrl}/pais`;
export const placeApiUrl = `${apiBaseUrl}/SectorComercial`;

//clientes
export const clientApiUrl = `${apiBaseUrl}/clientes`;
export const clientWithEntitiesApiUrl = `${apiBaseUrl}/clientes/WithEntities`;
export const clientCreateApiUrl = `${apiBaseUrl}/Clientes/CreateWithEntities`;
export const clientDeleteApiUrl = `${apiBaseUrl}/Clientes/DeleteWithEntities`;
export const clientUpdatepiUrl = `${apiBaseUrl}/Clientes/UpdateWithEntities`;
export const clientWithContactApiUrl = `${apiBaseUrl}/Clientes/GetAllIdWithContact`;
export const clientGetByIdApiUrl = `${apiBaseUrl}/Clientes/GetByIdWithKamAndContact`;
//person url
const kam=2;
const contacto=3
export const personApiUrl = `${apiBaseUrl}/personas`;
export const personKamApiUrl = `${apiBaseUrl}/personas/tipoPersona/${kam}`;
export const personContactApiUrl = `${apiBaseUrl}/personas/tipoPersona/${contacto}`;

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
