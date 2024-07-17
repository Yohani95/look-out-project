import * as Yup from "yup";

class MayoristaLicenciaContacto {
  id: number | null;
  idContacto: number | null;
  idMayorista: number | null;

  constructor(data?: any) {
    this.id = data?.id || null;
    this.idContacto = data?.idContacto || null;
    this.idMayorista = data?.idMayorista || null;
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      idContacto: Yup.number().required(t.validationMessages.required),
      idMayorista: Yup.number().required(t.validationMessages.required),
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
        accessorKey: "idContacto",
        header: "ID Contacto",
        size: 200,
      },
      {
        accessorKey: "idMayorista",
        header: "ID Mayorista",
        size: 200,
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
      label: `${this.idContacto} - ${this.idMayorista}`,
    };
  }
}

export default MayoristaLicenciaContacto;
