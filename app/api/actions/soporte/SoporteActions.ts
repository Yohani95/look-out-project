"use server";
import { CrudOperations } from "@/app/api/models/common/CrudOperations";
import {
  GetAllEntitiesByIdTipoSoporteApiUrl,
  soporteApiUrl,
  soporteWithEntitiesApiUrl,
  soporteWithEntitiesByIdApiUrl,
} from "@/app/api/apiConfig";
import Soporte from "../../models/support/Soporte";
import { differenceInMonths } from "date-fns";
import { revalidatePath } from "next/cache";

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
    var data=await response.json();
    var soporte =new Soporte(data);
    const monthsDifference = differenceInMonths(
      soporte.pryFechaCierreEstimada,
      soporte.pryFechaInicioEstimada
    );
    // Redondear el valor de meses a entero
    soporte.months = Math.round(monthsDifference);
    return soporte
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
export async function GetAllEntitiesByIdTipoSoporte(id:number) {
  try {
    const response = await fetch(`${GetAllEntitiesByIdTipoSoporteApiUrl}/${id}`, {
      cache: "no-cache",
      next: { tags: [`${tag}${id}`] },
    });
    var data=await response.json();
    var soporte =data as Soporte;
    const monthsDifference = differenceInMonths(
      soporte.pryFechaCierreEstimada,
      soporte.pryFechaInicioEstimada
    );
    // Redondear el valor de meses a entero
    soporte.months = Math.round(monthsDifference);
    return soporte
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
export async function EditAction() {
  revalidatePath('/')
}
export async function createAction(id:number) {
  revalidatePath(`${tag}${id}`)
}