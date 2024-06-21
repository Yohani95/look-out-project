"use server"
import OrigenOportunidad from '@/app/api/models/oportunidad/OrigenOportunidad';
import { OrigenOportunidadApiUrl } from '@/app/api/apiConfig';
import  {CrudOperations} from "@/app/api/models/common/CrudOperations" ;

const tag = "OrigenOportunidadActions";
const OrigenOportunidadCrud = new CrudOperations<OrigenOportunidad>(OrigenOportunidadApiUrl,tag);

export const createOrigenOportunidad = async (item: OrigenOportunidad) => OrigenOportunidadCrud.create(item);
export const updateOrigenOportunidad = async (item: OrigenOportunidad,id:string | number) => OrigenOportunidadCrud.update(item,id);
export const getOrigenOportunidadById = async (id: string | number) => OrigenOportunidadCrud.getById(id);
export const deleteOrigenOportunidad = async (id: string | number) => OrigenOportunidadCrud.deleteById(id);
export const getAllOrigenOportunidad = async () => OrigenOportunidadCrud.getAll();
export const revalidateDataOrigenOportunidad = async () => OrigenOportunidadCrud.revalidateData();