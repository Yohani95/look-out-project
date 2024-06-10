import * as Yup from "yup";

class DocumentoOportunidad {
  id: number | null;
  idOportunidad: number | null;
  nombreDocumento: string | null;
  contenidoDocumento: string | null;

  constructor(data?: any) {
    this.id = data?.id || 0;
    this.idOportunidad = data?.idOportunidad || 0;
    this.nombreDocumento = data?.nombreDocumento || "";
    this.contenidoDocumento = data?.contenidoDocumento || null;
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      nombreDocumento: Yup.string().required(t.ValidationMessages.required),
      idOportunidad: Yup.number().required(t.ValidationMessages.required),
    });
  }
  static createColumns(t: any) {
    return [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
      },
      {
        accessorKey: "nombreDocumento",
        header: "Nombre del Documento",
        size: 200,
      },
      {
        accessorKey: "actions",
        header: t.Common.actions,
        size: 100,
      },
    ];
  }

  // getSelectOptions() {
  //   return {
  //     value: this.id,
  //     label: this.nombreDocumento,
  //   };
  // }
}
export default DocumentoOportunidad;
