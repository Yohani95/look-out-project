"use server"
import LicitacionOportunidad from '@/app/api/models/oportunidad/LicitacionOportunidad';
import { LicitacionOportunidadApiUrl } from '@/app/api/apiConfig';
import  {CrudOperations} from "@/app/api/models/common/CrudOperations" ;

const tag = "LicitacionOportunidadActions";
const LicitacionOportunidadCrud = new CrudOperations<LicitacionOportunidad>(LicitacionOportunidadApiUrl,tag);

export const createLicitacionOportunidad = async (item: LicitacionOportunidad) => LicitacionOportunidadCrud.create(item);
export const updateLicitacionOportunidad = async (item: LicitacionOportunidad,id:string | number) => LicitacionOportunidadCrud.update(item,id);
export const getLicitacionOportunidadById = async (id: string | number) => LicitacionOportunidadCrud.getById(id);
export const deleteLicitacionOportunidad = async (id: string | number) => LicitacionOportunidadCrud.deleteById(id);
export const getAllLicitacionOportunidad = async () => LicitacionOportunidadCrud.getAll();
export const revalidateDataLicitacionOportunidad = async () => LicitacionOportunidadCrud.revalidateData();