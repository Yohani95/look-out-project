'use server';

import { NovedadProyectoDesarrolloApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import NovedadProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/NovedadProyectoDesarrollo';

const tag = 'NovedadProyectoDesarrolloActions';
const NovedadProyectoDesarrolloCrud =
  new CrudOperations<NovedadProyectoDesarrollo>(
    NovedadProyectoDesarrolloApiUrl,
    tag
  );

export const createNovedadProyectoDesarrollo = async (
  item: NovedadProyectoDesarrollo
) => NovedadProyectoDesarrolloCrud.create(item);
export const updateNovedadProyectoDesarrollo = async (
  item: NovedadProyectoDesarrollo,
  id: string | number
) => NovedadProyectoDesarrolloCrud.update(item, id);
export const getNovedadProyectoDesarrolloById = async (id: string | number) =>
  NovedadProyectoDesarrolloCrud.getById(id);
export const deleteNovedadProyectoDesarrollo = async (id: string | number) =>
  NovedadProyectoDesarrolloCrud.deleteById(id);
export const getAllNovedadProyectoDesarrollo = async () =>
  NovedadProyectoDesarrolloCrud.getAll();
export const revalidateDataNovedadProyectoDesarrollo = async () =>
  NovedadProyectoDesarrolloCrud.revalidateData();
export const NovedadGetAllByIdProyecto = async (id: number) => {
  try {
    const response = await fetch(
      `${NovedadProyectoDesarrolloApiUrl}/GetAllByProyecto/${id}`,
      {
        cache: 'no-cache',
        next: { tags: [tag] },
      }
    );

    // Verificar si la respuesta fue exitosa
    if (response.ok) {
      return await response.json(); // Devolvemos un indicador de éxito
    } else {
      const data = await response.json(); // Obtener los errores
      return { success: false, errors: data.errors }; // Devolvemos los errores
    }
  } catch (error) {
    console.error('Error :', error);
    return []; // Devolver el error capturado
  }
};
