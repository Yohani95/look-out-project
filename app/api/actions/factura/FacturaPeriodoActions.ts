"use server"

import { facturaPeriodoApiUrl } from "@/app/api/apiConfig";
import { CrudOperations } from "@/app/api/models/common/CrudOperations";
import FacturaPeriodo from "@/app/api/models/factura/FacturaPeriodo";

const tag = "facturaPeriodo";

const facturaPeriodoCrud = new CrudOperations<FacturaPeriodo>(facturaPeriodoApiUrl, tag);

export const createFacturaPeriodo = async (item: FacturaPeriodo) => facturaPeriodoCrud.create(item);
export const updateFacturaPeriodo = async (item: FacturaPeriodo) => facturaPeriodoCrud.update(item);
export const getFacturaPeriodoById = async (id: string | number) => facturaPeriodoCrud.getById(id);
export const deleteFacturaPeriodo = async (id: string | number) => facturaPeriodoCrud.deleteById(id);
export const getAllFacturaPeriodo = async () => facturaPeriodoCrud.getAll();

export async function getFacturaPeriodoByIdPeriodo(idPeriodo: number) {
    try {
        const response = await fetch(`${facturaPeriodoApiUrl}/GetAllEntitiesByIdPeriod/${idPeriodo}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: 'no-cache',
            next:{tags:[tag]}
        });
        return response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}
export async function getAllEntetiesFacturaPeriodo() {
    try {
        const response = await fetch(`${facturaPeriodoApiUrl}/`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: 'no-cache',
            next:{tags:[tag]}
        });
        return response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}