"use server";
import { CrudOperations } from "@/app/api/models/common/CrudOperations";
import {
  getAllHorasByIdSoportepiUrl,
  horasUtilizadasApiUrl,
} from "@/app/api/apiConfig";
import HorasUtilizadas from "../../models/support/HorasUtilizadas";

const tag = "horasUtilizadasActions";

const horasUtilizadasCrud = new CrudOperations<HorasUtilizadas>(horasUtilizadasApiUrl, tag);

export const createhorasUtilizadas = async (item: HorasUtilizadas) =>
  horasUtilizadasCrud.create(item);
export const updatehorasUtilizadas = async (item: HorasUtilizadas, id: string | number) =>
  horasUtilizadasCrud.update(item, id);
export const gethorasUtilizadasById = async (id: string | number) =>
  horasUtilizadasCrud.getById(id);
export const getAllhorasUtilizadas = async () => horasUtilizadasCrud.getAll();
export const revalidateDatahorasUtilizadas = async () =>
  horasUtilizadasCrud.revalidateData();
export async function getAllHorasByIdSoporte(id:number) {
    try {
      const response = await fetch(`${getAllHorasByIdSoportepiUrl}/${id}`, {
        cache: "no-cache",
        next: { tags: [tag] },
      });
      return response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }