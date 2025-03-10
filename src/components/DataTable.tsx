import { DataGrid } from '@mui/x-data-grid';
interface Props {
  columns: any[]
  rows: any[]
  loading: boolean,
}
export default function DataTable({ columns, rows, loading }: Props) {
  const ACTION_COLUMNS = [
    {
    field: "action",
    headerName: "",
    sortable: false,
    width: 120,
    renderCell: (params: any) => {
      return (
        <div className="d-flex gap-2">
          <a className="text-primary" href={`/companies/${params.row.idEmpresa ?? params.row.id}`}>Ver</a>
        </div>
      )
    },
  }]
  return (
    <section className="py-2">
      {/* <div className="row">
        <form className="col-md-6 gap-2 my-2 d-flex align-items-center">
          <label className="fw-bold">RTN:</label>
          <input type="text" className="form-control" id="inputPassword2" placeholder="XXXXXXXXXXXXXX" />
          <button type="submit" className="btn btn-primary">Buscar</button>
        </form>
      </div> */}
      <DataGrid
        rows={rows}
        // columns={columns.concat(ACTION_COLUMNS)}
        columns={columns}
        loading={loading}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 50,
            },
          },
        }}
        pageSizeOptions={[5, 20, 50, 100]}
        // checkboxSelection
        disableRowSelectionOnClick
        style={{
          height: '80vh'
        }}
      />
    </section>
  );
}
