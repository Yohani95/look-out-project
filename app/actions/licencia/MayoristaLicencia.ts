"use server"
import MayoristaLicencia from '@/app/api/models/licencia/MayoristaLicencia';
import { MayoristaLicenciaApiUrl } from '@/app/api/apiConfig';
import  {CrudOperations} from "@/app/api/models/common/CrudOperations" ;

const tag = "MayoristaLicenciaActions";
const MayoristaLicenciaCrud = new CrudOperations<MayoristaLicencia>(MayoristaLicenciaApiUrl,tag);

export const createMayoristaLicencia = async (item: MayoristaLicencia) => MayoristaLicenciaCrud.create(item);
export const updateMayoristaLicencia = async (item: MayoristaLicencia,id:string | number) => MayoristaLicenciaCrud.update(item,id);
export const getMayoristaLicenciaById = async (id: string | number) => MayoristaLicenciaCrud.getById(id);
export const deleteMayoristaLicencia = async (id: string | number) => MayoristaLicenciaCrud.deleteById(id);
export const getAllMayoristaLicencia = async () => MayoristaLicenciaCrud.getAll();
export const revalidateDataMayoristaLicencia = async () => MayoristaLicenciaCrud.revalidateData();