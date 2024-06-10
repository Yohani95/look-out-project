"use server"
import NovedadOportunidad from '@/app/api/models/oportunidad/NovedadOportunidad';
import { NovedadOportunidadApiUrl } from '@/app/api/apiConfig';
import  {CrudOperations} from "@/app/api/models/common/CrudOperations" ;

const tag = "NovedadOportunidadActions";
const NovedadOportunidadCrud = new CrudOperations<NovedadOportunidad>(NovedadOportunidadApiUrl,tag);

export const createNovedadOportunidad = async (item: NovedadOportunidad) => NovedadOportunidadCrud.create(item);
export const updateNovedadOportunidad = async (item: NovedadOportunidad,id:string | number) => NovedadOportunidadCrud.update(item,id);
export const getNovedadOportunidadById = async (id: string | number) => NovedadOportunidadCrud.getById(id);
export const deleteNovedadOportunidad = async (id: string | number) => NovedadOportunidadCrud.deleteById(id);
export const getAllNovedadOportunidad = async () => NovedadOportunidadCrud.getAll();
export const revalidateDataNovedadOportunidad = async () => NovedadOportunidadCrud.revalidateData();
export async function getAllNovedadOportunidadByIdOportunidad(id: number) {
    try {
      const response = await fetch(
        `${NovedadOportunidadApiUrl}/getbyIdOportunidad/${id}`,
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