'use server';

import { EstadoProyectoDesarrolloApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import EstadoProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/EstadoProyectoDesarrollo';

const tag = 'EstadoProyectoDesarrolloActions';
const EstadoProyectoDesarrolloCrud =
  new CrudOperations<EstadoProyectoDesarrollo>(
    EstadoProyectoDesarrolloApiUrl,
    tag
  );

export const createEstadoProyectoDesarrollo = async (
  item: EstadoProyectoDesarrollo
) => EstadoProyectoDesarrolloCrud.create(item);
export const updateEstadoProyectoDesarrollo = async (
  item: EstadoProyectoDesarrollo,
  id: string | number
) => EstadoProyectoDesarrolloCrud.update(item, id);
export const getEstadoProyectoDesarrolloById = async (id: string | number) =>
  EstadoProyectoDesarrolloCrud.getById(id);
export const deleteEstadoProyectoDesarrollo = async (id: string | number) =>
  EstadoProyectoDesarrolloCrud.deleteById(id);
export const getAllEstadoProyectoDesarrollo = async () =>
  EstadoProyectoDesarrolloCrud.getAll();
export const revalidateDataEstadoProyectoDesarrollo = async () =>
  EstadoProyectoDesarrolloCrud.revalidateData();
