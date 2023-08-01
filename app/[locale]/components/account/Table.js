'use client'
import React from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import { Card, Table } from 'react-bootstrap';


const TableResponsive = ({ data, columns, title,search }) => {
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

  const { globalFilter } = state;

  return (
    
    <Card className='mb-3'>
      <Card.Header>
        {/* Contenedor para el título y el campo de búsqueda */}
        <div className=' row align-items-center'>
          <h3 className='col-sm-8'>{title}</h3>
          {/* Título */}
          <div className='col-sm-4'>
            {/* Campo de búsqueda estilizado con Bootstrap */}
            <input
              type="text"
              className="form-control custom-input "
              value={globalFilter || ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder={search}
            />
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        {/* Tabla */}
        <Table {...getTableProps()} responsive>
          <thead className='table-dark'>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default TableResponsive;
