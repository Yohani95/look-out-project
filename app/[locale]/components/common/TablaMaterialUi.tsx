'use client';
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ColumnDef,
  MRT_Localization,
  MRT_TableInstance,
} from 'material-react-table';
import { useLocale } from 'next-intl';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import LOGO from '@/public/images/logo.png';
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
  const tableId = generateTableId(columns); // Genera un ID único basado en las columnas
  const filterKey = `${pathName}-${tableId}-table-filters`;
  const globalFilterKey = `${pathName}-${tableId}-global-filter`;
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  // Cargar filtros iniciales desde localStorage
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

  // Guardar filtros en localStorage cuando cambian
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(globalFilterKey, globalFilter ? globalFilter : '');
      } catch (error) {
        console.error('Error saving global filter to localStorage:', error);
      }
    }
  }, [globalFilter, globalFilterKey]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(filterKey, JSON.stringify(columnFilters));
      } catch (error) {
        console.error('Error saving filters to localStorage:', error);
      }
    }
  }, [columnFilters, filterKey]);

  const handleExportRows = (rows: any[]) => {
    const doc = new jsPDF();
    const tableHeaders = columns.map((c) => c.header);

    const getNestedValue = (obj, accessorKey) => {
      return accessorKey
        .split('.')
        .reduce(
          (acc, key) => (acc && acc[key] !== 'undefined' ? acc[key] : ''),
          obj
        );
    };

    const getTextValue = (element) => {
      if (typeof element !== 'object') {
        return element;
      }

      if (element.props && element.props.children) {
        const children = Array.isArray(element.props.children)
          ? element.props.children
          : [element.props.children];
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (typeof child === 'string') {
            return child.replace(/\\n/g, '\n');
          }
        }
      }
    };

    const tableData = rows.map((row) =>
      columns
        .filter((column) => {
          const cellValue = getNestedValue(row.original, column.accessorKey);
          return (
            !(
              typeof cellValue === 'object' &&
              (cellValue.isButton || cellValue.isDocumento)
            ) && column.accessorKey !== 'actions'
          );
        })
        .map((column) => {
          const cellValue = getNestedValue(row.original, column.accessorKey);
          const textValue = getTextValue(cellValue);
          return typeof cellValue === 'object' &&
            !(cellValue.isButton || cellValue.isDocumento)
            ? cellValue.girNombre || cellValue.eclNombre || ''
            : textValue;
        })
    );

    const filteredHeaders = tableHeaders.filter((header, index) => {
      const accessorKey = columns[index].accessorKey;
      return (
        accessorKey !== 'actions' &&
        !rows.some(
          (row) =>
            typeof row.original[accessorKey] === 'object' &&
            (row.original[accessorKey].isButton ||
              row.original[accessorKey].isDocumento)
        )
      );
    });

    doc.setFontSize(22);
    doc.setTextColor(47, 75, 206);
    doc.text('KPAZ', 15, 15);
    doc.setTextColor(0);

    doc.setFontSize(14);
    const currentDate = new Date();
    const formattedDate = currentDate
      .toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\//g, '-');
    doc.text(`Fecha de emisión: ${formattedDate}`, 15, 25);

    autoTable(doc, {
      startY: 30,
      head: [filteredHeaders],
      body: tableData,
    });

    doc.save(`Mi-Tabla-${formattedDate}.pdf`);
  };

  const Table = () => {
    const table = useMaterialReactTable<T>({
      columns,
      data,
      localization,
      initialState: {
        density: 'compact',
        columnFilters,
        globalFilter,
        showColumnFilters: columnFilters.length > 0 ? true : false,
        showGlobalFilter: true,
      },
      state: {
        columnFilters,
        globalFilter,
      },
      onGlobalFilterChange: (newFilter) => setGlobalFilter(newFilter),
      onColumnFiltersChange: (newFilters) => setColumnFilters(newFilters),
    });

    // Use useCallback to avoid unnecessary re-renders
    const handleExportPageRows = useCallback(() => {
      handleExportRows(table.getRowModel().rows);
    }, [table]);

    const handleExportAllRows = useCallback(() => {
      handleExportRows(table.getPrePaginationRowModel().rows);
    }, [table]);

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
  };

  return <Table />;
}

export default TableMaterialUI;
