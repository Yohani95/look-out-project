"use server"
import Oportunidad from '@/app/api/models/oportunidad/Oportunidad';
import { OportunidadApiUrl } from '@/app/api/apiConfig';
import  {CrudOperations} from "@/app/api/models/common/CrudOperations" ;

const tag = "OportunidadActions";
const OportunidadCrud = new CrudOperations<Oportunidad>(OportunidadApiUrl,tag);

export const createOportunidad = async (item: Oportunidad) => OportunidadCrud.create(item);
export const updateOportunidad = async (item: Oportunidad,id:string | number) => OportunidadCrud.update(item,id);
export const getOportunidadById = async (id: string | number) => OportunidadCrud.getById(id);
export const deleteOportunidad = async (id: string | number) => OportunidadCrud.deleteById(id);
export const getAllOportunidad = async () => OportunidadCrud.getAll();
export const revalidateDataOportunidad = async () => OportunidadCrud.revalidateData();