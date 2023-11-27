"use client";
import React, { useEffect, useState } from "react";
import {
  tarifarioGetByIdProyectoApiUrl,
  tarifarioApiUrl,
} from "@/app/api/apiConfig";
import { fetchData, handleDelete } from "@/app/[locale]/utils/Form/UtilsForm";
import ErroData from "@/app/[locale]/components/common/ErroData";
import TarifarioConvenido from "@/app/api/models/proyecto/TarifarioConvenido";
import TableCommon from "../../../common/TableCommon";
import { Constantes } from "@/app/api/models/common/Constantes";
import { Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa6";
import { revalidatePath } from "next/cache";
import { EditAction } from "../../../admin/professionals/ProfessionalsActions";
function TarifarioSearch({ t, idService, tarifarios }) {
  const url = `${tarifarioGetByIdProyectoApiUrl}/${idService}`;
  const [error, setError] = useState(false);
  const [tabla, setTabla] = useState([]);
  const columns = [
    { title: "Id", key: "tcId" },
    { title: t.business.assignedProfile, key: "tcPerfilAsignado" },
    { title: t.Common.fee, key: "tcTarifa" },
    { title: t.Common.currency, key: "tcMoneda" },
    { title: t.Common.base, key: "tcBase" },
    {
      title: "Acciones", // Título de la columna de acciones
      key: "actions",
      render: (item) => (
        <Button size="sm" variant="link">
          <FaTrash
            size={16}
            className=""
            onClick={() => {
              handleDelete(item.tcId, t, "", `${tarifarioApiUrl}`);
              EditAction();
            }}
          />
        </Button>
      ),
    },
  ];
  const getData = async () => {
    try {
      fetchData(url).then((result) => {
        const tarifarios = result.data?.map((item) => ({
          tcId: item.tcId,
          tcMoneda: item.moneda.monNombre,
          tcPerfilAsignado: item.perfil.prf_Nombre,
          tcTarifa: item.tcTarifa,
          tcBase:
            Constantes.generarOpcionesDeTiempo(t).find(
              (option) => option.value === item.tcBase
            )?.label || "N/A",
        }));
        setTabla(tarifarios);
      });
    } catch (error) {
      setError(true);
    }
  };

  if (error) return <ErroData message={t.Common.errorMsg} />;
  return (
    <>
      {tarifarios.length === 0 ? ( // Verifica si no hay datos
        <div className="text-center justify-content-center align-items-center">
          <h4>{t.Ficha.business}</h4> {t.Common.noData}
        </div>
      ) : (
        <TableCommon
          columns={columns}
          noResultsFound={t.Common.noResultsFound}
          data={tarifarios}
          title={t.Ficha.business}
          search={t.Account.table.search}
        />
      )}
    </>
  );
}

export default TarifarioSearch;
