'use server';

import { TipoNovedadProyectoDesarrolloApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import TipoNovedadProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/TipoNovedadProyectoDesarrollo';

const tag = 'TipoNovedadProyectoDesarrolloActions';
const TipoNovedadProyectoDesarrolloCrud =
  new CrudOperations<TipoNovedadProyectoDesarrollo>(
    TipoNovedadProyectoDesarrolloApiUrl,
    tag
  );

export const createTipoNovedadProyectoDesarrollo = async (
  item: TipoNovedadProyectoDesarrollo
) => TipoNovedadProyectoDesarrolloCrud.create(item);
export const updateTipoNovedadProyectoDesarrollo = async (
  item: TipoNovedadProyectoDesarrollo,
  id: string | number
) => TipoNovedadProyectoDesarrolloCrud.update(item, id);
export const getTipoNovedadProyectoDesarrolloById = async (
  id: string | number
) => TipoNovedadProyectoDesarrolloCrud.getById(id);
export const deleteTipoNovedadProyectoDesarrollo = async (
  id: string | number
) => TipoNovedadProyectoDesarrolloCrud.deleteById(id);
export const getAllTipoNovedadProyectoDesarrollo = async () =>
  TipoNovedadProyectoDesarrolloCrud.getAll();
export const revalidateDataTipoNovedadProyectoDesarrollo = async () =>
  TipoNovedadProyectoDesarrolloCrud.revalidateData();
