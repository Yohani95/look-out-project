"use client"
import React, { use, useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import PeriodosProfesionales from '@/app/api/models/proyecto/PeriodoProfesionales';
import Persona from '@/app/api/models/admin/Persona';
import { getPeriodoProfesionalApiUrl } from '@/app/api/apiConfig';
import PeriodosProyecto from '@/app/api/models/proyecto/PeriodosProyecto';
import { set } from 'date-fns';
function PeriodosProfessionals({ data, t, idPeriodo }) {
    const router = useRouter();
    const [periodosProfesionales, setPeriodosProfesionales] = useState([]);
    const [periodo, setPeriodo] = useState<PeriodosProyecto>(new PeriodosProyecto());
    const fetchPeriodo = async () => {
        try {
            const url = `${getPeriodoProfesionalApiUrl}/${idPeriodo}`;
            const result = await fetch(url);
            const data = await result.json();
            const Profesionales = data as PeriodosProfesionales[];
            setPeriodo(Profesionales[0]?.periodo);
            new PeriodosProyecto(Profesionales[0]?.periodo);
            const filter = Profesionales.map((item) => {
                const profesional = PeriodosProfesionales.transformProfesionalData(item);
                profesional.participante.persona.perNombres = new Persona(item.participante.persona).getNombreCompleto();
                return profesional;
            });
            setPeriodosProfesionales(filter);
        } catch (error) {
            console.error("Error in handleFormSubmit:", error);
        }
    }
    useEffect(() => {
        fetchPeriodo();
    }, [])
    return (
        <>
            <div className="mb-3 row align-items-center">
                <label className='col-sm-1'>
                    {t.project.dateStart} :
                </label>
                <span className='col-sm-2'>{periodo && periodo.fechaPeriodoDesde ? new Date(periodo.fechaPeriodoDesde).toLocaleDateString() : "N/A"}</span>
                <label className='col-sm-1'>
                    {t.project.dateEnd} :
                </label>
                <span className='col-sm-2'>
                    {periodo && periodo.fechaPeriodoHasta ? new Date(periodo.fechaPeriodoHasta).toLocaleDateString() : "N/A"}
                </span>
                <label className='col-sm-1'>
                    {t.Common.totalDays} :
                </label>
                <span className='col-sm-1'>{periodo?.diasTotal || 0}</span>
                <label className='col-sm-1'>
                    {t.Common.total} :
                </label>
                <span className='col-sm-2'>{periodo?.monto || 0}</span>
            </div>
            <TableMaterialUI columns={PeriodosProfesionales.createColumns(t)} data={periodosProfesionales} />
            <div className="d-flex justify-content-end mt-2 mb-3">
                <button
                    type="button"
                    className="btn btn-danger m-2"
                    onClick={(e) => {
                        router.back();
                    }}
                >
                    {t.Common.goBack}
                </button>
            </div>
        </>
    )
}

export default PeriodosProfessionals