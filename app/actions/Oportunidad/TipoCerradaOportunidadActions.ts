"use server"
import TipoCerradaOportunidad from '@/app/api/models/oportunidad/TipoCerradaOportunidad';
import { TipoCerradaOportunidadApiUrl } from '@/app/api/apiConfig';
import  {CrudOperations} from "@/app/api/models/common/CrudOperations" ;

const tag = "TipoCerradaOportunidadActions";
const TipoCerradaOportunidadCrud = new CrudOperations<TipoCerradaOportunidad>(TipoCerradaOportunidadApiUrl,tag);

export const createTipoCerradaOportunidad = async (item: TipoCerradaOportunidad) => TipoCerradaOportunidadCrud.create(item);
export const updateTipoCerradaOportunidad = async (item: TipoCerradaOportunidad,id:string | number) => TipoCerradaOportunidadCrud.update(item,id);
export const getTipoCerradaOportunidadById = async (id: string | number) => TipoCerradaOportunidadCrud.getById(id);
export const deleteTipoCerradaOportunidad = async (id: string | number) => TipoCerradaOportunidadCrud.deleteById(id);
export const getAllTipoCerradaOportunidad = async () => TipoCerradaOportunidadCrud.getAll();
export const revalidateDataTipoCerradaOportunidad = async () => TipoCerradaOportunidadCrud.revalidateData();