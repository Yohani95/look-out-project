import * as Yup from 'yup';

class DocumentoProyectoDesarrollo {
  id: number | null;
  idProyectoDesarrollo: number | null;
  nombreDocumento: string | null;
  contenidoDocumento: string | null;
  descripcion: string | null;
  constructor(data?: any) {
    this.id = data?.id || 0;
    this.idProyectoDesarrollo = data?.idProyectoDesarrollo || 0;
    this.nombreDocumento = data?.nombreDocumento || '';
    this.contenidoDocumento = data?.contenidoDocumento || null;
    this.descripcion = data?.descripcion || null;
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      nombreDocumento: Yup.string().required(t.ValidationMessages.required),
      idProyectoDesarrollo: Yup.number().required(
        t.ValidationMessages.required
      ),
      descripcion: Yup.string()
        .required(t.ValidationMessages.required)
        .max(255, t.ValidationMessages.maxLength),
    });
  }
  static createColumns(t: any) {
    return [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'nombreDocumento',
        header: t.Common.name,
        size: 200,
      },
      {
        accessorKey: 'descripcion',
        header: `${t.Common.description}`,
        size: 200,
      },
      {
        accessorKey: 'actions',
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
export default DocumentoProyectoDesarrollo;
