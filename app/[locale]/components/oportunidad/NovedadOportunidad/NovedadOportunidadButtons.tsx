import React from 'react'
import {
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import { Button } from "react-bootstrap";
import { Tooltip } from "react-tooltip";
import { useRouter } from "next/navigation";
import ConfirmationDialog from "@/app/[locale]/components/common/ConfirmationDialog";
import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import { deleteNovedadOportunidad } from '@/app/actions/Oportunidad/NovedadOportunidadActions';
function NovedadOportunidadButtons({ t, novedad }) {
    const router = useRouter();
    const handleEdit = async (id, trans, push) => {
      const confirmed = await ConfirmationDialog(
        trans.notification.edit.title,
        trans.notification.edit.text,
        trans.notification.edit.type,
        trans.notification.edit.buttonOk,
        trans.notification.edit.buttonCancel
      );
      if (confirmed) {
        push(`/opportunities/edit/${novedad.idOportunidad}/events/edit/${novedad.id}`)
      }
    };
    const handleDelete = async () => {
      const confirmed = await ConfirmationDialog(
        t.notification.deleting.title,
        t.notification.deleting.text,
        t.notification.deleting.type,
        t.notification.deleting.buttonOk,
        t.notification.deleting.buttonCancel
      );
      if (confirmed) {
        await NotificationSweet({
          title: t.notification.loading.title,
          text: "",
          type: t.notification.loading.type,
          showLoading: true,
        });
  
        await deleteNovedadOportunidad(novedad.id).then(async (res) => {
          NotificationSweet({
            title: t.notification.Deleted.title,
            text: t.notification.Deleted.text,
            type: t.notification.Deleted.type,
          });
        }).catch((err) => {
          NotificationSweet({
            title: t.notification.error.title,
            text: t.notification.error.text,
            type: t.notification.error.type,
          });
        });
      }
    };
    return (
        <>
      <Button size="sm" variant="link" onClick={() => handleEdit(novedad.id, t, router.push)}>
        <FaEdit size={16} className="my-anchor-element" />
        <Tooltip anchorSelect=".my-anchor-element" place="top">
          {t?.Common.edit}
        </Tooltip>
      </Button>
      <Button size="sm" className='' variant="link" onClick={() => handleDelete()}>
        <FaTrash size={16} className="" />
      </Button>
    </>
  )
}

export default NovedadOportunidadButtons