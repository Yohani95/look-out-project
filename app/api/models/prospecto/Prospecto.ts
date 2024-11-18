import * as Yup from 'yup';
import Persona from '../admin/Persona';
import EstadoProspecto from './EstadoProspecto';
import Cliente from '../cuenta/Cliente';
import ContactosProspecto from './ContactoProspecto';

class Prospecto {
  id: number | null;
  fechaCreacion: Date | null;
  fechaActividad: Date | null;
  idKam: number | null;
  contactado: boolean | null;
  cantidadLlamadas: number | null;
  responde: boolean | null;
  idEstadoProspecto: number | null;
  idContacto: number | null;
  kam: Persona | null;
  estadoProspecto: EstadoProspecto | null;
  idCliente: number | null;
  contacto: ContactosProspecto | null;
  cliente: Cliente | null;
  // Constructor para inicializar los valores del objeto con los datos de la base de datos
  constructor(data?: any) {
    this.id = data?.id || 0;
    this.fechaCreacion = data?.fechaCreacion
      ? new Date(data.fechaCreacion)
      : null;
    this.fechaActividad = data?.fechaActividad
      ? new Date(data.fechaActividad)
      : null;
    this.idKam = data?.idKam || null;
    this.contactado = data?.contactado || null;
    this.cantidadLlamadas = data?.cantidadLlamadas || null;
    this.responde = data?.responde || null;
    this.idEstadoProspecto = data?.idEstadoProspecto || null;
    this.idContacto = data?.idContacto || null;
    this.idCliente = data?.idCliente || null;
    //relaciones
    this.kam = data?.kam || null;
    this.estadoProspecto = data?.estadoProspecto || null;
    this.contacto = data?.contacto || null;
    this.cliente = data?.cliente || null;
  }

  // Método para obtener el esquema de validación usando Yup
  static getValidationSchema(t: any) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      fechaCreacion: Yup.date().nullable(),
      fechaActividad: Yup.date().nullable(),
      idKam: Yup.number().nullable(),
      contactado: Yup.boolean().nullable(),
      cantidadLlamadas: Yup.number().nullable(),
      responde: Yup.boolean().nullable(),
    });
  }

  // Método para definir las columnas en una tabla
  static createColumns(t: any) {
    return [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'cliente.cliNombre',
        header: 'cliente',
        size: 100,
      },
      {
        accessorKey: 'contacto',
        header: t.Common.contact,
        size: 100,
      },
      {
        accessorKey: 'tipoContactoProspecto',
        header: t.Ficha.type,
        size: 100,
      },
      {
        accessorKey: 'fechaCreacion',
        header: 'Fecha Creación',
        size: 100,
      },
      {
        accessorKey: 'fechaActividad',
        header: 'Fecha Actividad',
        size: 100,
      },
      {
        accessorKey: 'kam',
        header: 'KAM',
        size: 150,
      },
      {
        accessorKey: 'numeroContacto',
        header: 'Numero',
        size: 50,
      },
      {
        accessorKey: 'estadoProspecto.nombre',
        header: t.Common.status,
        size: 150,
      },
      {
        accessorKey: 'contactado',
        header: 'Contactado',
        size: 50,
      },
      {
        accessorKey: 'responde',
        header: 'Responde',
        size: 50,
      },
      {
        accessorKey: 'cantidadLlamadas',
        header: 'Cantidad Llamadas',
        size: 50,
      },
      {
        accessorKey: 'actions',
        header: t.Common.actions,
        size: 100,
      },
    ];
  }

  // Método para obtener las opciones de selección
  getSelectOptions() {
    return {
      value: this.id,
      label: this.id ? `Prospecto ${this.id}` : 'Sin ID',
    };
  }
}

export default Prospecto;
