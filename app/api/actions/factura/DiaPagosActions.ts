"use server"
import  DiaPagos  from '@/app/api/models/factura/DiaPagos';
import { DiaPagosApiUrl } from '@/app/api/apiConfig';
import  {CrudOperations} from "@/app/api/models/common/CrudOperations" ;

const tag = "DiaPagosActions";
const DiaPagosCrud = new CrudOperations<DiaPagos>(DiaPagosApiUrl,tag);

export const createDiaPagos = async (item: DiaPagos) => DiaPagosCrud.create(item);
export const updateDiaPagos = async (item: DiaPagos,id:string | number) => DiaPagosCrud.update(item,id);
export const getDiaPagosById = async (id: string | number) => DiaPagosCrud.getById(id);
export const deleteDiaPagos = async (id: string | number) => DiaPagosCrud.deleteById(id);
export const getAllDiaPagos = async () => DiaPagosCrud.getAll();