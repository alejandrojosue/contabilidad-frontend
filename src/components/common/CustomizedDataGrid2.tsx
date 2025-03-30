import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { customer } from '../../types/types';
import { esES } from '@mui/x-data-grid/locales';

export default function CustomizedDataGrid({ rows, columns, loading }: { rows: Array<customer>, columns: Array<GridColDef>, loading: boolean}) {
  return (
    <DataGrid
      checkboxSelection
      rows={rows}
      loading={loading}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      localeText={esES.components.MuiDataGrid.defaultProps.localeText}
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50, 100]}
      disableColumnResize
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: 'outlined',
              size: 'small',
            },
            columnInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            operatorInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: 'outlined',
                size: 'small',
              },
            },
          },
        },
      }}
    />
  );
}
