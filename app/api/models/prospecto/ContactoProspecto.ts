import * as Yup from 'yup';
import Pais from '../world/Pais';
import TipoContactoProspecto from './TipoContactoProspecto';
import Perfil from '../admin/Perfil';

class ContactosProspecto {
  id: number | null;
  nombreCompleto: string | null;
  email: string | null;
  numero: string | null;
  perfilLinkedin: string | null;
  idTipo: number | null;
  idPais: number | null;
  idPerfil: number | null;
  pais: Pais | null;
  tipoContactoProspecto: TipoContactoProspecto | null;
  perfil: Perfil | null;
  constructor(data?: any) {
    this.id = data?.id || 0;
    this.nombreCompleto = data?.nombreCompleto || null;
    this.email = data?.email || null;
    this.numero = data?.numero || null;
    this.perfilLinkedin = data?.perfilLinkedin || null;
    this.idTipo = data?.idTipo || null;
    this.idPais = data?.idPais || null;
    this.pais = data?.pais || null;
    this.tipoContactoProspecto = data?.tipoContactoProspecto || null;
    this.idPerfil = data?.idPerfil || null;
    this.perfil = data?.perfil || null;
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      nombreCompleto: Yup.string()
        .required(t.ValidationMessages.required)
        .max(150, t.ValidationMessages.maxLength), // Longitud máxima de 150 caracteres
      email: Yup.string()
        .email(t.Common.invalidEmail)
        .nullable()
        .max(150, t.ValidationMessages.maxLength), // Longitud máxima de 150 caracteres
      numero: Yup.string()
        .nullable()
        .min(9, `${t.Common.invalidPhoneNumber}, 9 min.`)
        .max(20, `${t.Common.invalidPhoneNumber}, 20 max.`), // Longitud máxima de 20 caracteres
      perfilLinkedin: Yup.string()
        .nullable()
        .max(200, t.ValidationMessages.maxLength), // Longitud máxima de 200 caracteres
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
        accessorKey: 'nombreCompleto',
        header: 'Nombre Completo',
        size: 100,
      },
      {
        accessorKey: 'tipoContactoProspecto.nombre',
        header: t.Ficha.type,
        size: 100,
      },
      {
        accessorKey: 'pais.paiNombre',
        header: t.Ficha.country,
        size: 100,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 100,
      },
      {
        accessorKey: 'numero',
        header: 'Número',
        size: 50,
      },
      {
        accessorKey: 'perfilLinkedin',
        header: 'Perfil LinkedIn',
        size: 100,
      },

      {
        accessorKey: 'actions',
        header: t.Common.actions,
        size: 100,
      },
    ];
  }

  getSelectOptions() {
    return {
      value: this.id,
      label: this.nombreCompleto,
    };
  }
}

export default ContactosProspecto;
