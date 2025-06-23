import CustomizedDataGrid from '@components/common/CustomizedDataGrid2';
import AppTheme from '@theme/AppTheme';
import { COLUMNS_MESSAGE } from '@constants/datagridHeaders';
import TopActionsBar from '@components/common/TopActionsBar';
import { useEffect } from "react";
import { useMessage } from '@hooks/useMessage';

export default function List() {
 const {get, values, loading} = useMessage()
 useEffect(() => {
  get();
 }, []);
 return (
  <AppTheme>
   <TopActionsBar linkGo='/settings/messages/create' isExcel={false} isPDF={false}/>
   <CustomizedDataGrid columns={COLUMNS_MESSAGE} rows={values} loading={loading} />
  </AppTheme>
 );
}