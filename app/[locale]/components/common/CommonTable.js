"use client";
import React from "react";
import Swal from 'sweetalert2';
import { useTable, useGlobalFilter } from "react-table";
import { Card, Table, Container, Button } from "react-bootstrap";
import { FaTrash, FaBuilding, FaEdit, FaEye } from "react-icons/fa";
import { handleDelete } from "@/app/[locale]/components/common/DeleteSweet";
const TableResponsive = ({ data, columns, title, search }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );
  const onDeleteItem = () => {
    // Llama a la función handleDelete y pasa el nombre del item y la función onDelete como argumentos
    handleDelete("assd", "onDelete");
  };
  const { globalFilter } = state;
  
  return (
    <>
      <Container>
        {/* Contenedor para el título y el campo de búsqueda */}
        <div className="row align-items-center mb-2 mt-2">
          <h3 className="col-sm-8">{title}</h3>
          {/* Título */}
          <div className="col-sm-4">
            {/* Campo de búsqueda estilizado con Bootstrap */}
            <input
              type="text"
              className="form-control custom-input "
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder={search}
            />
          </div>
        </div>
        {/* Tabla */}
        <Table {...getTableProps()} responsive striped shadow border>
          <thead className="table-dark">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, index) => (
                    <td {...cell.getCellProps()} key={index}>
                      {cell.render("Cell")}
                      {index === row.cells.length - 1 && ( // Verificar si es la última celda
                        <div>
                          <Button
                            variant="link"
                          >
                            <FaEye size={14} className="text-primary"/>
                          </Button>
                          <Button
                            variant="link"
                            size="sm"
                          >
                            <FaBuilding className="custom-icon" />
                          </Button>
                          <Button size="sm" variant="link">
                            <FaEdit  size={14}/>
                          </Button>
                          <Button size="sm" variant="link"  onClick={onDeleteItem}>
                            <FaTrash size={10} />
                          </Button>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default TableResponsive;
