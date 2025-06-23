import {
 Box,
 Button,
 Grid,
 Typography,
 List,
 ListItem,
 ListItemIcon,
 ListItemText,
 Paper
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const plans = [
 {
   name: "Básico",
   price: 10,
   features: {
     users: 1,
     companies: 1,
     invoices: 100,
     backups: "1 semanal",
     electronicBilling: false,
     support: false,
     apiAccess: false,
   },
 },
 {
   name: "Profesional",
   price: 20,
   features: {
     users: 5,
     companies: 3,
     invoices: 500,
     backups: "2 semanales",
     electronicBilling: true,
     support: true,
     apiAccess: false,
   },
 },
 {
   name: "Empresarial",
   price: 40,
   features: {
     users: "Ilimitados",
     companies: "Ilimitadas",
     invoices: "Ilimitadas",
     backups: "Diarias",
     electronicBilling: true,
     support: true,
     apiAccess: true,
   },
 },
];

const Container = styled(Box)(({ theme }) => ({
 width: "100%",
 display: "flex",
 flexDirection: "column",
 gap: theme.spacing(4),
}));

const PlanCard = styled(Paper)(({ theme }) => ({
 padding: theme.spacing(3),
 textAlign: "center",
 borderRadius: theme.spacing(2),
 boxShadow: theme.shadows[3],
 display: "flex",
 flexDirection: "column",
 height: "100%",
}));

const FeatureItem = ({
 label,
 value,
}: {
 label: string;
 value: string | number | boolean;
}) => (
 <ListItem disableGutters>
   <ListItemIcon sx={{ minWidth: 32 }}>
     {typeof value === "boolean" ? (
       value ? (
         <CheckCircleIcon color="success" />
       ) : (
         <CancelIcon color="disabled" />
       )
     ) : (
       <CheckCircleIcon color="primary" />
     )}
   </ListItemIcon>
   <ListItemText
     primary={`${label}${typeof value === "boolean" ? "" : `: ${value}`}`}
   />
 </ListItem>
);

export default function PlansSelector() {
 return (
   <Container>
     <Typography variant="h6">Selecciona un Plan</Typography>
     <Grid container spacing={2}>
       {plans.map((plan, idx) => (
         <Grid item xs={12} md={4} key={idx}>
           <PlanCard>
             <Typography variant="h6" color="primary">{plan.name}</Typography>
             <Typography variant="h4" my={1}>${plan.price}</Typography>
             <List dense>
               <FeatureItem label="Usuarios" value={plan.features.users} />
               <FeatureItem label="Empresas" value={plan.features.companies} />
               <FeatureItem label="Facturas mensuales" value={plan.features.invoices} />
               <FeatureItem label="Copias de seguridad" value={plan.features.backups} />
               <FeatureItem label="Facturación electrónica" value={plan.features.electronicBilling} />
               <FeatureItem label="Soporte prioritario" value={plan.features.support} />
               <FeatureItem label="Acceso a API" value={plan.features.apiAccess} />
             </List>
             <Box mt="auto">
               <Button fullWidth variant="contained">Seleccionar</Button>
             </Box>
           </PlanCard>
         </Grid>
       ))}
     </Grid>
   </Container>
 );
}
