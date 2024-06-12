"use server"
import DocumentoOportunidad from '@/app/api/models/oportunidad/DocumentoOportunidad';
import { documentoOportunidadApiUrl } from '@/app/api/apiConfig';
import  {CrudOperations} from "@/app/api/models/common/CrudOperations" ;
import { revalidatePath, revalidateTag } from 'next/cache';

const tag = "documentoOportunidadActions";
const documentoOportunidadCrud = new CrudOperations<DocumentoOportunidad>(documentoOportunidadApiUrl,tag);

export const createdocumentoOportunidad = async (item: DocumentoOportunidad) => documentoOportunidadCrud.create(item);
export const updatedocumentoOportunidad = async (item: DocumentoOportunidad,id:string | number) => documentoOportunidadCrud.update(item,id);
export const getdocumentoOportunidadById = async (id: string | number) => documentoOportunidadCrud.getById(id);
export const deletedocumentoOportunidad = async (id: string | number) => documentoOportunidadCrud.deleteById(id);
export const getAlldocumentoOportunidad = async () => documentoOportunidadCrud.getAll();
export const revalidateDatadocumentoOportunidad = async () => revalidatePath('/opportunities/edit/7/documents/search');
export async function getAllDocumentoOportunidadByIdOportunidad(id: number) {
    try {
      const response = await fetch(
        `${documentoOportunidadApiUrl}/getbyIdOportunidad/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-cache",
          next: { tags: [tag] },
        }
      );
      return response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }