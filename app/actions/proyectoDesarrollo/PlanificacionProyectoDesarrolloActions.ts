'use server';

import { PlanificacionProyectoDesarrolloApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import PlanificacionProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/PlanificacionProyectoDesarrollo';

const tag = 'PlanificacionProyectoDesarrolloActions';
const PlanificacionProyectoDesarrolloCrud =
  new CrudOperations<PlanificacionProyectoDesarrollo>(
    PlanificacionProyectoDesarrolloApiUrl,
    tag
  );

// Operaciones CRUD
export const createPlanificacionProyectoDesarrollo = async (
  item: PlanificacionProyectoDesarrollo
) => PlanificacionProyectoDesarrolloCrud.create(item);

export const updatePlanificacionProyectoDesarrollo = async (
  item: PlanificacionProyectoDesarrollo,
  id: string | number
) => PlanificacionProyectoDesarrolloCrud.update(item, id);

export const getPlanificacionProyectoDesarrolloById = async (
  id: string | number
) => PlanificacionProyectoDesarrolloCrud.getById(id);

export const deletePlanificacionProyectoDesarrollo = async (
  id: string | number
) => PlanificacionProyectoDesarrolloCrud.deleteById(id);

export const getAllPlanificacionProyectoDesarrollo = async () =>
  PlanificacionProyectoDesarrolloCrud.getAll();

export const revalidateDataPlanificacionProyectoDesarrollo = async () =>
  PlanificacionProyectoDesarrolloCrud.revalidateData();

// Función adicional para obtener planificaciones por ID de proyecto
export const PlanificacionGetAllByIdProyecto = async (id: number) => {
  try {
    const response = await fetch(
      `${PlanificacionProyectoDesarrolloApiUrl}/GetAllByProyecto/${id}`,
      {
        cache: 'no-cache',
        next: { tags: [tag] },
      }
    );

    // Verificar si la respuesta fue exitosa
    if (response.ok) {
      return await response.json(); // Devuelve los datos si la respuesta es exitosa
    } else {
      const data = await response.json(); // Obtener los errores si falla
      return { success: false, errors: data.errors }; // Devuelve los errores
    }
  } catch (error) {
    console.error('Error :', error);
    return []; // Devuelve un array vacío en caso de error
  }
};
