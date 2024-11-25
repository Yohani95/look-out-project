'use client';
import React, { useEffect, useState } from 'react';
import { FormikProps } from 'formik';
import HorasUtilizadas from '@/app/api/models/support/HorasUtilizadas';
import SelectField from '../../common/SelectField';
import Soporte from '@/app/api/models/support/Soporte';
function HoursForm({
  t,
  formik,
  soporte,
}: {
  t: any;
  formik: FormikProps<HorasUtilizadas>;
  soporte: any;
}) {
  const [periodo, setPeriodo] = useState('');
  const handlePeriod = (selectedOption) => {
    try {
      if (!selectedOption || selectedOption.trim() === '') {
        formik.setFieldValue('fechaPeriodoDesde', null);
        formik.setFieldValue('fechaPeriodoHasta', null);
        return;
      }
      const [startDateStr, endDateStr] = selectedOption.split(' - ');
      const startDate = new Date(startDateStr);
      const endDate = new Date(endDateStr);
      formik.setFieldValue('fechaPeriodoDesde', startDate);
      formik.setFieldValue('fechaPeriodoHasta', endDate);
    } catch (error) {
      console.log(error);
    }
  };
  const calculatePeriods = () => {
    const startDate = new Date(soporte.pryFechaInicioEstimada);
    const endDate = new Date(soporte.pryFechaCierreEstimada);
    const cutoffDate = parseInt(soporte.fechaCorte, 10);
    const periods = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      let year = currentDate.getFullYear();
      let month = currentDate.getMonth();
      let daysInMonth = new Date(year, month + 1, 0).getDate(); // Obtener el número de días en el mes

      // Determinar el día límite según el mes y año actual
      let periodEndDate;
      if (cutoffDate > daysInMonth) {
        // Si el día de corte excede los días del mes, usar el último día del mes
        periodEndDate = new Date(year, month, daysInMonth);
      } else {
        // Si el día de corte es válido para el mes, usarlo
        periodEndDate = new Date(year, month, cutoffDate);
      }

      // Si la fecha de corte es antes de la fecha de inicio, ajustar al próximo mes
      if (periodEndDate < currentDate) {
        month++;
        if (month > 11) {
          month = 0;
          year++;
        }
        daysInMonth = new Date(year, month + 1, 0).getDate();
        periodEndDate = new Date(
          year,
          month,
          Math.min(cutoffDate, daysInMonth)
        );
      }

      // Si la fecha de corte excede la fecha de cierre, ajustar al día de cierre
      if (periodEndDate > endDate) {
        periodEndDate = new Date(endDate);
      }

      const formattedStartDate = currentDate.toLocaleDateString();
      const formattedEndDate = periodEndDate.toLocaleDateString();

      periods.push({
        key: `${periods.length + 1}`,
        label: `${formattedStartDate} - ${formattedEndDate}`,
        value: `${currentDate.toISOString()} - ${periodEndDate.toISOString()}`,
      });

      // Establecer el día después del final del período actual como base para el próximo periodo
      currentDate = new Date(
        periodEndDate.getFullYear(),
        periodEndDate.getMonth(),
        periodEndDate.getDate() + 1
      );
    }
    return periods;
  };
  useEffect(() => {
    handlePeriod(periodo); // Llamar a handle cuando periodo cambie
  }, [periodo]);
  return (
    <>
      <div>
        <div className="mb-3 row align-items-center">
          <SelectField
            label={`${t.Common.period}`}
            options={calculatePeriods()}
            preOption={t.Account.select}
            labelClassName="col-sm-1 col-form-label"
            divClassName="col-sm-2"
            onChange={
              (e) => setPeriodo(e.target.value) // Actualizar el estado del periodo seleccionado
            }
            selectedValue={periodo}
          />
          <label htmlFor="horas" className="col-sm-1 col-form-label">
            {t.time.hour}
          </label>
          <div className="col-sm-2">
            <input
              type="number"
              className={`form-control ${
                formik.touched.horas && formik.errors.horas ? 'is-invalid' : ''
              }`}
              id="horas"
              name="horas"
              min="0"
              max="999"
              value={formik.values.horas ?? ''}
              step="0.01"
              onChange={(e) => {
                formik.setFieldValue('horas', parseFloat(e.target.value));
              }}
            />
            {formik.touched.horas && formik.errors.horas && (
              <div className="invalid-feedback">{formik.errors.horas}</div>
            )}
          </div>
          <label htmlFor="file" className="col-sm-1 col-form-label">
            {t.Common.document}
          </label>
          <div className="col-sm-4">
            <input
              className="form-control"
              type="file"
              id="file"
              name="file"
              onChange={async (event) => {
                const fileInput = event.currentTarget;
                if (fileInput.files && fileInput.files.length > 0) {
                  // Leer el archivo y convertirlo a base64
                  let reader = new FileReader();
                  let arrayBuffer = await new Promise((resolve) => {
                    reader.onload = (e) => resolve(e.target.result);
                    reader.readAsArrayBuffer(fileInput.files[0]);
                  });
                  let base64String = btoa(
                    new Uint8Array(arrayBuffer as ArrayBuffer).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ''
                    )
                  );

                  formik.setFieldValue(
                    'nombreDocumento',
                    fileInput.files[0].name
                  );
                  formik.setFieldValue('contenidoDocumento', base64String);
                }
              }}
            />
            {formik.values.nombreDocumento && (
              <a
                href={`data:application/octet-stream;base64,${formik.values.contenidoDocumento}`}
                download={formik.values.nombreDocumento}
              >
                {t.Common.downloadFile} {formik.values.nombreDocumento}
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HoursForm;
