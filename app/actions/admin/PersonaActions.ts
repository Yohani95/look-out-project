'use server';

import { personApiUrl } from '@/app/api/apiConfig';
import Persona from '@/app/api/models/admin/Persona';
import { Constantes } from '@/app/api/models/common/Constantes';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';

const tag = 'PersonaActions';
const PersonaCrud = new CrudOperations<Persona>(personApiUrl, tag);
const tagKam = 'tagPersonaKam';
export const createPersona = async (item: Persona) => PersonaCrud.create(item);
export const updatePersona = async (item: Persona, id: string | number) =>
  PersonaCrud.update(item, id);
export const getPersonaById = async (id: string | number) =>
  PersonaCrud.getById(id);
export const deletePersona = async (id: string | number) =>
  PersonaCrud.deleteById(id);
export const getAllPersona = async () => PersonaCrud.getAll();
export const revalidateDataPersona = async () => PersonaCrud.revalidateData();
export async function getAllByIdTipoPersona(id: number) {
  try {
    const response = await fetch(`${personApiUrl}/tipoPersona/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
      next: { tags: [tagKam] },
    });
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
