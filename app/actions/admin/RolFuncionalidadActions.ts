'use server';

import { RolFuncionalidadApiUrl } from '@/app/api/apiConfig';
import RolFuncionalidad from '@/app/api/models/admin/RolFuncionalidad';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';

const tag = 'RolFuncionalidadActions';
const RolFuncionalidadCrud = new CrudOperations<RolFuncionalidad>(
  RolFuncionalidadApiUrl,
  tag
);

export const createRolFuncionalidad = async (item: RolFuncionalidad) =>
  RolFuncionalidadCrud.create(item);
export const updateRolFuncionalidad = async (
  item: RolFuncionalidad,
  id: string | number
) => RolFuncionalidadCrud.update(item, id);
export const getRolFuncionalidadById = async (id: string | number) =>
  RolFuncionalidadCrud.getById(id);
export const deleteRolFuncionalidad = async (id: string | number) =>
  RolFuncionalidadCrud.deleteById(id);
export const getAllRolFuncionalidad = async () => RolFuncionalidadCrud.getAll();
export const revalidateDataRolFuncionalidad = async () =>
  RolFuncionalidadCrud.revalidateData();
