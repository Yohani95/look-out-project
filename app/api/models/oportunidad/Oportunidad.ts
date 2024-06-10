import * as Yup from "yup";
import { format } from 'date-fns';
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
    licitacion: boolean | null;
    fechaRenovacion: Date | null;
    idEmpresaPrestadora: number | null;
    idContacto:number | null;
    idAreaServicio:number | null;
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
        this.licitacion = data?.licitacion || null;
        this.fechaRenovacion = data?.fechaRenovacion ? new Date(data.fechaRenovacion) : null;
        this.idEmpresaPrestadora = data?.idEmpresaPrestadora || null;
        this.idContacto=data?.idContacto||null;
        this.idAreaServicio=data?.idAreaServicio|| null;
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
            licitacion: Yup.boolean().nullable(),
            fechaRenovacion: Yup.date().nullable(),
            idEmpresaPrestadora: Yup.number().nullable(),
            idContacto: Yup.number().nullable(),
            idAreaSerivicio: Yup.number().nullable(),
        });
    }

    static createColumns(t) {
        return [
            {
                accessorKey: "id",
                header: "ID",
                size: 50,
            },
            {
                accessorKey: "nombre",
                header: "Nombre",
                size: 100,
            },
            {
                accessorKey: "fechaCierre",
                header: "Fecha Cierre",
                size: 50,
            },
            {
                accessorKey: "estadoOportunidad.nombre",
                header: "ID Estado Oportunidad",
                size: 100,
            },
            {
                accessorKey: "cliente.cliNombre",
                header: "ID Cliente",
                size: 100,
            },
            {
                accessorKey: "tipoOportunidad.nombre",
                header: "ID Tipo Oportunidad",
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
            label: this.nombre,
        };
    }
    getFechaString(): string | null {
        return this.fechaCierre ? format(new Date(this.fechaCierre), 'dd/MM/yyyy') : "N/A";
      }
}

export default Oportunidad;
