"use server"
import AreaServicioOportunidad from '@/app/api/models/oportunidad/AreaServicioOportunidad';
import { AreaServicioOportunidadApiUrl } from '@/app/api/apiConfig';
import  {CrudOperations} from "@/app/api/models/common/CrudOperations" ;

const tag = "AreaServicioOportunidadActions";
const AreaServicioOportunidadCrud = new CrudOperations<AreaServicioOportunidad>(AreaServicioOportunidadApiUrl,tag);

export const createAreaServicioOportunidad = async (item: AreaServicioOportunidad) => AreaServicioOportunidadCrud.create(item);
export const updateAreaServicioOportunidad = async (item: AreaServicioOportunidad,id:string | number) => AreaServicioOportunidadCrud.update(item,id);
export const getAreaServicioOportunidadById = async (id: string | number) => AreaServicioOportunidadCrud.getById(id);
export const deleteAreaServicioOportunidad = async (id: string | number) => AreaServicioOportunidadCrud.deleteById(id);
export const getAllAreaServicioOportunidad = async () => AreaServicioOportunidadCrud.getAll();
export const revalidateDataAreaServicioOportunidad = async () => AreaServicioOportunidadCrud.revalidateData();