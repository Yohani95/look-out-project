"use server"

import { personApiUrl } from '@/app/api/apiConfig';
import Persona from '@/app/api/models/admin/Persona';
import { Constantes } from '@/app/api/models/common/Constantes';
import  {CrudOperations} from "@/app/api/models/common/CrudOperations" ;

const tag = "LogActions";
const LogCrud = new CrudOperations<Persona>(personApiUrl,tag);
const tagKam="tagPersonaKam"
export const createLog = async (item: Persona) => LogCrud.create(item);
export const updateLog = async (item: Persona,id:string | number) => LogCrud.update(item,id);
export const getLogById = async (id: string | number) => LogCrud.getById(id);
export const deleteLog = async (id: string | number) => LogCrud.deleteById(id);
export const getAllLog = async () => LogCrud.getAll();
export const revalidateDataLog = async () => LogCrud.revalidateData();
export async function getAllByIdTipoPersona(id: number) {
    try {
      const response = await fetch(
        `${personApiUrl}/tipoPersona/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-cache",
          next: { tags: [tagKam] },
        }
      );
      return response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }