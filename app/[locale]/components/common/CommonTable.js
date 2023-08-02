"use client";
import React from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { Card, Table, Container, Button } from "react-bootstrap";
import { FaTrash, FaBuilding, FaEdit, FaEye } from "react-icons/fa";
import { handleDelete } from "@/app/[locale]/components/common/DeleteSweet";
const TableResponsive = ({ data, columns, title, search }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
        nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    gotoPage,
    pageSize,
    setPageSize
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 10, // Initial page size (number of items per page)
      },
    },
    useGlobalFilter,
    usePagination
  );
  const onDeleteItem = () => {
    // Llama a la función handleDelete y pasa el nombre del item y la función onDelete como argumentos
    handleDelete("assd", "onDelete");
  };
  const { globalFilter } = state;
  const columnsWithButtons = [
    ...columns,
    {
      Header: "Acciones",
      accessor: "actions",
      Cell: ({ row }) => (
        <div>
          <Button variant="link">
            <FaEye size={14} className="text-primary" />
          </Button>
          <Button variant="link" size="sm">
            <FaBuilding className="custom-icon" />
          </Button>
          <Button size="sm" variant="link">
            <FaEdit size={14} />
          </Button>
          <Button size="sm" variant="link" onClick={() => onDeleteItem(row)}>
            <FaTrash size={10} />
          </Button>
        </div>
      ),
    },
  ];
    const pageIndex = state.pageIndex || 0;
  const pageLimit = 10;
  return (
    <>
      <Container>
        {/* Contenedor para el título y el campo de búsqueda */}
        <div className="row align-items-center mb-2 mt-2">
          <h3 className="col-sm-4">{title}</h3>
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
          <div className="col-sm-1">
      {/* Pagination size options */}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
              className="form-control"
            >
              {[10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Tabla */}
        <Table {...getTableProps()} responsive striped bordered hover>
            <thead className="table-dark">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell, cellIndex) => (
                      <td {...cell.getCellProps()} key={cellIndex}>
                        {cell.render("Cell")}
                        {cellIndex === row.cells.length - 1 && ( // Verificar si es la última celda
                          <div>
                            <Button variant="link">
                              <FaEye size={14} className="text-primary" />
                            </Button>
                            <Button variant="link" size="sm">
                              <FaBuilding className="custom-icon" />
                            </Button>
                            <Button size="sm" variant="link">
                              <FaEdit size={14} />
                            </Button>
                            <Button size="sm" variant="link" onClick={onDeleteItem}>
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
  {/* Bootstrap Pagination */}
  <div className="d-flex justify-content-center">
            <Button
              variant="link"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className="mr-2 text-decoration-none"
            >
              {"<<"}
            </Button>
            <Button
              variant="link"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="mr-2 text-decoration-none"
            >
              Anterior
            </Button>
            <Button
              variant="link"
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="mr-2 text-decoration-none"
            >
              Siguiente
            </Button>
            <Button
              variant="link"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className="text-decoration-none"
            >
              {">>"}
            </Button>
          </div>
      </Container>
    </>
  );
};

export default TableResponsive;
