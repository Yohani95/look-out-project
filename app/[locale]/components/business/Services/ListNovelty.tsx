'use client';
import React, { useState, useEffect, useMemo } from 'react';
import LoadingData from '@/app/[locale]/components/common/LoadingData';
import ErroData from '@/app/[locale]/components/common/ErroData';
import TableCommon from '@/app/[locale]/components/common/TableCommon';
import Novedad from '@/app/api/models/proyecto/Novedad';
import { fetchData, handleDelete } from '@/app/[locale]/utils/Form/UtilsForm';
import { novedadApiUrl } from '@/app/api/apiConfig';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

import { useRouter } from 'next/navigation';
import { RefreshList } from '@/app/api/models/common/ActionsCommon';
import TableMaterialUI from '../../common/TablaMaterialUi';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function ListNovelty({ locale, idPersona, idProyecto, listaNovedades }) {
  //========DECLARACION DE VARIABLES ===============
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([new Novedad()]);
  const t = require(`@/messages/${locale}.json`);
  const router = useRouter();
  //========FIN DECLARACION DE VARIABLES ===============

  //=======SECCION DE USSEFFECT===============
  const fillData = () => {
    setData(listaNovedades);
  };
  useEffect(() => {
    fillData();
    setLoading(false);
  }, [listaNovedades]);
  //=======FIN SECCION DE USSEFFECT===============
  const columns = useMemo(() => {
    return [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'idPersona',
        header: t.user.idPerson,
        size: 100,
      },
      {
        accessorKey: 'idProyecto',
        header: t.facture.project,
        size: 100,
      },
      {
        accessorKey: 'fechaInicio',
        header: t.service.noveltyDate,
        size: 100,
      },
      {
        accessorKey: 'fechaHasta',
        header: t.service.dateTo,
        size: 100,
      },
      {
        accessorKey: 'IdPerfil',
        header: t.Common.profile,
        size: 100,
      },
      {
        accessorKey: 'idTipoNovedad',
        header: t.service.noveltyType,
        size: 100,
      },
      {
        accessorKey: 'observaciones',
        header: t.Common.observations,
        size: 150,
      },
      {
        accessorKey: 'actions',
        header: t.Account.action,
        size: 100,
      },
    ];
  }, [t]);
  const memoizedSoporteActions = useMemo(() => {
    return data.map((item) => ({
      ...item,
      actions: (
        <>
          <Button size="sm" variant="link">
            <FaEdit
              size={16}
              onClick={() => {
                router.push(
                  `/service/editNovelty/${item.idProyecto}/${item.idPersona}/${item.id}`
                );
              }}
            />
          </Button>
          <Button size="sm" variant="link">
            <FaTrash
              size={16}
              onClick={() => {
                handleDelete(item.id, t, RefreshList, `${novedadApiUrl}`);
              }}
            />
          </Button>
        </>
      ),
    }));
  }, [data, t]);
  if (isLoading) return <LoadingData loadingMessage={t.Common.loadingData} />;
  if (error) return <ErroData message={t.Common.errorMsg} />;
  if (data.length === 0)
    return (
      <div className="text-center justify-content-center align-items-center">
        <h4>{t.Ficha.business}</h4> {t.Common.noData}
      </div>
    );
  return (
    <>
      <MemoizedTableMaterialUI
        columns={columns}
        data={memoizedSoporteActions}
      />
    </>
  );
}

export default ListNovelty;
