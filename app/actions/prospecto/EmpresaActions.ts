'use server';

import { EmpresaApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import Empresa from '@/app/api/models/prospecto/Empresa';

const tag = 'EmpresaActions';
const EmpresaCrud = new CrudOperations<Empresa>(EmpresaApiUrl, tag);

export const createEmpresa = async (item: Empresa) => EmpresaCrud.create(item);
export const updateEmpresa = async (item: Empresa, id: string | number) =>
  EmpresaCrud.update(item, id);
export const getEmpresaById = async (id: string | number) =>
  EmpresaCrud.getById(id);
export const deleteEmpresa = async (id: string | number) =>
  EmpresaCrud.deleteById(id);
export const getAllEmpresa = async () => EmpresaCrud.getAll();
export const revalidateDataEmpresa = async () => EmpresaCrud.revalidateData();
