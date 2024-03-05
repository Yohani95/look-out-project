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
    // Función auxiliar para acceder a propiedades anidadas de forma segura
    const getNestedValue = (obj, accessorKey) => {
      return accessorKey.split('.').reduce((acc, key) => acc && acc[key] !== 'undefined' ? acc[key] : '', obj);
    };
    
    const getTextValue = (element) => {

      if (typeof element != 'object') {
        console.log(element)
        return element;
      }
      
      if (element.props && element.props.children) {
        const children = Array.isArray(element.props.children) ? element.props.children : [element.props.children];
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (typeof child === 'string') {
            console.log(child)
            return child.replace(/\\n/g, '\n'); // Reemplazar '\n' con salto de línea
          }
        }
      }
    };
    
    
    
    const tableData = rows.map((row) =>
      columns
        .filter((column) => {
          const cellValue = getNestedValue(row.original, column.accessorKey);
          return !(typeof cellValue === 'object' && (cellValue.isButton || cellValue.isDocumento)) && column.accessorKey !== 'actions';
        })
        .map((column) => {
          const cellValue = getNestedValue(row.original, column.accessorKey);
          const textValue = getTextValue(cellValue);
          return typeof cellValue === 'object' && !(cellValue.isButton || cellValue.isDocumento) ? (cellValue.girNombre || cellValue.eclNombre || '') : textValue;
        })
    );
    
    const filteredHeaders = tableHeaders.filter((header, index) => {
      const accessorKey = columns[index].accessorKey;
      return accessorKey !== 'actions' && !rows.some(row => typeof row.original[accessorKey] === 'object' && (row.original[accessorKey].isButton || row.original[accessorKey].isDocumento));
    });
    




    // Agregar el título de la empresa
    doc.setFontSize(22);
    //console.log(LOGO.src);
    //doc.addImage(LOGO.src, 'PNG', 15, 15, 30, 30);
    doc.setTextColor(47, 75, 206); // Color #2f4bce en RGB
    doc.text('KPAZ', 15, 15);
    doc.setTextColor(0); // Restaurar el color por defecto (negro)

    // Agregar la fecha de emisión
    doc.setFontSize(14);
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
    doc.text(`Fecha de emisión: ${formattedDate}`, 15, 25);

    autoTable(doc, {
      startY: 30, // Asegúrate de que la tabla comienza debajo del encabezado y la fecha de emisión
      head: [filteredHeaders],
      body: tableData,
    });
    
    doc.save(`Mi-Tabla-${formattedDate}.pdf`);
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
