import React from "react";
import {
  FaTrash,
  FaEdit,
  FaEye,
  FaFileDownload,
  FaUserPlus,
} from "react-icons/fa";
import { Button } from "react-bootstrap";
import { Tooltip } from "react-tooltip";
function SupportButtons({ t,proyecto}) {
  return (
    <>
      <Button variant="link">
        <FaUserPlus size={16}  className="my-anchor-user"  />
        <Tooltip anchorSelect=".my-anchor-user" place="top">
        {t?.Common.add} {t?.Common.professionals}
        </Tooltip>
      </Button>
      <Button size="sm" variant="link">
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
