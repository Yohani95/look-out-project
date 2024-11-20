import * as Yup from 'yup';
import Perfil from './Perfil';
class Persona {
  id: number;
  perIdNacional: string;
  perNombres: string;
  perApellidoPaterno: string;
  perApellidoMaterno: string;
  paiId: number | null;
  tpeId: number | null;
  perFechaNacimiento: string | null = null;
  cargo: string | null;
  perfilId: number | null;
  perfil: Perfil | null;
  constructor(data?: any) {
    if (data) {
      this.id = data.id || 0;
      this.perIdNacional = data.perIdNacional || 'N/A';
      this.perNombres = data.perNombres || 'N/A';
      this.perApellidoPaterno = data.perApellidoPaterno || 'N/A';
      this.perApellidoMaterno = data.perApellidoMaterno || 'N/A';
      this.paiId = data.paiId || null;
      this.tpeId = data.tpeId || null;
      this.perFechaNacimiento = data.perFechaNacimiento || null;
      this.cargo = data.cargo || null;
      this.perfilId = data.perfilId || null; // Agregar otros campos y reemplazar si es necesario
      this.perfil = data.perfil ? new Perfil(data.perfil) : null; // Agregar otros campos y reemplazar si es necesario
    } else {
      this.id = 0;
      this.perIdNacional = null;
      this.perNombres = null;
      this.perApellidoPaterno = '';
      this.perApellidoMaterno = '';
      this.paiId = null;
      this.tpeId = null;
      this.perFechaNacimiento = null;
      this.cargo = null;
      this.perfilId = null; // Agregar otros campos y reemplazar si es necesario
      this.perfil = null; // Agregar otros campos y reemplazar si es necesario
    }
  }

  static validationRules = (t: any) =>
    Yup.object().shape({
      perIdNacional: Yup.string()
        .nullable()
        .max(50, t.ValidationMessages.maxLength),
      perNombres: Yup.string()
        .required(t.ValidationMessages.required)
        .max(50, t.ValidationMessages.maxLength),
      perApellidoPaterno: Yup.string()
        .required(t.ValidationMessages.required)
        .max(50, t.ValidationMessages.maxLength),
      perApellidoMaterno: Yup.string()
        .required(t.ValidationMessages.required)
        .max(50, t.ValidationMessages.maxLength),
      paiId: Yup.number().nullable(),
      //tpeId: Yup.number().required(t.ValidationMessages.required),
      perFechaNacimiento: Yup.date().nullable(),
    });

  getNombreCompleto(): string {
    return `${this.perNombres} ${this.perApellidoPaterno} ${this.perApellidoMaterno}`;
  }
  getSelectOptions(): { value: number; label: string } {
    return {
      value: this.id,
      label: this.getNombreCompleto(),
    };
  }
  static createColumnsProfessionals(t: any) {
    return [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'nombre',
        header: t.Common.name,
        size: 200,
      },
      {
        accessorKey: 'perIdNacional',
        header: t.Common.rut,
        size: 150,
      },
      {
        accessorKey: 'perfil.prf_Nombre',
        header: t.Common.profile,
        size: 150,
      },
      {
        accessorKey: 'actions',
        header: t.Common.actions,
        size: 100,
      },
    ];
  }
}

export default Persona;
