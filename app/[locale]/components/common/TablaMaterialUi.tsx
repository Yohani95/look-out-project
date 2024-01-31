"use client"
import React, { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ColumnDef,
  MRT_TableInstance,
  MRT_Localization,
} from 'material-react-table';
import { useLocale } from "next-intl";
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import LOGO from "@/public/images/logo.png";
interface Props<T> {
  columns: MRT_ColumnDef<T>[];
  data: T[];
}

function TableMaterialUI<T>({ columns, data }: Props<T>) {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const localization = useMemo<MRT_Localization>(() => {
    let chosenLocalization;

    switch (locale) {
      case 'es':
        chosenLocalization = require('material-react-table/locales/es').MRT_Localization_ES;
        break;
      case 'en':
        chosenLocalization = require('material-react-table/locales/en').MRT_Localization_EN;
        break;
      case 'br':
        chosenLocalization = require('material-react-table/locales/pt-BR').MRT_Localization_BR;
        break;
      default:
        // Default to English or another default language if needed
        chosenLocalization = require('material-react-table/locales/en').MRT_Localization_EN;
        break;
    }

    return chosenLocalization;
  }, [locale]);

  const handleExportRows = (rows: any[]) => {
    const doc = new jsPDF();
    const tableHeaders = columns.map((c) => c.header);
    const tableData = rows.map((row) =>
    columns
      .filter((column) => {
        // Excluir la columna "actions", las columnas que contienen objetos y las columnas '_documento'
        const cellValue = row.original[column.accessorKey];
        return column.accessorKey !== 'actions' && !(typeof cellValue === 'object');
      })
      .map((column) => row.original[column.accessorKey]) // No necesitas verificar si cellValue es un objeto aquí, ya que ya lo has excluido en el filtro
  );
  
  const filteredHeaders = tableHeaders.filter((header, index) => {
    const accessorKey = columns[index].accessorKey;
    // Excluir si el accessorKey es 'actions' o '_documento'
    if (accessorKey === 'actions') {
      return false;
    }
    // Excluir si alguna de las filas contiene un objeto en esta columna
    for (const row of rows) {
      if (typeof row.original[accessorKey] === 'object') {
        return false;
      }
    }
    // Incluir la columna si no se excluyó por las razones anteriores
    return true;
  });
    // Agregar el título de la empresa
    doc.setFontSize(22);
    //console.log(LOGO.src);
    //doc.addImage(LOGO.src, 'PNG', 15, 15, 30, 30);
    doc.text('KPAZ', 15, 15);
  
    // Agregar la fecha de emisión
    doc.setFontSize(14);
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    doc.text(`Fecha de emisión: ${formattedDate}`, 15, 25);
  
    autoTable(doc, {
      startY: 30, // Asegúrate de que la tabla comienza debajo del encabezado y la fecha de emisión
      head: [filteredHeaders],
      body: tableData,
    });
    doc.save('my-table.pdf');
  };

  const Table = () => {
    const table = useMaterialReactTable<T>({
      columns,
      data: data,
      localization,
      initialState: { density: 'compact' },
      renderTopToolbarCustomActions: ({ table }) => (
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            padding: '8px',
            flexWrap: 'wrap',
          }}
        >
          <Button
            disabled={table.getPrePaginationRowModel().rows.length === 0}
            onClick={() =>
              handleExportRows(table.getPrePaginationRowModel().rows)
            }
            startIcon={<FileDownloadIcon />}
          >
            {t.Export.exportAllRows}
          </Button>
          <Button
            disabled={table.getRowModel().rows.length === 0}
            onClick={() => handleExportRows(table.getRowModel().rows)}
            startIcon={<FileDownloadIcon />}
          >
            {t.Export.exportPageRows}
          </Button>
          {/* <Button
                disabled={
                  !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                }
                onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                startIcon={<FileDownloadIcon />}
              >
                Export Selected Rows
              </Button> */}
        </Box>
      ),
    });

    return <MaterialReactTable table={table} />;
  };

  return <Table />;
}
export default TableMaterialUI;
