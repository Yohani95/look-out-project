"use server"
import TipoLicenciaOportunidad from '@/app/api/models/oportunidad/TipoLicenciaOportunidad';
import { TipoLicenciaOportunidadApiUrl } from '@/app/api/apiConfig';
import  {CrudOperations} from "@/app/api/models/common/CrudOperations" ;

const tag = "TipoLicenciaOportunidadActions";
const TipoLicenciaOportunidadCrud = new CrudOperations<TipoLicenciaOportunidad>(TipoLicenciaOportunidadApiUrl,tag);

export const createTipoLicenciaOportunidad = async (item: TipoLicenciaOportunidad) => TipoLicenciaOportunidadCrud.create(item);
export const updateTipoLicenciaOportunidad = async (item: TipoLicenciaOportunidad,id:string | number) => TipoLicenciaOportunidadCrud.update(item,id);
export const getTipoLicenciaOportunidadById = async (id: string | number) => TipoLicenciaOportunidadCrud.getById(id);
export const deleteTipoLicenciaOportunidad = async (id: string | number) => TipoLicenciaOportunidadCrud.deleteById(id);
export const getAllTipoLicenciaOportunidad = async () => TipoLicenciaOportunidadCrud.getAll();
export const revalidateDataTipoLicenciaOportunidad = async () => TipoLicenciaOportunidadCrud.revalidateData();