'use server';

import { perfilApiUrl } from '@/app/api/apiConfig';
import Perfil from '@/app/api/models/admin/Perfil';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';

const tag = 'PerfilActions';
const PerfilCrud = new CrudOperations<Perfil>(perfilApiUrl, tag);

export const createPerfil = async (item: Perfil) => PerfilCrud.create(item);
export const updatePerfil = async (item: Perfil, id: string | number) =>
  PerfilCrud.update(item, id);
export const getPerfilById = async (id: string | number) =>
  PerfilCrud.getById(id);
export const deletePerfil = async (id: string | number) =>
  PerfilCrud.deleteById(id);
export const getAllPerfil = async () => PerfilCrud.getAll();
export const revalidateDataPerfil = async () => PerfilCrud.revalidateData();
