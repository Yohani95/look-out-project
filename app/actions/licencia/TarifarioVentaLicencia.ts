"use server"
import TarifarioVentaLicencia from '@/app/api/models/licencia/TarifarioVentaLicencia';
import { TarifarioVentaLicenciaApiUrl } from '@/app/api/apiConfig';
import  {CrudOperations} from "@/app/api/models/common/CrudOperations" ;

const tag = "TarifarioVentaLicenciaActions";
const TarifarioVentaLicenciaCrud = new CrudOperations<TarifarioVentaLicencia>(TarifarioVentaLicenciaApiUrl,tag);

export const createTarifarioVentaLicencia = async (item: TarifarioVentaLicencia) => TarifarioVentaLicenciaCrud.create(item);
export const updateTarifarioVentaLicencia = async (item: TarifarioVentaLicencia,id:string | number) => TarifarioVentaLicenciaCrud.update(item,id);
export const getTarifarioVentaLicenciaById = async (id: string | number) => TarifarioVentaLicenciaCrud.getById(id);
export const deleteTarifarioVentaLicencia = async (id: string | number) => TarifarioVentaLicenciaCrud.deleteById(id);
export const getAllTarifarioVentaLicencia = async () => TarifarioVentaLicenciaCrud.getAll();
export const revalidateDataTarifarioVentaLicencia = async () => TarifarioVentaLicenciaCrud.revalidateData();