import CustomizedDataGrid from '@components/common/CustomizedDataGrid2';
import AppTheme from '@theme/AppTheme';
import { COLUMNS_BRANCH } from '@constants/datagridHeaders';
import TopActionsBar from '@components/common/TopActionsBar';

export default function List() {
 const ROWS_BRANCH = [
  {
   id: 1,
   branch_name: 'Sucursal Central',
   branch_owner: 'Juan Pérez',
   branch_address: 'Calle 123, Zona 10, Ciudad de Guatemala',
   branch_email: 'central@empresa.com',
   branch_phones: ['+502 1234 5678', '+502 9876 5432'],
   branch_is_active: 'Active',
  },
  {
   id: 2,
   branch_name: 'Sucursal Norte',
   branch_owner: 'Ana López',
   branch_address: 'Avenida 15, Zona 15, Ciudad de Guatemala',
   branch_email: 'norte@empresa.com',
   branch_phones: ['+502 8765 4321'],
   branch_is_active: 'Inactive',
  },
  {
   id: 3,
   branch_name: 'Sucursal Sur',
   branch_owner: 'Carlos Méndez',
   branch_address: 'Calle 45, Zona 12, Ciudad de Guatemala',
   branch_email: 'sur@empresa.com',
   branch_phones: ['+502 5432 8765'],
   branch_is_active: 'Active',
  },
  {
   id: 4,
   branch_name: 'Sucursal Oeste',
   branch_owner: 'Lucía Sánchez',
   branch_address: 'Calle 78, Zona 9, Ciudad de Guatemala',
   branch_email: 'oeste@empresa.com',
   branch_phones: ['+502 6543 2109', '+502 3210 9876'],
   branch_is_active: 'Active',
  },
  {
   id: 5,
   branch_name: 'Sucursal Este',
   branch_owner: 'Marco Ramírez',
   branch_address: 'Avenida 7, Zona 3, Ciudad de Guatemala',
   branch_email: 'este@empresa.com',
   branch_phones: ['+502 4321 7654'],
   branch_is_active: 'Inactive',
  },
 ];

 return (
  <AppTheme>
   <TopActionsBar linkGo='/company/branches/create' />
   <CustomizedDataGrid columns={COLUMNS_BRANCH} rows={ROWS_BRANCH} loading={false} />
  </AppTheme>
 );
}