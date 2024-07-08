"use server"
import VentaLicencia from '@/app/api/models/licencia/VentaLicencia';
import { VentaLicenciaApiUrl } from '@/app/api/apiConfig';
import  {CrudOperations} from "@/app/api/models/common/CrudOperations" ;

const tag = "VentaLicenciaActions";
const VentaLicenciaCrud = new CrudOperations<VentaLicencia>(VentaLicenciaApiUrl,tag);

export const createVentaLicencia = async (item: VentaLicencia) => VentaLicenciaCrud.create(item);
export const updateVentaLicencia = async (item: VentaLicencia,id:string | number) => VentaLicenciaCrud.update(item,id);
export const getVentaLicenciaById = async (id: string | number) => VentaLicenciaCrud.getById(id);
export const deleteVentaLicencia = async (id: string | number) => VentaLicenciaCrud.deleteById(id);
export const getAllVentaLicencia = async () => VentaLicenciaCrud.getAll();
export const revalidateDataVentaLicencia = async () => VentaLicenciaCrud.revalidateData();