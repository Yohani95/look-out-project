import React from 'react';
import {
  FaTrash,
  FaEdit,
  FaEye,
  FaFileDownload,
  FaUserPlus,
} from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip';
function ServiceButtons({ id, onDelete, onEdit, onView, downloadFile, t }) {
  const editId = `edit-tooltip-${id}`;
  const userId = `user-tooltip-${id}`;
  const documentoId = `documento-tooltip-${id}`;
  return (
    <>
      <Button variant="link">
        <FaUserPlus size={16} onClick={onView} className={userId} />
        <Tooltip anchorSelect={`.${userId}`} place="top">
          {t?.Common.add} {t?.Common.professionals}
        </Tooltip>
      </Button>
      <Button size="sm" variant="link">
        <FaEdit size={16} onClick={onEdit} className={editId} />
        <Tooltip anchorSelect={`.${editId}`} place="right">
          {t?.Common.edit}
        </Tooltip>
      </Button>
      <Button size="sm" variant="link">
        <FaFileDownload
          size={16}
          onClick={downloadFile}
          className={documentoId}
        />
        <Tooltip anchorSelect={`.${documentoId}`} place="right">
          {t?.Common.downloadFile}
        </Tooltip>
      </Button>
      <Button size="sm" variant="link">
        <FaTrash size={16} className="" onClick={onDelete} />
      </Button>
    </>
  );
}

export default ServiceButtons;
