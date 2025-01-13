'use server';

import { RolApiUrl } from '@/app/api/apiConfig';
import { Rol, RolClass } from '@/app/api/models/admin/Rol';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';

const tag = 'RolActions';
const RolCrud = new CrudOperations<RolClass>(RolApiUrl, tag);

export const createRol = async (item: RolClass) => RolCrud.create(item);
export const updateRol = async (item: RolClass, id: string | number) =>
  RolCrud.update(item, id);
export const getRolById = async (id: string | number) => RolCrud.getById(id);
export const deleteRol = async (id: string | number) => RolCrud.deleteById(id);
export const getAllRol = async () => RolCrud.getAll();
export const revalidateDataRol = async () => RolCrud.revalidateData();
