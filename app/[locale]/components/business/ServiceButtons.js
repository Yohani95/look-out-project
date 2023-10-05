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
      <FaFileDownload  size={16} onClick={downloadFile}/>
    </Button>
    <Button size="sm" variant="link" >
      <FaTrash size={16} className="" onClick={onDelete}/>
    </Button>
  </>
  )
}

export default ServiceButtons