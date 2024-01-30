"use server"
import  TipoFacturacion  from '@/app/api/models/factura/TipoFacturacion';
import { tipoFacturacionApiUrl } from '@/app/api/apiConfig';
import  {CrudOperations} from "@/app/api/models/common/CrudOperations" ;

const tag = "tipoFacturacionActions";
const tipoFacturacionCrud = new CrudOperations<TipoFacturacion>(tipoFacturacionApiUrl,tag);

export const createTipoFacturacion = async (item: TipoFacturacion) => tipoFacturacionCrud.create(item);
export const updateTipoFacturacion = async (item: TipoFacturacion,id:string | number) => tipoFacturacionCrud.update(item,id);
export const getTipoFacturacionById = async (id: string | number) => tipoFacturacionCrud.getById(id);
export const deleteTipoFacturacion = async (id: string | number) => tipoFacturacionCrud.deleteById(id);
export const getAllTipoFacturacion = async () => tipoFacturacionCrud.getAll();

