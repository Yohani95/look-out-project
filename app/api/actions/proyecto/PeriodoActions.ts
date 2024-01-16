
import PeriodosProyecto from "@/app/api/models/proyecto/PeriodosProyecto";
import { CrudOperations } from "@/app/api/models/common/CrudOperations";
import { getPeriodoProyectoApiUrl, periodoApiUrl } from "@/app/api/apiConfig";
const tag = "tipoFacturacionActions";

export class PeriodosCrud extends CrudOperations<PeriodosProyecto> {
    constructor() {
        super(periodoApiUrl, tag);
    }

    async GetPeriodoProyecto(idProyecto: number) {
      try {
        const response = await fetch(`${getPeriodoProyectoApiUrl}/${idProyecto}`);
        return response.json();
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    }
}