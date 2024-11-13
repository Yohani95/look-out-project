'use server';
import { DocumentoProyectoDesarrolloApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import DocumentoProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/DocumentoProyectoDesarrollo';
import { revalidatePath } from 'next/cache';

const tag = 'DocumentoProyectoDesarrolloActions';
const DocumentoProyectoDesarrolloCrud =
  new CrudOperations<DocumentoProyectoDesarrollo>(
    DocumentoProyectoDesarrolloApiUrl,
    tag
  );

export const createDocumentoProyectoDesarrollo = async (
  item: DocumentoProyectoDesarrollo
) => DocumentoProyectoDesarrolloCrud.create(item);
export const updateDocumentoProyectoDesarrollo = async (
  item: DocumentoProyectoDesarrollo,
  id: string | number
) => DocumentoProyectoDesarrolloCrud.update(item, id);
export const getDocumentoProyectoDesarrolloById = async (id: string | number) =>
  DocumentoProyectoDesarrolloCrud.getById(id);
export const deleteDocumentoProyectoDesarrollo = async (id: string | number) =>
  DocumentoProyectoDesarrolloCrud.deleteById(id);
export const getAllDocumentoProyectoDesarrollo = async () =>
  DocumentoProyectoDesarrolloCrud.getAll();
export const revalidateDataDocumentoProyectoDesarrollo = async () =>
  revalidatePath('/opportunities/edit/7/documents/search');
export async function getAllDocumentoProyectoDesarrolloById(id: number) {
  try {
    const response = await fetch(
      `${DocumentoProyectoDesarrolloApiUrl}/GetByidProyectoDesarrollo/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
        next: { tags: [tag] },
      }
    );
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
