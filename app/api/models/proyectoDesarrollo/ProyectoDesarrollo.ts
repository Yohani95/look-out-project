import * as Yup from 'yup';
import EstadoProyectoDesarrollo from './EstadoProyectoDesarrollo';
import Moneda from '../world/Moneda';
import EtapaProyectoDesarrollo from './EtapaProyectoDesarrollo';
import Cliente from '../cuenta/Cliente';
import Persona from '../admin/Persona';
import TipoProyectoDesarrollo from './TipoProyectoDesarrollo';
import EmpresaPrestadora from '../proyecto/EmpresaPrestadora';
import { format } from 'date-fns';
class ProyectoDesarrollo {
  id: number | 0;
  nombre: string | null;
  fechaCierre: Date | null;
  idContacto: number | null;
  idKam: number | null;
  idMoneda: number | null;
  idTipoProyecto: number | null;
  idEstado: number | null;
  idCliente: number | null;
  idEtapa: number | null;
  avance: number | null;
  idPais: number | null;
  idEmpresaPrestadora: number | null;
  monto: number | null;
  idJefeProyecto: number | null;
  // Relaciones
  estado: EstadoProyectoDesarrollo | null;
  moneda: Moneda | null;
  etapa: EtapaProyectoDesarrollo | null;
  cliente: Cliente | null;
  tipoProyectoDesarrollo: TipoProyectoDesarrollo | null;
  kam: Persona | null;
  fechaCreacion: Date | null;
  empresaPrestadora: EmpresaPrestadora | null;
  jefeProyecto: Persona | null;
  constructor(data?: any) {
    this.id = data?.id || 0;
    this.nombre = data?.nombre || null;
    this.fechaCierre = data?.fechaCierre ? new Date(data.fechaCierre) : null;
    this.idContacto = data?.idContacto || null;
    this.idKam = data?.idKam || null;
    this.idMoneda = data?.idMoneda || null;
    this.idTipoProyecto = data?.idTipoProyecto || null;
    this.idEstado = data?.idEstado || null;
    this.idCliente = data?.idCliente || null;
    this.idEtapa = data?.idEtapa || null;
    this.avance = data?.avance || null;
    this.idPais = data?.idPais || null;
    this.idEmpresaPrestadora = data?.idEmpresaPrestadora || null;
    this.monto = data?.monto || null;
    this.fechaCreacion = data?.fechaCreacion
      ? new Date(data?.fechaCreacion)
      : null;
    this.idJefeProyecto = data?.idJefeProyecto || null;
    // Relaciones
    this.estado = data?.estado || null;
    this.moneda = data?.moneda || null;
    this.etapa = data?.etapa || null;
    this.cliente = data?.cliente || null;
    this.tipoProyectoDesarrollo = data?.tipoProyectoDesarrollo || null;
    this.kam = data?.kam || null;
    this.empresaPrestadora = data?.empresaPrestadora || null;
    this.jefeProyecto = data?.jefeProyecto || null;
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      nombre: Yup.string()
        .required(t.ValidationMessages.required)
        .max(200, ` ${t.ValidationMessages.maxLength}, 9 min.`), // Aquí se especifica el límite de 200 caracteres
      fechaCierre: Yup.date().nullable(),
      idContacto: Yup.number().nullable(),
      idKam: Yup.number().nullable(),
      idMoneda: Yup.number().nullable(),
      idTipoProyecto: Yup.number().nullable(),
      idEstado: Yup.number().nullable(),
      idCliente: Yup.number().nullable(),
      idEtapa: Yup.number().nullable(),
      avance: Yup.number().nullable(),
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
        accessorKey: 'nombre',
        header: 'Nombre del Proyecto',
        size: 200,
      },
      {
        accessorKey: 'jefe',
        header: 'Jefe Proyecto',
        size: 200,
      },
      {
        accessorKey: 'estado.nombre',
        header: 'Estado',
        size: 150,
      },
      {
        accessorKey: 'etapa.nombre',
        header: 'Etapa',
        size: 150,
      },
      {
        accessorKey: 'cliente.cliNombre',
        header: 'Cliente',
        size: 150,
      },
      {
        accessorKey: 'tipoProyectoDesarrollo.nombre',
        header: 'Tipo de Proyecto',
        size: 150,
      },
      {
        accessorKey: 'avance',
        header: 'Avance (%)',
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
  getPeriodoCompleto(): string {
    const formato = 'dd/MM/yyyy';
    return `${format(this.fechaCreacion, formato)} - ${format(
      this.fechaCierre,
      formato
    )}`;
  }
}

export default ProyectoDesarrollo;
