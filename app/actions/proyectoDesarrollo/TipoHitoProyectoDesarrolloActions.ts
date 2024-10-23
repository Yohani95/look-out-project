'use server';

import { TipoHitoProyectoDesarrolloApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import TipoHitoProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/TipoHitoProyectoDesarrollo';

const tag = 'TipoHitoProyectoDesarrolloActions';
const TipoHitoProyectoDesarrolloCrud =
  new CrudOperations<TipoHitoProyectoDesarrollo>(
    TipoHitoProyectoDesarrolloApiUrl,
    tag
  );

export const createTipoHitoProyectoDesarrollo = async (
  item: TipoHitoProyectoDesarrollo
) => TipoHitoProyectoDesarrolloCrud.create(item);
export const updateTipoHitoProyectoDesarrollo = async (
  item: TipoHitoProyectoDesarrollo,
  id: string | number
) => TipoHitoProyectoDesarrolloCrud.update(item, id);
export const getTipoHitoProyectoDesarrolloById = async (id: string | number) =>
  TipoHitoProyectoDesarrolloCrud.getById(id);
export const deleteTipoHitoProyectoDesarrollo = async (id: string | number) =>
  TipoHitoProyectoDesarrolloCrud.deleteById(id);
export const getAllTipoHitoProyectoDesarrollo = async () =>
  TipoHitoProyectoDesarrolloCrud.getAll();
export const revalidateDataTipoHitoProyectoDesarrollo = async () =>
  TipoHitoProyectoDesarrolloCrud.revalidateData();
