let apiBaseUrl = '';
if (process.env.NODE_ENV === 'development') {
  // Código específico para el entorno de desarrollo
  apiBaseUrl = 'https://localhost:44318/api';
} else {
  // Código específico para el entorno de producción
  apiBaseUrl = 'https://kpazserv0005.azurewebsites.net/api';
}

export const apiHeaders = {
  'Content-Type': 'application/json',
  // Agrega cualquier otro encabezado
  //que se necesite para todas las solicitudes
};

export const userApiUrl = `${apiBaseUrl}/usuarios`;
export const paisApiUrl = `${apiBaseUrl}/pais`;
export const placeApiUrl = `${apiBaseUrl}/SectorComercial`;
export const BancoApiUrl = `${apiBaseUrl}/Banco`;
//clientes
export const clientApiUrl = `${apiBaseUrl}/clientes`;
export const clientWithEntitiesApiUrl = `${apiBaseUrl}/clientes/WithEntities`;
export const clientWithDTOApiUrl = `${apiBaseUrl}/clientes/GetDTOClient`;
export const clientCreateApiUrl = `${apiBaseUrl}/Clientes/CreateWithEntities`;
export const clientDeleteApiUrl = `${apiBaseUrl}/Clientes/DeleteWithEntities`;
export const clientUpdatepiUrl = `${apiBaseUrl}/Clientes/UpdateWithEntities`;
export const clientWithContactApiUrl = `${apiBaseUrl}/Clientes/GetAllIdWithContact`;
export const clientGetByIdApiUrl = `${apiBaseUrl}/Clientes/GetByIdWithKamAndContact`;

//persona url
export const kam = 2;
export const contacto = 3;
export const personApiUrl = `${apiBaseUrl}/personas`;
export const personContactGetAllApiUrl = `${apiBaseUrl}/personas/GetAllContactEnteties`;
export const personTipoPersonaApiUrl = `${apiBaseUrl}/personas/tipoPersona`;
export const personKamApiUrl = `${apiBaseUrl}/personas/tipoPersona/${kam}`;
export const personContactApiUrl = `${apiBaseUrl}/personas/tipoPersona/${contacto}`;
export const personContactCreateApiUrl = `${apiBaseUrl}/personas/createWithEntities`;
export const personContactEditApiUrl = `${apiBaseUrl}/personas/editWithEntities`;
export const personContactDeleteApiUrl = `${apiBaseUrl}/personas/deleteWithEntities`;
export const personContactByIdClientApiUrl = `${apiBaseUrl}/Personas/GetAllContactByIdClient`;
export const personGetAllContactDTOClientApiUrl = `${apiBaseUrl}/Personas/GetAllContact`;
/**
 * URL PARA PROFESIONALES
 **/
export const professionalApiUrl = `${apiBaseUrl}/personas`;
export const professionalCreateApiUrl = `${apiBaseUrl}/personas`;
export const professionalEditApiUrl = `${apiBaseUrl}/personas`;
//ClientePersona
export const ClientePersonaApiUrl = `${apiBaseUrl}/ClientePersona`;
export const ClientePersonaEditApiUrl = `${apiBaseUrl}/ClientePersona/GetPersonaDTOById`;
export const ClientePersonaGetAllApiUrl = `${apiBaseUrl}/ClientePersona/GetAllClientRelations`;

//comuna url
export const comunaApiUrl = `${apiBaseUrl}/comunas`;

//telefono url
export const phoneApiUrl = `${apiBaseUrl}/telefono`;
export const phoneCreateApiUrl = `${apiBaseUrl}/telefono`;
export const phoneEditApiUrl = `${apiBaseUrl}/telefono`;
export const phoneEntitiesApiUrl = `${apiBaseUrl}/telefono/getAllTelefonos`;
export const phoneTypeApiUrl = `${apiBaseUrl}/tipoTelefono`;
export const phoneByIdPersonApiUrl = `${apiBaseUrl}/telefono/getAllTelefonoByIdPerson`;

//email url

