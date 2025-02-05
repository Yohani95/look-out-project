'use server';
import { ProfesionalProyectoDesarrolloApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import ProfesionalProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/ProfesionalProyectoDesarrollo';

const tag = 'ProfesionalProyectoDesarrolloActions';
const ProfesionalProyectoDesarrolloCrud =
  new CrudOperations<ProfesionalProyectoDesarrollo>(
    ProfesionalProyectoDesarrolloApiUrl,
    tag
  );

export const createProfesionalProyectoDesarrollo = async (
  item: ProfesionalProyectoDesarrollo
) => ProfesionalProyectoDesarrolloCrud.create(item);

export const updateProfesionalProyectoDesarrollo = async (
  item: ProfesionalProyectoDesarrollo,
  id: string | number
) => ProfesionalProyectoDesarrolloCrud.update(item, id);

export const getProfesionalProyectoDesarrolloById = async (
  id: string | number
) => ProfesionalProyectoDesarrolloCrud.getById(id);

export const deleteProfesionalProyectoDesarrollo = async (
  id: string | number
) => ProfesionalProyectoDesarrolloCrud.deleteById(id);

export const getAllProfesionalProyectoDesarrollo = async () =>
  ProfesionalProyectoDesarrolloCrud.getAll();

export const revalidateDataProfesionalProyectoDesarrollo = async () =>
  ProfesionalProyectoDesarrolloCrud.revalidateData();
/**
 * Obtiene todos los profesionales asignados a un proyecto específico.
 * @param idProyectoDesarrollo ID del proyecto de desarrollo.
 * @returns Lista de profesionales en el proyecto.
 */
export const getAllProfesionalProyectoDesarrolloByIdProyecto = async (
  idProyectoDesarrollo: number
) => {
  try {
    const response = await fetch(
      `${ProfesionalProyectoDesarrolloApiUrl}/GetByProyectoDesarrolloId/${idProyectoDesarrollo}`,
      {
        cache: 'no-cache',
        next: { tags: [tag] },
      }
    );
    if (response.ok) {
      return await response.json();
    } else {
      const data = await response.json();
      return { success: false, errors: data.errors };
    }
  } catch (error) {
    console.error(
      'Error en getAllProfesionalProyectoDesarrolloByIdProyecto:',
      error
    );
    return [];
  }
};
