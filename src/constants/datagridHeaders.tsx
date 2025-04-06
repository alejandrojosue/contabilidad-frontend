import { Chip } from "@mui/material";
import { SparkLineChart } from "@mui/x-charts";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { dateTimeFormat } from "@util/dateTimeFormat";

type SparkLineData = number[];

function renderStatus(status: 'Online' | 'Offline') {
  const colors: { [index: string]: 'success' | 'default' } = {
    Online: 'success',
    Offline: 'default',
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}

function getDaysInMonth(month: number, year: number) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', {
    month: 'short',
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

function renderSparklineCell(params: GridCellParams<SparkLineData, any>) {
  const data = getDaysInMonth(4, 2024);
  const { value, colDef } = params;

  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <SparkLineChart
        data={value}
        width={colDef.computedWidth || 100}
        height={32}
        plotType="bar"
        showHighlight
        showTooltip
        colors={['hsl(210, 98%, 42%)']}
        xAxis={{
          scaleType: 'band',
          data,
        }}
      />
    </div>
  );
}

function renderNewestCell(params: GridCellParams<SparkLineData, any>) {
  const currentDate = new Date();
  const { value, colDef } = params;

  // Verifica si la fecha está dentro de los últimos 30 días
  function isDateInLastNDays(date: Date, nDays: number) {
    const targetDate = new Date(date);
    const startDate = new Date();
    startDate.setDate(currentDate.getDate() - nDays); // Resta N días a la fecha actual

    // Verifica si la fecha está dentro del rango de los últimos N días
    return targetDate >= startDate && targetDate <= currentDate;
  }

  // Si no hay valor o si la fecha no está en los últimos 30 días, sigue mostrando el valor
  if (!value || value.length === 0) {
    return null; // Si no hay valor, no muestra nada
  }

  // Si la fecha no está en los últimos 30 días, no muestra el gráfico pero sí el valor
  const isInLastNDays = isDateInLastNDays(value, 30);

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      {isInLastNDays ? (
        <Chip label={dateTimeFormat(value + '')} color={"success"} size="small" />
      ) : (
        <Chip label={dateTimeFormat(value + '')} color={"default"} size="small" />
      )}
    </div>
  );
}

export const COLUMNS_AUDIT = [
  { field: 'id', headerName: 'REFERENCIA', flex: 1 },
  { field: 'act', headerName: 'ACCION', flex: 1 },
  { field: 'tbl_name', headerName: 'TABLA', flex: 1 },
  { field: 'usr_id', headerName: 'REFERENCIA USUARIO', flex: 1 },
  { field: 'usr_tp', headerName: 'TIPO USUARIO', flex: 1 },
  { field: 'crt_at', headerName: 'FECHA Y HORA', flex: 2 },
  { field: 'desc', headerName: 'DESCRIPCION', flex: 3 },
];

export const COLUMNS_EXAMPLE: GridColDef[] = [
  { field: 'pageTitle', headerName: 'Page Title', flex: 1.5, minWidth: 200 },
  {
    field: 'status',
    headerName: 'Status',
    flex: 0.5,
    minWidth: 80,
    renderCell: (params) => renderStatus(params.value as any),
  },
  {
    field: 'users',
    headerName: 'Users',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 80,
  },
  {
    field: 'eventCount',
    headerName: 'Event Count',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'viewsPerUser',
    headerName: 'Views per User',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'averageTime',
    headerName: 'Average Time',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'conversions',
    headerName: 'Daily Conversions',
    flex: 1,
    minWidth: 150,
    renderCell: renderSparklineCell,
  },
];

export const COLUMNS_CUSTOMER: GridColDef[] = [
  {
    field: 'customer_name',
    headerName: 'Nombre completo',
    flex: 1.5,
    minWidth: 100,
  },
  { field: 'customer_rtn', headerName: 'RTN', flex: 1, minWidth: 50 },
  {
    field: 'customer_address',
    headerName: 'Dirección',
    flex: 2,
    minWidth: 200,
  },
  {
    field: 'customer_created_at',
    headerName: 'Registrado en',
    flex: 1,
    minWidth: 100,
    sortable: false,
    renderCell: renderNewestCell,
  },
];

export const COLUMNS_BRANCH: GridColDef[] = [
  { field: 'branch_name', headerName: 'Branch Name', flex: 1.5, minWidth: 200 }, // Nueva columna
  {
    field: 'branch_is_active',
    headerName: 'Status',
    flex: 0.5,
    minWidth: 80,
    renderCell: (params) => renderStatus(params.value as any), // Nueva columna
  },
  {
    field: 'branch_owner',
    headerName: 'Owner',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'branch_address',
    headerName: 'Address',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'branch_email',
    headerName: 'Email',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 180,
  },
  {
    field: 'branch_phones',
    headerName: 'Phones',
    flex: 1,
    minWidth: 180,
    // renderCell: (params) => renderPhones(params.value as Array<string>), // Nueva columna
  }
];