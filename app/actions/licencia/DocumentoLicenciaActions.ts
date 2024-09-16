'use server';
import DocumentoLicencia from '@/app/api/models/licencia/DocumentoLicencia';
import { documentoLicenciaApiUrl } from '@/app/api/apiConfig';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';
import { revalidatePath } from 'next/cache';

const tag = 'documentoLicenciaActions';
const documentoLicenciaCrud = new CrudOperations<DocumentoLicencia>(
  documentoLicenciaApiUrl,
  tag
);

export const createdocumentoLicencia = async (item: DocumentoLicencia) =>
  documentoLicenciaCrud.create(item);
export const updatedocumentoLicencia = async (
  item: DocumentoLicencia,
  id: string | number
) => documentoLicenciaCrud.update(item, id);
export const getdocumentoLicenciaById = async (id: string | number) =>
  documentoLicenciaCrud.getById(id);
export const deletedocumentoLicencia = async (id: string | number) =>
  documentoLicenciaCrud.deleteById(id);
export const getAlldocumentoLicencia = async () =>
  documentoLicenciaCrud.getAll();
export const revalidateDatadocumentoLicencia = async () =>
  revalidatePath('/opportunities/edit/7/documents/search');
export async function getAllDocumentoLicenciaByIdLicencia(id: number) {
  try {
    const response = await fetch(
      `${documentoLicenciaApiUrl}/getbyIdLicencia/${id}`,
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
