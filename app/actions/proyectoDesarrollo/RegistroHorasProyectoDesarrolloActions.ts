'use server';
import { RegistroHorasProyectoDesarrolloApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import RegistroHorasProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/RegistroHorasProyectoDesarrollo';

const tag = 'RegistroHorasProyectoDesarrolloActions';
const RegistroHorasProyectoDesarrolloCrud =
  new CrudOperations<RegistroHorasProyectoDesarrollo>(
    RegistroHorasProyectoDesarrolloApiUrl,
    tag
  );

export const createRegistroHorasProyectoDesarrollo = async (
  item: RegistroHorasProyectoDesarrollo
) => RegistroHorasProyectoDesarrolloCrud.create(item);

export const updateRegistroHorasProyectoDesarrollo = async (
  item: RegistroHorasProyectoDesarrollo,
  id: string | number
) => RegistroHorasProyectoDesarrolloCrud.update(item, id);

export const getRegistroHorasProyectoDesarrolloById = async (
  id: string | number
) => RegistroHorasProyectoDesarrolloCrud.getById(id);

export const deleteRegistroHorasProyectoDesarrollo = async (
  id: string | number
) => RegistroHorasProyectoDesarrolloCrud.deleteById(id);

export const getAllRegistroHorasProyectoDesarrollo = async () =>
  RegistroHorasProyectoDesarrolloCrud.getAll();

export const revalidateDataRegistroHorasProyectoDesarrollo = async () =>
  RegistroHorasProyectoDesarrolloCrud.revalidateData();

/**
 * Obtiene todos los registros de horas trabajadas de un profesional en un proyecto.
 * @param idProfesionalProyecto ID del profesional asignado al proyecto.
 * @returns Lista de registros de horas trabajadas.
 */
export const getAllRegistroHorasByIdProfesionalProyecto = async (
  idProfesionalProyecto: number
) => {
  try {
    const response = await fetch(
      `${RegistroHorasProyectoDesarrolloApiUrl}/GetByIdProfesional/${idProfesionalProyecto}`,
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
      'Error en getAllRegistroHorasByIdProfesionalProyecto:',
      error
    );
    return [];
  }
};
