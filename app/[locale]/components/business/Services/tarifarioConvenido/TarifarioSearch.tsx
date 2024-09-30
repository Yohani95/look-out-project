'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
  tarifarioGetByIdProyectoApiUrl,
  tarifarioApiUrl,
} from '@/app/api/apiConfig';
import { fetchData, handleDelete } from '@/app/[locale]/utils/Form/UtilsForm';
import ErroData from '@/app/[locale]/components/common/ErroData';
import TarifarioConvenido from '@/app/api/models/proyecto/TarifarioConvenido';
import { Constantes } from '@/app/api/models/common/Constantes';
import { Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa6';
import { EditAction } from '../../../admin/professionals/ProfessionalsActions';
import TableMaterialUI from '../../../common/TablaMaterialUi';
import Utils from '@/app/api/models/common/Utils';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function TarifarioSearch({ t, idService, tarifarios }) {
  const url = `${tarifarioGetByIdProyectoApiUrl}/${idService}`;
  const [error, setError] = useState(false);
  const [tabla, setTabla] = useState([]);

  // const getData = async () => {
  //   try {
  //     fetchData(url).then((result) => {
  //       const tarifarios = result.data?.map((item) => ({
  //         tcId: item.tcId,
  //         tcMoneda: item.moneda.monNombre,
  //         tcPerfilAsignado: item.perfil.prf_Nombre,
  //         tcTarifa: item.tcTarifa,
  //         tcBase:
  //           Constantes.generarOpcionesDeTiempo(t).find(
  //             (option) => option.value === item.tcBase
  //           )?.label || 'N/A',
  //       }));
  //       setTabla(tarifarios);
  //     });
  //   } catch (error) {
  //     setError(true);
  //   }
  // };
  const columns = useMemo(() => TarifarioConvenido.createColumns(t), [t]);
  const memoizedSoporteActions = useMemo(() => {
    return tarifarios.map((item) => ({
      ...item,
      actions: (
        <>
          <Button size="sm" variant="link">
            <FaTrash
              size={16}
              className=""
              onClick={() => {
                handleDelete(item.tcId, t, '', `${tarifarioApiUrl}`);
                EditAction();
              }}
            />
          </Button>
        </>
      ),
    }));
  }, [tarifarios, t]);
  if (error) return <ErroData message={t.Common.errorMsg} />;
  return (
    <>
      {tarifarios.length === 0 ? ( // Verifica si no hay datos
        <div className="text-center justify-content-center align-items-center">
          <h4>{t.Ficha.business}</h4> {t.Common.noData}
        </div>
      ) : (
        <MemoizedTableMaterialUI
          columns={columns}
          data={memoizedSoporteActions}
        />
      )}
    </>
  );
}

export default TarifarioSearch;
