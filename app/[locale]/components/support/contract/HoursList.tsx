import React, { useMemo } from 'react'
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';
import HorasUtilizadas from '@/app/api/models/support/HorasUtilizadas';
import HoursButtons from './HoursButtons';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function HoursList({ t, data }) {
    const columns = useMemo(() => HorasUtilizadas.createColumns(t), [t]);
    const memoizedSoporteActions = useMemo(() => {
        return data.map((horas) => ({
            ...HorasUtilizadas.transformHorasUtilizadasData(horas),
            estado: new HorasUtilizadas(horas).getEstados(t),
            actions: (
                <>
                <HoursButtons t={t} periodo={horas} />
                </>
            )
        }));
    }, [data, t]);
    return (
        <MemoizedTableMaterialUI columns={columns} data={memoizedSoporteActions} />
    )
}

export default HoursList