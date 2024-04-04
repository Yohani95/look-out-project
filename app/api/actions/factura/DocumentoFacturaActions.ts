"use server";

import { documentoFacturaApiUrl} from "@/app/api/apiConfig";
import { CrudOperations } from "@/app/api/models/common/CrudOperations";
import DocumentoFactura from "@/app/api/models/factura/DocumentoFactura";
import { revalidateTag } from "next/cache";
const tag = "DocumentoFactura";

const DocumentoFacturaCrud = new CrudOperations<DocumentoFactura>(
  documentoFacturaApiUrl,
  tag
);

export const createDocumentoFactura = async (item: DocumentoFactura) =>
  DocumentoFacturaCrud.create(item);
export const updateDocumentoFactura = async (item: DocumentoFactura,id:string| number) =>
  DocumentoFacturaCrud.update(item,id);
export const getDocumentoFacturaById = async (id: string | number) =>
  DocumentoFacturaCrud.getById(id);
export const deleteDocumentoFactura = async (id: string | number) =>
  DocumentoFacturaCrud.deleteById(id);
export const getAllDocumentoFactura = async () => DocumentoFacturaCrud.getAll();
export async function AddDocumento(documento: DocumentoFactura) {
  try {
    const response = await fetch(
      `${documentoFacturaApiUrl}/AddDocumento`,
      {
        method: "POST ",
        
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(documento),
        cache: "no-cache",
        next: { tags: [tag] },
      }
    );
    revalidateTag("facturaPeriodo");
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}