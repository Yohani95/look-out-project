"use server"
import EstadoOportunidad from '@/app/api/models/oportunidad/EstadoOportunidad';
import { EstadoOportunidadApiUrl } from '@/app/api/apiConfig';
import  {CrudOperations} from "@/app/api/models/common/CrudOperations" ;

const tag = "EstadoOportunidadActions";
const EstadoOportunidadCrud = new CrudOperations<EstadoOportunidad>(EstadoOportunidadApiUrl,tag);

export const createEstadoOportunidad = async (item: EstadoOportunidad) => EstadoOportunidadCrud.create(item);
export const updateEstadoOportunidad = async (item: EstadoOportunidad,id:string | number) => EstadoOportunidadCrud.update(item,id);
export const getEstadoOportunidadById = async (id: string | number) => EstadoOportunidadCrud.getById(id);
export const deleteEstadoOportunidad = async (id: string | number) => EstadoOportunidadCrud.deleteById(id);
export const getAllEstadoOportunidad = async () => EstadoOportunidadCrud.getAll();
export const revalidateDataEstadoOportunidad = async () => EstadoOportunidadCrud.revalidateData();