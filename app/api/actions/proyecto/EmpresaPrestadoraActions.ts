"use server"
import  EmpresaPrestadora  from '@/app/api/models/proyecto/EmpresaPrestadora';
import { EmpresaPrestadoraApiUrl } from '@/app/api/apiConfig';
import  {CrudOperations} from "@/app/api/models/common/CrudOperations" ;

const tag = "EmpresaPrestadoraActions";
const EmpresaPrestadoraCrud = new CrudOperations<EmpresaPrestadora>(EmpresaPrestadoraApiUrl,tag);

export const createEmpresaPrestadora = async (item: EmpresaPrestadora) => EmpresaPrestadoraCrud.create(item);
export const updateEmpresaPrestadora = async (item: EmpresaPrestadora,id:string | number) => EmpresaPrestadoraCrud.update(item,id);
export const getEmpresaPrestadoraById = async (id: string | number) => EmpresaPrestadoraCrud.getById(id);
export const deleteEmpresaPrestadora = async (id: string | number) => EmpresaPrestadoraCrud.deleteById(id);
export const getAllEmpresaPrestadora = async () => EmpresaPrestadoraCrud.getAll();
export const revalidateDataEmpresaPrestadora = async () => EmpresaPrestadoraCrud.revalidateData();