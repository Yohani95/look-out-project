'use server';

import { TipoProyectoDesarrolloApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import TipoProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/TipoProyectoDesarrollo';

const tag = 'TipoProyectoDesarrolloActions';
const TipoProyectoDesarrolloCrud = new CrudOperations<TipoProyectoDesarrollo>(
  TipoProyectoDesarrolloApiUrl,
  tag
);

export const createTipoProyectoDesarrollo = async (
  item: TipoProyectoDesarrollo
) => TipoProyectoDesarrolloCrud.create(item);
export const updateTipoProyectoDesarrollo = async (
  item: TipoProyectoDesarrollo,
  id: string | number
) => TipoProyectoDesarrolloCrud.update(item, id);
export const getTipoProyectoDesarrolloById = async (id: string | number) =>
  TipoProyectoDesarrolloCrud.getById(id);
export const deleteTipoProyectoDesarrollo = async (id: string | number) =>
  TipoProyectoDesarrolloCrud.deleteById(id);
export const getAllTipoProyectoDesarrollo = async () =>
  TipoProyectoDesarrolloCrud.getAll();
export const revalidateDataTipoProyectoDesarrollo = async () =>
  TipoProyectoDesarrolloCrud.revalidateData();
