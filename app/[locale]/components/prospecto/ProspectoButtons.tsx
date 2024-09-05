'use client';
import React from 'react';
import { FaTrash, FaEdit, FaEye, FaHeadset, FaUsers } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip';
import { useRouter } from 'next/navigation';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import Utils from '@/app/api/models/common/Utils';
import { deleteProspecto } from '@/app/actions/prospecto/ProspectoActions';
import ConfirmationDialog from '@/app/[locale]/components/common/ConfirmationDialog';
function ProspectoButtons({ t, prospecto }) {
  const router = useRouter();
  const handleEdit = async () => {
    const confirmed = await Utils.showConfirmationDialogEdit(t);
    if (confirmed) {
      router.push(`/prospect/edit/${prospecto.id}`);
    }
  };
  const handleDelete = async () => {
    const confirmed = await Utils.showConfirmationDialogDelete(t);
    if (confirmed) {
      await deleteProspecto(prospecto.id)
        .then((res) => {
          NotificationSweet({
            title: t.notification.Deleted.title,
            text: t.notification.Deleted.text,
            type: t.notification.Deleted.type,
          });
        })
        .catch((err) => {
          Utils.handleErrorNotification(t);
        });
    }
  };
  const handleCall = async () => {
    const confirmed = await Utils.showConfirmationDialogCall(t);
    if (confirmed) {
      router.push(`/prospect/contact/${prospecto.id}`);
    }
  };
  const handleMeeting = async () => {
    const confirmed = await ConfirmationDialog(
      t.notification.call.title,
      ` ${t.Common.add} ${t.Common.meeting}`,
      t.notification.call.type,
      t.notification.call.buttonOk,
      t.notification.call.buttonCancel
    );
    if (confirmed) {
      router.push(`/prospect/meeting/${prospecto.id}`);
    }
  };
  return (
    <>
      <Button size="sm" variant="link" onClick={() => handleEdit()}>
        <FaEdit size={16} className="my-anchor-element" />
        <Tooltip anchorSelect=".my-anchor-element" place="top">
          {t?.Common.edit}
        </Tooltip>
      </Button>
      <Button size="sm" variant="link" onClick={() => handleCall()}>
        <FaHeadset size={18} className="my-anchor-call" />
        <Tooltip anchorSelect=".my-anchor-call" place="top">
          {t?.Common.activity}
        </Tooltip>
      </Button>
      <Button size="sm" variant="link" onClick={() => handleMeeting()}>
        <FaUsers size={18} className="my-anchor-meeting" />
        <Tooltip anchorSelect=".my-anchor-meeting" place="top">
          {t?.Common.meeting}
        </Tooltip>
      </Button>
      <Button size="sm" variant="link" onClick={() => handleDelete()}>
        <FaTrash size={16} className="" />
      </Button>
    </>
  );
}

export default ProspectoButtons;
