"use server"
import TipoOportunidad from '@/app/api/models/oportunidad/TipoOportunidad';
import { tipoOportunidadApiUrl } from '@/app/api/apiConfig';
import  {CrudOperations} from "@/app/api/models/common/CrudOperations" ;

const tag = "TipoOportunidadActions";
const TipoOportunidadCrud = new CrudOperations<TipoOportunidad>(tipoOportunidadApiUrl,tag);

export const createTipoOportunidad = async (item: TipoOportunidad) => TipoOportunidadCrud.create(item);
export const updateTipoOportunidad = async (item: TipoOportunidad,id:string | number) => TipoOportunidadCrud.update(item,id);
export const getTipoOportunidadById = async (id: string | number) => TipoOportunidadCrud.getById(id);
export const deleteTipoOportunidad = async (id: string | number) => TipoOportunidadCrud.deleteById(id);
export const getAllTipoOportunidad = async () => TipoOportunidadCrud.getAll();
export const revalidateDataTipoOportunidad = async () => TipoOportunidadCrud.revalidateData();