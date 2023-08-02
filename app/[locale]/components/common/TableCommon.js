"use client";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Table, Container } from "react-bootstrap";

const TableComponent = ({ data, columns, title, search, noResultsFound,actions,idioma }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5); // Valor inicial de filas por página

  // Lógica para filtrar los datos en base al término de búsqueda.
  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Lógica para cambiar de página.
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Lógica para manejar el cambio en el término de búsqueda.
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); // Reiniciar la página cuando se realice una nueva búsqueda.
  };

  // Lógica para manejar el cambio en el número de filas por página.
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(0); // Reiniciar la página cuando se cambie el número de filas por página.
  };
  // Lógica para calcular el índice inicial y final de los elementos a mostrar en la página actual.
  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredData.slice(offset, offset + itemsPerPage);

  // Lógica para verificar si no se encontraron datos con el término de búsqueda
  const noDataFound = currentPageData.length === 0 && searchTerm !== "";

  // Lógica para calcular el índice inicial y final de los elementos a mostrar en la página actual.
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);

  return (
    <Container>
        {/* Renderizar el buscador */}
        <div className="row align-items-center mb-2 mt-2">
          <h3 className="col-sm-4">{title}</h3>
          <div className="col-sm-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={search}
              className="form-control"
            />
          </div>
          <div className="d-flex col-sm-4">
            <div className="col-sm-10"></div>
            <div className="col-sm-2">
              {/* Menú desplegable para cambiar el número de filas por página */}
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="form-control "
              >
                {[5, 10, 20, 30].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* Renderizar la tabla */}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.title}</th>
              ))}
              {actions && <th>{idioma}</th>}
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((item, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={`${item.id}-${column.key}`}>{item[column.key]}</td>
                ) )}
                 {actions && <td>{actions}</td>}
              </tr>
            ))}
          </tbody>
        </Table>
        {/* Mostrar mensaje si no se encontraron datos */}
        {noDataFound && (
          <div className="text-center mt-3 mb-3">{noResultsFound}</div>
        )}
        <div className="d-flex justify-content-center">
          {/* Renderizar la paginación */}
          <ReactPaginate
            previousLabel={<span aria-hidden="true">&laquo;</span>}
            nextLabel={<span aria-hidden="true">&raquo;</span>}
            breakLabel={"..."}
            pageCount={Math.ceil(filteredData.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            nextClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
          />
        </div>
    </Container>
  );
};

export default TableComponent;
