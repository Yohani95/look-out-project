'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TableMaterialUI from '../../common/TablaMaterialUi';
import Persona from '@/app/api/models/admin/Persona';
import { getAllProyectoParticipanteByDate } from '@/app/actions/admin/PersonaActions';
import { Loader2 } from 'lucide-react';
import Utils from '@/app/api/models/common/Utils';
import DatePickerField from '../../common/MyDatePicker';

const MemoizedTableMaterialUI = React.memo(TableMaterialUI);

function ActiveProfessionals({ t }) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!fechaSeleccionada) return; // No hacer nada si no hay fecha seleccionada

    async function fetchData() {
      setLoading(true);
      try {
        // Convertimos la fecha seleccionada a objeto Date
        const selectedDate = new Date(fechaSeleccionada);
        const res = await getAllProyectoParticipanteByDate(selectedDate);
        setData(res);
      } catch (error) {
        Utils.handleErrorNotification(t);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [fechaSeleccionada]);

  const columns = useMemo(
    () => Persona.createColumnsActiveProfessionals(t),
    [t]
  );
  const memoizedActions = useMemo(() => {
    return data.map((participante) => ({
      ...participante,
      fechaAsignacion: Utils.getFechaString(participante.fechaAsignacion),
      fechaTermino: participante.fechaTermino
        ? Utils.getFechaString(participante.fechaTermino)
        : 'N/A',
      nombre: new Persona(participante.persona).getNombreCompleto(),
    }));
  }, [data, t]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="fechaSeleccionada">{t.Common.dateAssignment}</Label>
          <DatePickerField
            selectedDate={fechaSeleccionada}
            onChange={(date) => setFechaSeleccionada(date)}
            title={''}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          <span className="mt-2 text-lg font-semibold text-gray-600">
            {t.Common.loading}
          </span>
        </div>
      ) : fechaSeleccionada ? (
        <MemoizedTableMaterialUI columns={columns} data={memoizedActions} />
      ) : (
        <p>{t.Common.PleaseSelectDate}</p>
      )}
    </div>
  );
}

export default ActiveProfessionals;