export const emailApiUrl = `${apiBaseUrl}/Email`;
export const emailEntitiesApiUrl = `${apiBaseUrl}/Email/getAllEmail`;
export const emailCreateApiUrl = `${apiBaseUrl}/email/create`;
export const emailEditApiUrl = `${apiBaseUrl}/email/edit`;
export const emailByIdPersonApiUrl = `${apiBaseUrl}/email/getAllEmailById`;
export const emailTypeApiUrl = `${apiBaseUrl}/tipoEmail`;

//address url
export const addressApiUrl = `${apiBaseUrl}/direccion`;
export const addressCreateApiUrl = `${apiBaseUrl}/email`;
export const addressEditApiUrl = `${apiBaseUrl}/email`;
export const addressTypeApiUrl = `${apiBaseUrl}/tipoEmail`;
export const addressByIdPersonApiUrl = `${apiBaseUrl}/direccion/getAllDireccionByIdPerson`;

//comuna giros
export const girosApiUrl = `${apiBaseUrl}/giros`;

//comuna estados clientes
export const estadoClienteApiUrl = `${apiBaseUrl}/estadoClientes`;

//Tipo Servicio o Proyecto, ProyectoDocumento
export const TipoServicioApiUrl = `${apiBaseUrl}/TipoServicio`;
export const proyectoCreateAsyncApiUrl = `${apiBaseUrl}/proyecto/createAsync`;
export const proyectoUpdateAsyncApiUrl = `${apiBaseUrl}/proyecto/UpdateWithEntities`;
export const proyectoDeleteAsyncApiUrl = `${apiBaseUrl}/proyecto/DeleteWithEntities`;
export const proyectoApiUrl = `${apiBaseUrl}/proyecto`;
export const proyectoDocumentoByIdApiUrl = `${apiBaseUrl}/ProyectoDocumento/GetByIdProject`;
export const proyectoLastIdApiUrl = `${apiBaseUrl}/proyecto/GetLastId`;
export const proyectoByIdWithEntitiesApiUrl = `${apiBaseUrl}/proyecto/GetByIdWithEntities`;
export const proyectoGeFileApiUrl = `${apiBaseUrl}/proyecto/GeFileByProject`;
export const proyectoWithEntitiesApiUrl = `${apiBaseUrl}/proyecto/WithEntities`;
//tarifario convenido
export const tarifarioApiUrl = `${apiBaseUrl}/TarifarioConvenio`;
export const tarifarioGetByIdProyectoApiUrl = `${apiBaseUrl}/TarifarioConvenio/GetByIdProyectoWithEntities`;
//Proyecto participantes

export const participanteApiUrl = `${apiBaseUrl}/ProyectoParticipante`;
export const participanteCreateAsyncApiUrl = `${apiBaseUrl}/ProyectoParticipante/CreateAsync`;
export const participanteDeletedByRutApiUrl = `${apiBaseUrl}/ProyectoParticipante/deletedAsync`;
export const participanteGetByIdProyectoApiUrl = `${apiBaseUrl}/ProyectoParticipante/GetByIdProyecto`;
//periodo proyecto GetPeriodoProyecto
export const periodoApiUrl = `${apiBaseUrl}/PeriodoProyecto`;
export const periodoCreateApiUrl = `${apiBaseUrl}/PeriodoProyecto/createAsync`;
export const periodoGetByIdProyectoApiUrl = `${apiBaseUrl}/PeriodoProyecto/GetByIdProyecto`;
export const getPeriodoProyectoApiUrl = `${apiBaseUrl}/PeriodoProyecto/GetPeriodoProyecto`;
//Novedades
export const novedadApiUrl = `${apiBaseUrl}/novedades`;
export const novedadWithEntetiesApiUrl = `${apiBaseUrl}/novedades/NovedadesWithEntities`;
export const novedadCreateAsyncApiUrl = `${apiBaseUrl}/novedades/CreateAsync`;
// Tipo de novedades
export const tipoNovedadApiUrl = `${apiBaseUrl}/tipoNovedades`;
//perfil
export const perfilApiUrl = `${apiBaseUrl}/perfil`;
//moneda
export const monedaApiUrl = `${apiBaseUrl}/Moneda`;
//periodoProfesional
export const periodoProfesionalApiUrl = `${apiBaseUrl}/PeriodoProfesionales`;
export const getPeriodoProfesionalApiUrl = `${apiBaseUrl}/PeriodoProfesionales/GetAllEntitiesByIdPeriod`;

