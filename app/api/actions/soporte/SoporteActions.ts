"use server";
import { CrudOperations } from "@/app/api/models/common/CrudOperations";
import {
  soporteApiUrl,
  soporteWithEntitiesApiUrl,
  soporteWithEntitiesByIdApiUrl,
} from "@/app/api/apiConfig";
import Soporte from "../../models/support/Soporte";

const tag = "soporteActions";

const soporteCrud = new CrudOperations<Soporte>(soporteApiUrl, tag);

export const createsoporte = async (item: Soporte) =>
  soporteCrud.create(item);
export const updatesoporte = async (item: Soporte, id: string | number) =>
  soporteCrud.update(item, id);
export const getsoporteById = async (id: string | number) =>
  soporteCrud.getById(id);
export const getAllsoporte = async () => soporteCrud.getAll();
export const revalidateDatasoporte = async () =>
  soporteCrud.revalidateData();
export async function GetAllEntitiesSoporte() {
  try {
    const response = await fetch(`${soporteWithEntitiesApiUrl}`, {
      cache: "no-cache",
      next: { tags: [tag] },
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
export async function GetAllEntitiesById(id:number) {
  try {
    const response = await fetch(`${soporteWithEntitiesByIdApiUrl}/${id}`, {
      cache: "no-cache",
      next: { tags: [tag] },
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}