'use server';

import { ProyectoDesarrolloApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import ProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/ProyectoDesarrollo';

const tag = 'ProyectoDesarrolloActions';
const ProyectoDesarrolloCrud = new CrudOperations<ProyectoDesarrollo>(
  ProyectoDesarrolloApiUrl,
  tag
);

export const createProyectoDesarrollo = async (item: ProyectoDesarrollo) =>
  ProyectoDesarrolloCrud.create(item);
export const updateProyectoDesarrollo = async (
  item: ProyectoDesarrollo,
  id: string | number
) => ProyectoDesarrolloCrud.update(item, id);
export const getProyectoDesarrolloById = async (id: string | number) =>
  ProyectoDesarrolloCrud.getById(id);
export const deleteProyectoDesarrollo = async (id: string | number) =>
  ProyectoDesarrolloCrud.deleteById(id);
export const getAllProyectoDesarrollo = async () =>
  ProyectoDesarrolloCrud.getAll();
export const revalidateDataProyectoDesarrollo = async () =>
  ProyectoDesarrolloCrud.revalidateData();
