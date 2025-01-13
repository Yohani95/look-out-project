'use server';

import { FuncionalidadApiUrl } from '@/app/api/apiConfig';
import Funcionalidad from '@/app/api/models/admin/Funcionalidad';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';

const tag = 'FuncionalidadActions';
const FuncionalidadCrud = new CrudOperations<Funcionalidad>(
  FuncionalidadApiUrl,
  tag
);

export const createFuncionalidad = async (item: Funcionalidad) =>
  FuncionalidadCrud.create(item);
export const updateFuncionalidad = async (
  item: Funcionalidad,
  id: string | number
) => FuncionalidadCrud.update(item, id);
export const getFuncionalidadById = async (id: string | number) =>
  FuncionalidadCrud.getById(id);
export const deleteFuncionalidad = async (id: string | number) =>
  FuncionalidadCrud.deleteById(id);
export const getAllFuncionalidad = async () => FuncionalidadCrud.getAll();
export const revalidateDataFuncionalidad = async () =>
  FuncionalidadCrud.revalidateData();
