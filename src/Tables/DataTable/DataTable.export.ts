import type { DataTableColumn } from './DataTable.types';
import { getCellValue } from './DataTable.utils';

export function toExportText(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

export function getColumnHeaderText<T>(column: DataTableColumn<T>): string {
  if (typeof column.title === 'string' || typeof column.title === 'number') {
    return String(column.title);
  }
  return column.id;
}

export function getExportRows<T>(
  columns: DataTableColumn<T>[],
  rows: T[]
): { headers: string[]; values: string[][] } {
  const headers = columns.map((column) => getColumnHeaderText(column));
  const values = rows.map((row) =>
    columns.map((column) => toExportText(getCellValue(row, column)))
  );
  return { headers, values };
}

export function escapeCsvValue(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function buildCsv(headers: string[], values: string[][]): string {
  const lines = [headers, ...values].map((row) => row.map(escapeCsvValue).join(','));
  return `\uFEFF${lines.join('\r\n')}`;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function excelCell(value: string): string {
  const numeric = value.trim() !== '' && Number.isFinite(Number(value));
  const type = numeric ? 'Number' : 'String';
  const content = numeric ? String(Number(value)) : escapeXml(value);
  return `<Cell><Data ss:Type="${type}">${content}</Data></Cell>`;
}

export function buildExcelXml(headers: string[], values: string[][]): string {
  const headerRow = `<Row>${headers.map(excelCell).join('')}</Row>`;
  const dataRows = values.map((row) => `<Row>${row.map(excelCell).join('')}</Row>`).join('');
  return `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Worksheet ss:Name="Sheet1">
  <Table>
   ${headerRow}
   ${dataRows}
  </Table>
 </Worksheet>
</Workbook>`;
}

export function downloadFile(content: BlobPart, fileName: string, mimeType: string): void {
  const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadCsv(headers: string[], values: string[][], fileName: string): void {
  downloadFile(buildCsv(headers, values), fileName, 'text/csv;charset=utf-8');
}

export function downloadXls(headers: string[], values: string[][], fileName: string): void {
  downloadFile(
    buildExcelXml(headers, values),
    fileName,
    'application/vnd.ms-excel'
  );
}
