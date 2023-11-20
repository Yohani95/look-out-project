"use client";
import React from "react";
import { useRouter } from "next/navigation";
import TableCommon from "@/app/[locale]/components/common/TableCommon";
import Persona from "@/app/api/models/admin/Persona";
import { handleEditProfessional } from "@/app/[locale]/utils/person/UtilsPerson";
import ActionButtons from "../../contact/ActionButtons";
import { EditAction } from "./ProfessionalsActions";
async function ProfesionalsSearch({ data, locale }) {
  EditAction()
  const t = require(`@/messages/${locale}.json`);
  const router = useRouter();
  const columns = [
    {
      key: "id",
      title: "ID",
    },
    { key: "perNombres", title: t.Common.name },
    { key: "perIdNacional", title: t.Common.rut },
    {
      title: t.Account.action,
      key: "actions",
      render: (item) => (
        <ActionButtons
          //onDelete={() => handleDelete(item.id, t)}
          onEdit={() => handleEditProfessional(item.id, t, router.push)}
          onView={() => {router.push(`/admin/professional/view/${item.id}`)}}
        />
      ),
    },
  ];
  const personas = data?.map((persona) => ({
    ...new Persona(persona), // Instancia una nueva Persona con los datos existentes
    perNombres: new Persona(persona).getNombreCompleto(),
  }));
  return (
    <>
      {personas && personas.length > 0 ? (
        <TableCommon
          columns={columns}
          noResultsFound={t.Common.noResultsFound}
          data={personas}
          title={t.Common.professionals}
          search={t.Account.table.search}
        />
      ) : (
        <div className="text-center justify-content-center align-items-center">
          <h4>{t.Common.professionals}</h4> {t.Common.noData}
        </div>
      )}
    </>
  );
}
export default ProfesionalsSearch;
