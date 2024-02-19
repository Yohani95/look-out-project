"use server";

import Proyecto from "@/app/api/models/proyecto/Proyecto";
import { CrudOperations } from "@/app/api/models/common/CrudOperations";
import {
  proyectoApiUrl,
  proyectoWithEntitiesApiUrl,
} from "@/app/api/apiConfig";

const tag = "proyectoActions";

const proyectosCrud = new CrudOperations<Proyecto>(proyectoApiUrl, tag);

export const createProyecto = async (item: Proyecto) =>
  proyectosCrud.create(item);
export const updateProyecto = async (item: Proyecto, id: string | number) =>
  proyectosCrud.update(item, id);
export const getProyectoById = async (id: string | number) =>
  proyectosCrud.getById(id);
export const getAllProyecto = async () => proyectosCrud.getAll();
export const revalidateDataProyecto = async () =>
  proyectosCrud.revalidateData();
export async function GetAllEntetiesProyecto() {
  try {
    const response = await fetch(`${proyectoWithEntitiesApiUrl}`, {
      cache: "no-cache",
      next: { tags: [tag] },
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
