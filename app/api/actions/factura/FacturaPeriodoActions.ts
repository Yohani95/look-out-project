import { facturaPeriodoApiUrl } from "@/app/api/apiConfig";
import { CrudOperations } from "@/app/api/models/common/CrudOperations";
import FacturaPeriodo from "@/app/api/models/factura/FacturaPeriodo";

const tag = "facturaPeriodoActions";
export class FacturaPeriodoCrud extends CrudOperations<FacturaPeriodo> {
    constructor() {
        super(facturaPeriodoApiUrl, tag);
    }
    async GetFacturaPeriodo(idFactura: number) {
        try {
            const response = await fetch(`${facturaPeriodoApiUrl}/${idFactura}`);
            return response.json();
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    }
}
