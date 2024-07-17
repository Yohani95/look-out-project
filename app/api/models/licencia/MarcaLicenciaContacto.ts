import * as Yup from "yup";

class MarcaLicenciaContacto {
  id: number | null;
  idMarca: number | null;
  idContacto: number | null;

  constructor(data?: any) {
    this.id = data?.id || null;
    this.idMarca = data?.idMarca || null;
    this.idContacto = data?.idContacto || null;
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      idMarca: Yup.number().nullable().required(t.validationMessages.required),
      idContacto: Yup.number().nullable().required(t.validationMessages.required),
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
        accessorKey: "idMarca",
        header: "ID Marca",
        size: 100,
      },
      {
        accessorKey: "idContacto",
        header: "ID Contacto",
        size: 100,
      },
      {
        accessorKey: "actions",
        header: t.Common.actions,
        size: 100,
      },
    ];
  }

  getSelectOptions() {
    return {
      value: this.id,
      label: `Marca: ${this.idMarca}, Contacto: ${this.idContacto}`,
    };
  }
}

export default MarcaLicenciaContacto;
