import { Moneda } from '@/app/api/models/world/Moneda';
import * as Yup from 'yup';
import { format } from 'date-fns';
import Persona from '../admin/Persona';
class Oportunidad {
  id: number | null;
  nombre: string | null;
  fechaCierre: Date | null;
  idEstadoOportunidad: number | null;
  idCliente: number | null;
  idMoneda: number | null;
  monto: number | null;
  idTipoOportunidad: number | null;
  idPais: number | null;
  renovable: boolean | null;
  idLicitacion: number | null;
  fechaRenovacion: Date | null;
  idEmpresaPrestadora: number | null;
  idContacto: number | null;
  idAreaServicio: number | null;
  descripcion: string | null;
  idKam: number | null;
  personaKam: Persona | null;
  fechaCreacion: Date | null;
  idOrigen: number | null;
  idTipoLicencia: number | null;
  idTipoCerrada: number | null;
  moneda: Moneda | null;
  constructor(data?: any) {
    this.id = data?.id || 0;
    this.nombre = data?.nombre || null;
    this.fechaCierre = data?.fechaCierre ? new Date(data.fechaCierre) : null;
    this.idEstadoOportunidad = data?.idEstadoOportunidad || null;
    this.idCliente = data?.idCliente || null;
    this.idMoneda = data?.idMoneda || null;
    this.monto = data?.monto || null;
    this.idTipoOportunidad = data?.idTipoOportunidad || null;
    this.idPais = data?.idPais || null;
    this.renovable = data?.renovable || false;
    this.idLicitacion = data?.idLicitacion || null;
    this.fechaRenovacion = data?.fechaRenovacion
      ? new Date(data.fechaRenovacion)
      : null;
    this.fechaCreacion = data?.fechaCreacion || null;
    this.idEmpresaPrestadora = data?.idEmpresaPrestadora || null;
    this.idContacto = data?.idContacto || null;
    this.idAreaServicio = data?.idAreaServicio || null;
    this.descripcion = data?.descripcion || null;
    this.idKam = data?.idKam || null;
    this.personaKam = data?.personaKam || null;
    this.idOrigen = data?.idOrigen || null;
    this.idTipoLicencia = data?.idTipoLicencia || null;
    this.idTipoCerrada = data?.idTipoCerrada || null;
    this.moneda = data?.moneda || null;
  }

  static getValidationSchema(t) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      nombre: Yup.string().nullable(),
      fechaCierre: Yup.date().nullable(),
      idEstadoOportunidad: Yup.number().nullable(),
      idCliente: Yup.number().nullable(),
      idMoneda: Yup.number().nullable(),
      monto: Yup.number().nullable(),
      idTipoOportunidad: Yup.number().nullable(),
      idPais: Yup.number().nullable(),
      renovable: Yup.boolean().nullable(),
      fechaRenovacion: Yup.date().nullable(),
      idEmpresaPrestadora: Yup.number().nullable(),
      idContacto: Yup.number().nullable(),
      idAreaSerivicio: Yup.number().nullable(),
      descripcion: Yup.string()
        .required(t.ValidationMessages.required)
        .max(255, `${t.ValidationMessages.maxLength} 250 max`),
    });
  }

  static createColumns(t) {
    return [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'nombre',
        header: 'Nombre',
        size: 100,
      },
      {
        accessorKey: 'cliente.cliNombre',
        header: 'Cliente',
        size: 100,
      },
      {
        accessorKey: 'fechaCreacion',
        header: 'Fecha Creación',
        size: 50,
      },
      {
        accessorKey: 'fechaCierre',
        header: 'Fecha Cierre',
        size: 50,
      },
      {
        accessorKey: 'monto',
        header: 'Monto',
        size: 50,
      },
      {
        accessorKey: 'estadoOportunidad.nombre',
        header: 'Estado Oportunidad',
        size: 100,
      },
      {
        accessorKey: 'tipoOportunidad.nombre',
        header: 'Tipo Oportunidad',
        size: 100,
      },
      {
        accessorKey: 'personaKam',
        header: t.Account.KAM,
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
      label: this.nombre,
    };
  }
  getFechaString(fecha = this.fechaCierre): string | null {
    return fecha ? format(new Date(fecha), 'dd/MM/yyyy') : 'N/A';
  }
}

export default Oportunidad;
