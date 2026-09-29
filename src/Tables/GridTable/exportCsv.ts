import type { Column, GridTableExportCsvConfig } from './GridTable.types';
import { getCellValue, getColumnHeaderLabel, isActionsColumn, primitiveString } from './GridTable.utils';

const UTF8_BOM = '\uFEFF';

function escapeCsvCell(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function buildCsv<T>(
  rows: T[],
  columns: Column<T>[],
  options: GridTableExportCsvConfig = {}
): string {
  const utf8Bom = options.utf8Bom !== false;
  const exportable = columns.filter((column) => !isActionsColumn(column));
  const header = exportable.map((column) => escapeCsvCell(getColumnHeaderLabel(column))).join(',');
  const lines = rows.map((row) =>
    exportable
      .map((column) => escapeCsvCell(primitiveString(getCellValue(row, column))))
      .join(',')
  );
  const body = [header, ...lines].join('\n');
  return utf8Bom ? `${UTF8_BOM}${body}` : body;
}

export function downloadCsv(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  if (typeof URL.revokeObjectURL === 'function') {
    URL.revokeObjectURL(url);
  }
}

export function exportRowsToCsv<T>(
  rows: T[],
  columns: Column<T>[],
  options: GridTableExportCsvConfig = {}
): string {
  const content = buildCsv(rows, columns, options);
  downloadCsv(content, options.filename ?? 'export.csv');
  return content;
}
