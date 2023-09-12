
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
//persona url
export const kam=2;
export const contacto=3;
export const personApiUrl = `${apiBaseUrl}/personas`;
export const personKamApiUrl = `${apiBaseUrl}/personas/tipoPersona/${kam}`;
export const personContactApiUrl = `${apiBaseUrl}/personas/tipoPersona/${contacto}`;
export const personContactCreateApiUrl = `${apiBaseUrl}/personas/createWithEntities`;
export const personContactEditApiUrl = `${apiBaseUrl}/personas/editWithEntities`;
export const personContactDeleteApiUrl = `${apiBaseUrl}/personas/deleteWithEntities`;
//ClientePersona
export const ClientePersonaEditApiUrl = `${apiBaseUrl}/ClientePersona/GetPersonaDTOById`;
export const ClientePersonaGetAllApiUrl = `${apiBaseUrl}/ClientePersona/GetAllClientRelations`;
//comuna url
export const comunaApiUrl = `${apiBaseUrl}/comunas`;

//telefono url
export const phoneApiUrl = `${apiBaseUrl}/telefonos`;
export const phoneCreateApiUrl = `${apiBaseUrl}/telefonos`;
export const phoneEditApiUrl = `${apiBaseUrl}/telefonos`;

export const phoneTypeApiUrl = `${apiBaseUrl}/tipoTelefonos`;
//email url

export const emailApiUrl = `${apiBaseUrl}/Email`;
export const emailEntitiesApiUrl = `${apiBaseUrl}/Email/getAllEmail`;
export const emailCreateApiUrl = `${apiBaseUrl}/email/create`;
export const emailEditApiUrl = `${apiBaseUrl}/email/edit`;

export const emailTypeApiUrl = `${apiBaseUrl}/tipoEmail`;

//address url
export const addressApiUrl = `${apiBaseUrl}/direccion`;
export const addressCreateApiUrl = `${apiBaseUrl}/email`;
export const addressEditApiUrl = `${apiBaseUrl}/email`;

export const addressTypeApiUrl = `${apiBaseUrl}/tipoEmail`;


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
