'use client';
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ColumnDef,
  MRT_Localization,
} from 'material-react-table';
import { useLocale } from 'next-intl';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { usePathname } from 'next/navigation';

interface Props<T> {
  columns: MRT_ColumnDef<T>[];
  data: T[];
}

const generateTableId = (columns) => {
  return columns.map((col) => col.accessorKey || col.header).join('-');
};

function TableMaterialUI<T>({ columns, data }: Props<T>) {
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const localization = useMemo<MRT_Localization>(() => {
    switch (locale) {
      case 'es':
        return require('material-react-table/locales/es').MRT_Localization_ES;
      case 'en':
        return require('material-react-table/locales/en').MRT_Localization_EN;
      case 'br':
        return require('material-react-table/locales/pt-BR')
          .MRT_Localization_BR;
      default:
        return require('material-react-table/locales/en').MRT_Localization_EN;
    }
  }, [locale]);

  const pathName = usePathname();
  const tableId = generateTableId(columns);
  const filterKey = `${pathName}-${tableId}-table-filters`;
  const globalFilterKey = `${pathName}-${tableId}-global-filter`;

  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  // Cargar filtros iniciales desde localStorage al montar el componente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedColumnFilters = localStorage.getItem(filterKey);
      const savedGlobalFilter = localStorage.getItem(globalFilterKey);
      try {
        setColumnFilters(
          savedColumnFilters ? JSON.parse(savedColumnFilters) : []
        );
        setGlobalFilter(savedGlobalFilter || '');
      } catch (error) {
        console.error('Error parsing saved filters:', error);
      }
    }
  }, [filterKey, globalFilterKey]);

  // Guardar filtros en localStorage de manera controlada con debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(filterKey, JSON.stringify(columnFilters));
        } catch (error) {
          console.error('Error saving column filters:', error);
        }
      }
    }, 300); // Guardar después de 300ms

    return () => {
      clearTimeout(handler); // Limpiar timeout previo
    };
  }, [columnFilters, filterKey]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(globalFilterKey, globalFilter || '');
        } catch (error) {
          console.error('Error saving global filter:', error);
        }
      }
    }, 300); // Guardar después de 300ms

    return () => {
      clearTimeout(handler); // Limpiar timeout previo
    };
  }, [globalFilter, globalFilterKey]);

  const table = useMaterialReactTable<T>({
    columns,
    data,
    localization,
    //manualFiltering: true, // Evita el filtrado automático
    initialState: {
      density: 'compact',
      columnFilters,
      globalFilter,
      showColumnFilters: false,
      showGlobalFilter: true,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
  });

  const handleExportRows = useCallback(
    (rows: any[]) => {
      const doc = new jsPDF();
      const tableHeaders = columns.map((c) => c.header);
      const tableData = rows.map((row) =>
        columns.map((col) => row.original[col.accessorKey] || '')
      );

      doc.setFontSize(22);
      doc.text('Mi Tabla', 15, 15);
      autoTable(doc, {
        startY: 30,
        head: [tableHeaders],
        body: tableData,
      });

      doc.save('tabla.pdf');
    },
    [columns]
  );

  const handleExportAllRows = () => {
    handleExportRows(table.getPrePaginationRowModel().rows);
  };

  const handleExportPageRows = () => {
    handleExportRows(table.getRowModel().rows);
  };

  return (
    <>
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
          onClick={handleExportAllRows}
          startIcon={<FileDownloadIcon />}
        >
          {t.Export.exportAllRows}
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          onClick={handleExportPageRows}
          startIcon={<FileDownloadIcon />}
        >
          {t.Export.exportPageRows}
        </Button>
      </Box>
      <Box sx={{ position: 'relative', zIndex: 0 }}>
        <MaterialReactTable table={table} />
      </Box>
    </>
  );
}

export default TableMaterialUI;
