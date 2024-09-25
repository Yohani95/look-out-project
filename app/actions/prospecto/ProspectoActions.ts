'use server';

import { ProspectoApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import Prospecto from '@/app/api/models/prospecto/Prospecto';

const tag = 'ProspectoActions';
const ProspectoCrud = new CrudOperations<Prospecto>(ProspectoApiUrl, tag);

export const createProspecto = async (item: Prospecto) =>
  ProspectoCrud.create(item);
export const updateProspecto = async (item: Prospecto, id: string | number) =>
  ProspectoCrud.update(item, id);
export const getProspectoById = async (id: string | number) =>
  ProspectoCrud.getById(id);
export const deleteProspecto = async (id: string | number) =>
  ProspectoCrud.deleteById(id);
export const getAllProspecto = async () => ProspectoCrud.getAll();
export const revalidateDataProspecto = async () =>
  ProspectoCrud.revalidateData();
export const uploadProspectoFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${ProspectoApiUrl}/CargaMasiva`, {
      method: 'POST',
      body: formData,
    });

    // Verificar si la respuesta fue exitosa
    if (response.ok) {
      return { success: true }; // Devolvemos un indicador de éxito
    } else {
      const data = await response.json(); // Obtener los errores
      return { success: false, errors: data.errors }; // Devolvemos los errores
    }
  } catch (error) {
    console.error('Error al cargar el archivo:', error);
    return { success: false, errors: [error.message] }; // Devolver el error capturado
  }
};
