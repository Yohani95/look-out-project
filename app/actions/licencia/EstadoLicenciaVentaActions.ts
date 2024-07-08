"use server"
import EstadoVentaLicencia from '@/app/api/models/licencia/EstadoVentaLicencia';
import { EstadoVentaLicenciaApiUrl } from '@/app/api/apiConfig';
import  {CrudOperations} from "@/app/api/models/common/CrudOperations" ;

const tag = "EstadoVentaLicenciaActions";
const EstadoVentaLicenciaCrud = new CrudOperations<EstadoVentaLicencia>(EstadoVentaLicenciaApiUrl,tag);

export const createEstadoVentaLicencia = async (item: EstadoVentaLicencia) => EstadoVentaLicenciaCrud.create(item);
export const updateEstadoVentaLicencia = async (item: EstadoVentaLicencia,id:string | number) => EstadoVentaLicenciaCrud.update(item,id);
export const getEstadoVentaLicenciaById = async (id: string | number) => EstadoVentaLicenciaCrud.getById(id);
export const deleteEstadoVentaLicencia = async (id: string | number) => EstadoVentaLicenciaCrud.deleteById(id);
export const getAllEstadoVentaLicencia = async () => EstadoVentaLicenciaCrud.getAll();
export const revalidateDataEstadoVentaLicencia = async () => EstadoVentaLicenciaCrud.revalidateData();