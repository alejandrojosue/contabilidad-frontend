import { Box, Typography } from "@mui/material";
import { COLUMNS_CUSTOMER } from "@constants/datagridHeaders";
import CustomizedDataGrid from "@common/CustomizedDataGrid2";
import AppTheme from "@theme/AppTheme";
import { useCustomer } from "@hooks/useCustomer";
import { useEffect, useState } from "react";
import AlertComponent from "@common/AlertComponent";

export default function ListCustomers() {
 const { values, loading, error, get } = useCustomer();
 const [open, setOpen] = useState(false);

 useEffect(() => {
  get();
 }, []);

 useEffect(() => {
  if (error?.msg) {
   setOpen(true);
  }
 }, [error]);

 const handleClose = () => setOpen(false);

 return (
  <>
   <AppTheme>
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
     <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
      Clientes
     </Typography>
     <CustomizedDataGrid rows={values} columns={COLUMNS_CUSTOMER} loading={loading}/>
    </Box>
    <AlertComponent message={error?.msg ?? ""} type="error" open={open} handleClose={handleClose} />
   </AppTheme>
  </>
 )
}