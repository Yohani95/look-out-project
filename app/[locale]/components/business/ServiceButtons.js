import React from 'react'
import { FaTrash, FaEdit, FaEye,FaFileDownload } from "react-icons/fa";
import { Button } from "react-bootstrap";
function ServiceButtons({onDelete,onEdit,onView,downloadFile }) {
  return (
    <>
    <Button variant="link">
      <FaEye size={16} onClick={onView}/>
    </Button>
    <Button size="sm" variant="link">
      <FaEdit size={16} onClick={onEdit}/>
    </Button>
    <Button size="sm" variant="link" >
      <FaTrash size={16} className="" onClick={onDelete}/>
    </Button>
    <Button size="sm" variant="link" >
      <FaFileDownload title='descargar documento' size={16} onClick={downloadFile}/>
    </Button>
  </>
  )
}

export default ServiceButtons