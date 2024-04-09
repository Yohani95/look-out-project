import React from "react";
import {
  FaTrash,
  FaEdit,
  FaEye,
  FaFileDownload,
  FaUserPlus,
  FaUserClock,
  FaRegClock
} from "react-icons/fa";
import { Button } from "react-bootstrap";
import { Tooltip } from "react-tooltip";
import { useRouter } from "next/navigation";
import ConfirmationDialog from "@/app/[locale]/components/common/ConfirmationDialog";
function SupportButtons({ t,proyecto}) {
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
      push(`/business/Support/contract/edit/${id}`);
    }
  };
  return (
    <>
      <Button size="sm" variant="link" onClick={()=>{router.push(`/business/Support/contract/addHour/${proyecto.pryId}`)}}>
        <FaRegClock size={16}  className="my-anchor-user"  />
        <Tooltip anchorSelect=".my-anchor-user" place="top">
        {t?.Common.add} {t?.Common.hour}
        </Tooltip>
      </Button>
      <Button size="sm" variant="link" onClick={()=>handleEdit(proyecto.pryId,t,router.push)}>
        <FaEdit size={16}  className="my-anchor-element" />
        <Tooltip anchorSelect=".my-anchor-element" place="top">
          {t?.Common.edit} 
        </Tooltip>
      </Button>
      {/* <Button size="sm" variant="link">
        <FaFileDownload size={16}  className="my-anchor-documento"/>
        <Tooltip anchorSelect=".my-anchor-documento" place="top">
          {t?.Common.downloadFile} 
        </Tooltip>
      </Button> */}
      <Button size="sm" variant="link">
        <FaTrash size={16} className=""  />
      </Button>
    </>
  );
}

export default SupportButtons;
