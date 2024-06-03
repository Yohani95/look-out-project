import * as Yup from "yup";

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

    constructor(data?: any) {
        this.id = data?.id || null;
        this.nombre = data?.nombre || null;
        this.fechaCierre = data?.fechaCierre ? new Date(data.fechaCierre) : null;
        this.idEstadoOportunidad = data?.idEstadoOportunidad || null;
        this.idCliente = data?.idCliente || null;
        this.idMoneda = data?.idMoneda || null;
        this.monto = data?.monto || null;
        this.idTipoOportunidad = data?.idTipoOportunidad || null;
        this.idPais = data?.idPais || null;
        this.renovable = data?.renovable || null;
        this.licitacion = data?.licitacion || null;
        this.fechaRenovacion = data?.fechaRenovacion ? new Date(data.fechaRenovacion) : null;
        this.idEmpresaPrestadora = data?.idEmpresaPrestadora || null;
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
                size: 200,
            },
            {
                accessorKey: "fechaCierre",
                header: "Fecha Cierre",
                size: 150,
            },
            {
                accessorKey: "idEstadoOportunidad",
                header: "ID Estado Oportunidad",
                size: 150,
            },
            {
                accessorKey: "idCliente",
                header: "ID Cliente",
                size: 150,
            },
            {
                accessorKey: "idTipoOportunidad",
                header: "ID Tipo Oportunidad",
                size: 150,
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
}

export default Oportunidad;
