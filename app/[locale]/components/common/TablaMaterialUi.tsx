import React, { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ColumnDef,
  MRT_TableInstance,
  MRT_Localization,
} from 'material-react-table';
import { FaCheck } from 'react-icons/fa';
import { useLocale } from "next-intl";
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
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
        .filter((column) => column.accessorKey !== 'actions') // Excluir la columna "actions"
        .map((column) => {
          const cellValue = row.original[column.accessorKey];
          return typeof cellValue === 'object' ? JSON.stringify(cellValue) : cellValue;
        })
    );

    const filteredHeaders = tableHeaders.filter((header, index) => columns[index].accessorKey !== 'actions');

    autoTable(doc, {
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
