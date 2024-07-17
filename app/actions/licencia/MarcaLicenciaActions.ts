"use server"
import MarcaLicencia from '@/app/api/models/licencia/MarcaLicencia';
import { MarcaLicenciaApiUrl } from '@/app/api/apiConfig';
import  {CrudOperations} from "@/app/api/models/common/CrudOperations" ;

const tag = "MarcaLicenciaActions";
const MarcaLicenciaCrud = new CrudOperations<MarcaLicencia>(MarcaLicenciaApiUrl,tag);

export const createMarcaLicencia = async (item: MarcaLicencia) => MarcaLicenciaCrud.create(item);
export const updateMarcaLicencia = async (item: MarcaLicencia,id:string | number) => MarcaLicenciaCrud.update(item,id);
export const getMarcaLicenciaById = async (id: string | number) => MarcaLicenciaCrud.getById(id);
export const deleteMarcaLicencia = async (id: string | number) => MarcaLicenciaCrud.deleteById(id);
export const getAllMarcaLicencia = async () => MarcaLicenciaCrud.getAll();
export const revalidateDataMarcaLicencia = async () => MarcaLicenciaCrud.revalidateData();