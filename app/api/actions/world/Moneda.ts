"use server"
import  Moneda  from '@/app/api/models/world/Moneda';
import { monedaApiUrl } from '@/app/api/apiConfig';
import  {CrudOperations} from "@/app/api/models/common/CrudOperations" ;

const tag = "MonedaActions";
const MonedaCrud = new CrudOperations<Moneda>(monedaApiUrl,tag);

export const createMoneda = async (item: Moneda) => MonedaCrud.create(item);
export const updateMoneda = async (item: Moneda,id:string | number) => MonedaCrud.update(item,id);
export const getMonedaById = async (id: string | number) => MonedaCrud.getById(id);
export const deleteMoneda = async (id: string | number) => MonedaCrud.deleteById(id);
export const getAllMoneda = async () => MonedaCrud.getAll();
export const revalidateDataMoneda = async () => MonedaCrud.revalidateData();