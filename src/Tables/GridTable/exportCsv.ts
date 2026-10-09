import type { Column, GridTableExportCsvConfig, GridTableExportXlsConfig } from './GridTable.types';
import { getCellValue, getColumnHeaderLabel, isActionsColumn, primitiveString } from './GridTable.utils';

const UTF8_BOM = '\uFEFF';

function escapeCsvCell(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function getExportMatrix<T>(rows: T[], columns: Column<T>[]): { headers: string[]; values: string[][] } {
  const exportable = columns.filter((column) => !isActionsColumn(column));
  return {
    headers: exportable.map((column) => getColumnHeaderLabel(column)),
    values: rows.map((row) => exportable.map((column) => primitiveString(getCellValue(row, column)))),
  };
}

export function buildCsv<T>(
  rows: T[],
  columns: Column<T>[],
  options: GridTableExportCsvConfig = {}
): string {
  const utf8Bom = options.utf8Bom !== false;
  const { headers, values } = getExportMatrix(rows, columns);
  const body = [headers, ...values].map((line) => line.map(escapeCsvCell).join(',')).join('\n');
  return utf8Bom ? `${UTF8_BOM}${body}` : body;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function xlsCell(value: string): string {
  const numeric = value.trim() !== '' && Number.isFinite(Number(value));
  return numeric
    ? `<Cell><Data ss:Type="Number">${Number(value)}</Data></Cell>`
    : `<Cell><Data ss:Type="String">${escapeXml(value)}</Data></Cell>`;
}

/** SpreadsheetML 2003 workbook; opens in Excel, Numbers and LibreOffice without a dependency. */
export function buildXls<T>(rows: T[], columns: Column<T>[]): string {
  const { headers, values } = getExportMatrix(rows, columns);
  const lines = [headers, ...values].map((line) => `<Row>${line.map(xlsCell).join('')}</Row>`).join('');
  return [
    '<?xml version="1.0"?>',
    '<?mso-application progid="Excel.Sheet"?>',
    '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">',
    `<Worksheet ss:Name="Sheet1"><Table>${lines}</Table></Worksheet>`,
    '</Workbook>',
  ].join('\n');
}

function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  if (typeof URL.revokeObjectURL === 'function') {
    URL.revokeObjectURL(url);
  }
}

export function downloadCsv(content: string, filename: string): void {
  downloadFile(content, filename, 'text/csv;charset=utf-8;');
}

export function downloadXls(content: string, filename: string): void {
  downloadFile(content, filename, 'application/vnd.ms-excel');
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

export function exportRowsToXls<T>(
  rows: T[],
  columns: Column<T>[],
  options: GridTableExportXlsConfig = {}
): string {
  const content = buildXls(rows, columns);
  downloadXls(content, options.filename ?? 'export.xls');
  return content;
}
