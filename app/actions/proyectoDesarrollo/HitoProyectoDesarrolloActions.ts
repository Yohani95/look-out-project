'use server';

import { HitoProyectoDesarrolloApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import HitoProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/HitoProyectoDesarrollo';

const tag = 'HitoProyectoDesarrolloActions';
const HitoProyectoDesarrolloCrud = new CrudOperations<HitoProyectoDesarrollo>(
  HitoProyectoDesarrolloApiUrl,
  tag
);

export const createHitoProyectoDesarrollo = async (
  item: HitoProyectoDesarrollo
) => HitoProyectoDesarrolloCrud.create(item);
export const updateHitoProyectoDesarrollo = async (
  item: HitoProyectoDesarrollo,
  id: string | number
) => HitoProyectoDesarrolloCrud.update(item, id);
export const getHitoProyectoDesarrolloById = async (id: string | number) =>
  HitoProyectoDesarrolloCrud.getById(id);
export const deleteHitoProyectoDesarrollo = async (id: string | number) =>
  HitoProyectoDesarrolloCrud.deleteById(id);
export const getAllHitoProyectoDesarrollo = async () =>
  HitoProyectoDesarrolloCrud.getAll();
export const revalidateDataHitoProyectoDesarrollo = async () =>
  HitoProyectoDesarrolloCrud.revalidateData();

export const HitoGetAllByIdProyecto = async (id: number) => {
  try {
    const response = await fetch(
      `${HitoProyectoDesarrolloApiUrl}/GetAllByProyecto/${id}`,
      {
        cache: 'no-cache',
        next: { tags: [tag] },
      }
    );
    return await response.json();
  } catch (error) {
    console.error('Error :', error);
    return []; // Devolver el error capturado
  }
};
