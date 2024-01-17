
"use server"

import PeriodosProyecto from "@/app/api/models/proyecto/PeriodosProyecto";
import { CrudOperations } from "@/app/api/models/common/CrudOperations";
import { getPeriodoProyectoApiUrl, periodoApiUrl } from "@/app/api/apiConfig";

const tag = "tipoFacturacionActions";

const periodosCrud = new CrudOperations<PeriodosProyecto>(periodoApiUrl, tag);

export const createPeriodoProyecto = async (item: PeriodosProyecto) => periodosCrud.create(item);
export const updatePeriodoProyecto = async (item: PeriodosProyecto) => periodosCrud.update(item);
export const getPeriodoProyectoById = async (id: string | number) => periodosCrud.getById(id);
export const getAllPeriodosProyecto = async () => periodosCrud.getAll();

export async function getPeriodoProyecto(idProyecto: number) {
  try {
    const response = await fetch(`${getPeriodoProyectoApiUrl}/${idProyecto}`);
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}