//facturaPeriodo
export const facturaPeriodoApiUrl = `${apiBaseUrl}/FacturaPeriodo`;
export const EstadoFacturaPeriodoApiUrl = `${apiBaseUrl}/EstadoFacturaPeriodo`;
//FacturaAdaptacionApiUrl

export const FacturaAdaptacionApiUrl = `${apiBaseUrl}/FacturaAdaptacion`;

//Tipofacturacion
export const tipoFacturacionApiUrl = `${apiBaseUrl}/TipoFacturacion`;

//DocumentoFactura
export const documentoFacturaApiUrl = `${apiBaseUrl}/documentoFactura`;

//DiaPagos
export const DiaPagosApiUrl = `${apiBaseUrl}/diaPagos`;

//Empresa prestadora
export const EmpresaPrestadoraApiUrl = `${apiBaseUrl}/empresaPrestadora`;

//Soporte
export const soporteApiUrl = `${apiBaseUrl}/soporte`;
export const soporteWithEntitiesApiUrl = `${soporteApiUrl}/GetAllEntities`;
export const soporteWithEntitiesByIdApiUrl = `${soporteApiUrl}/GetAllEntitiesById`;
export const GetAllEntitiesByIdTipoSoporteApiUrl = `${soporteApiUrl}/GetAllEntitiesByIdTipoSoporte`;
//horas utilizadas soporte
export const horasUtilizadasApiUrl = `${apiBaseUrl}/horasUtilizadas`;
export const getAllHorasByIdSoportepiUrl = `${horasUtilizadasApiUrl}/getAllHorasByIdSoporte`;
export const horasUtilizadascreateBagApiUrl = `${horasUtilizadasApiUrl}/createBag`;
export const horasUtilizadasupdateBagApiUrl = `${horasUtilizadasApiUrl}/updateBag`;
export const horasUtilizadascreateOnDemandApiUrl = `${horasUtilizadasApiUrl}/createOnDemand`;
export const horasUtilizadasupdateOnDemandApiUrl = `${horasUtilizadasApiUrl}/updateOnDemand`;
//Oportunidad
export const OportunidadApiUrl = `${apiBaseUrl}/oportunidad`;
//tipo oportunidad
export const tipoOportunidadApiUrl = `${apiBaseUrl}/TipoOportunidad`;
//estado oportunidad
export const EstadoOportunidadApiUrl = `${apiBaseUrl}/EstadoOportunidad`;
//area servicio oportunidad
export const AreaServicioOportunidadApiUrl = `${apiBaseUrl}/AreaServicioOportunidad`;
//documento oportunidad
export const documentoOportunidadApiUrl = `${apiBaseUrl}/DocumentoOportunidad`;
//novedad oportunidad
export const NovedadOportunidadApiUrl = `${apiBaseUrl}/NovedadOportunidad`;
//LicitacionOportunidadApiUrl
export const LicitacionOportunidadApiUrl = `${apiBaseUrl}/LicitacionOportunidad`;
//TipoLicenciaOportunidadApiUrl
export const TipoLicenciaOportunidadApiUrl = `${apiBaseUrl}/TipoLicenciaOportunidad`;
//OrigenOportunidadApiUrl
export const OrigenOportunidadApiUrl = `${apiBaseUrl}/OrigenOportunidad`;
//TipoCerradaOportunidadApiUrl
export const TipoCerradaOportunidadApiUrl = `${apiBaseUrl}/TipoCerradaOportunidad`;
//log
export const LogApiUrl = `${apiBaseUrl}/log`;

