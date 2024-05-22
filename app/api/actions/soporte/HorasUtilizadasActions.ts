"use server";
import { CrudOperations } from "@/app/api/models/common/CrudOperations";
import {
  getAllHorasByIdSoportepiUrl,
  horasUtilizadasApiUrl,
  horasUtilizadascreateBagApiUrl,
  horasUtilizadascreateOnDemandApiUrl,
  horasUtilizadasupdateBagApiUrl,
  horasUtilizadasupdateOnDemandApiUrl,
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
  export async function createBagHorasUtilizadas( item : HorasUtilizadas) {
    try {
      const response = await fetch(horasUtilizadascreateBagApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
      });
      if(response.ok){
        revalidateDatahorasUtilizadas()
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  export async function updateBagHorasUtilizadas( item : HorasUtilizadas,id:string | number) {
    try {
      const response = await fetch(`${horasUtilizadasupdateBagApiUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
      });
      if(response.ok){
        revalidateDatahorasUtilizadas()
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  export async function createOnDemandHorasUtilizadas( item : HorasUtilizadas) {
    try {
      const response = await fetch(horasUtilizadascreateOnDemandApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
      });
      if(response.ok){
        revalidateDatahorasUtilizadas()
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  export async function updateOnDemandHorasUtilizadas( item : HorasUtilizadas,id:string | number) {
    try {
      const response = await fetch(`${horasUtilizadasupdateOnDemandApiUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
      });
      if(response.ok){
        revalidateDatahorasUtilizadas()
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }