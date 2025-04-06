import { Box, Button } from '@mui/material';

const handleRegresar = () => history.back()

const handleCrear = (link: string) => location.href = link

export default function TopActionsBar({linkGo, isPDF = true, isExcel = true}: { linkGo: string, isPDF?: boolean, isExcel?: boolean }) {
 return (
  <Box display="flex" justifyContent={"end"} width={"100%"} my={2}>
   <Button
    variant="outlined"
    color="primary"
    sx={{ mr: .5}}
    onClick={handleRegresar}
   >
    Regresar
   </Button>
   <Button
    variant="outlined"
    sx={{ borderColor: "#4caf50", color: "#4caf50", ml: .5, mr: .5, display: isExcel ? "block" : "none" }}
   >
    Excel
   </Button>
   <Button
    variant="outlined"
    sx={{ borderColor: "#e74c3c", color: "#e74c3c", mr: .5, ml: .5, display: isPDF ? "block" : "none" }}
   >
    PDF
   </Button>
   <Button
    variant="contained"
    color="primary"
    sx={{ ml: .5}}
    onClick={() => handleCrear(linkGo)}
   >
    Crear
   </Button>
  </Box>
 );
}