//Licencia venta
export const VentaLicenciaApiUrl = `${apiBaseUrl}/VentaLicencia`;
//estado venta licencia
export const EstadoVentaLicenciaApiUrl = `${apiBaseUrl}/EstadoVentaLicencia`;
//MarcaLicenciaApiUrl
export const MarcaLicenciaApiUrl = `${apiBaseUrl}/MarcaLicencia`;
//MayoristaLicenciaApiUrl
export const MayoristaLicenciaApiUrl = `${apiBaseUrl}/MayoristaLicencia`;
//TarifarioVentaLicenciaApiUrl
export const TarifarioVentaLicenciaApiUrl = `${apiBaseUrl}/TarifarioVentaLicencia`;
//
export const documentoLicenciaApiUrl = `${apiBaseUrl}/documentoLicencia`;
//Prospectos
export const ProspectoApiUrl = `${apiBaseUrl}/Prospecto`;
export const EstadoProspectoApiUrl = `${apiBaseUrl}/EstadoProspecto`;
export const ContactoProspectoApiUrl = `${apiBaseUrl}/ContactoProspecto`;
export const IndustriaApiUrl = `${apiBaseUrl}/Industria`;
export const EmpresaApiUrl = `${apiBaseUrl}/Empresa`;
export const LlamadaProspectoApiUrl = `${apiBaseUrl}/LlamadaProspecto`;
export const ReunionProspectoApiUrl = `${apiBaseUrl}/ReunionProspecto`;
export const TipoContactoProspectoApiUrl = `${apiBaseUrl}/TipoContactoProspecto`;
export const MedioLlamadaProspectoApiUrl = `${apiBaseUrl}/MedioLlamadaProspecto`;
export const EstadoReunionProspectoApiUrl = `${apiBaseUrl}/EstadoReunionProspecto`;

////////////////////////////////
//proyecto desarrollo
// URL de la entidad ProyectoDesarrollo
export const ProyectoDesarrolloApiUrl = `${apiBaseUrl}/ProyectoDesarrollo`;
// URL de la entidad EtapaProyectoDesarrollo
export const EtapaProyectoDesarrolloApiUrl = `${apiBaseUrl}/EtapaProyectoDesarrollo`;
// URL de la entidad EtapaPlanificacionProyectoDesarrollo
export const EtapaPlanificacionProyectoDesarrolloApiUrl = `${apiBaseUrl}/EtapaPlanificacionProyectoDesarrollo`;
// URL de la entidad TipoProyectoDesarrollo
export const TipoProyectoDesarrolloApiUrl = `${apiBaseUrl}/TipoProyectoDesarrollo`;
// URL de la entidad EstadoProyectoDesarrollo
export const EstadoProyectoDesarrolloApiUrl = `${apiBaseUrl}/EstadoProyectoDesarrollo`;
// URL de la entidad HitoProyectoDesarrollo
export const HitoProyectoDesarrolloApiUrl = `${apiBaseUrl}/HitoProyectoDesarrollo`;
export const TipoHitoProyectoDesarrolloApiUrl = `${apiBaseUrl}/TipoHitoProyectoDesarrollo`;
export const NovedadProyectoDesarrolloApiUrl = `${apiBaseUrl}/NovedadesProyectoDesarrollo`;
export const TipoNovedadProyectoDesarrolloApiUrl = `${apiBaseUrl}/TipoNovedadesProyectoDesarrollo`;
export const PlanificacionProyectoDesarrolloApiUrl = `${apiBaseUrl}/PlanificacionProyectoDesarrollo`;
//DocumentoProyectoDesarrolloApiUrl
export const DocumentoProyectoDesarrolloApiUrl = `${apiBaseUrl}/DocumentoProyectoDesarrollo`;
//RegistroHorasProyectoDesarrolloApiUrl
export const RegistroHorasProyectoDesarrolloApiUrl = `${apiBaseUrl}/RegistroHorasProyectoDesarrollo`;
//ProfesionalProyectoDesarrolloApiUrl
export const ProfesionalProyectoDesarrolloApiUrl = `${apiBaseUrl}/ProfesionalesProyectoDesarrollo`;
////////////////////////////////

//funcionalidades de rol
export const FuncionalidadApiUrl = `${apiBaseUrl}/Funcionalidad`;
export const RolFuncionalidadApiUrl = `${apiBaseUrl}/RolFuncionalidad`;
export const RolApiUrl = `${apiBaseUrl}/Rol`;
