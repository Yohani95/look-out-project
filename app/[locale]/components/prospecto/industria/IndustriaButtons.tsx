'use client';
import React from 'react';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip';
import { useRouter } from 'next/navigation';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import Utils from '@/app/api/models/common/Utils';
import { deleteIndustria } from '@/app/actions/prospecto/IndustriaActions';

function IndustriaButtons({ t, industria }) {
  const router = useRouter();

  const handleEdit = async () => {
    const confirmed = await Utils.showConfirmationDialogEdit(t);
    if (confirmed) {
      router.push(`/prospect/industry/edit/${industria.id}`);
    }
  };

  const handleDelete = async () => {
    const confirmed = await Utils.showConfirmationDialogDelete(t);
    if (confirmed) {
      await deleteIndustria(industria.id)
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

  return (
    <>
      <Button size="sm" variant="link" onClick={() => handleEdit()}>
        <FaEdit size={16} className="my-anchor-element" />
        <Tooltip anchorSelect=".my-anchor-element" place="top">
          {t?.Common.edit}
        </Tooltip>
      </Button>
      <Button size="sm" variant="link" onClick={() => handleDelete()}>
        <FaTrash size={16} />
      </Button>
    </>
  );
}

export default IndustriaButtons;
