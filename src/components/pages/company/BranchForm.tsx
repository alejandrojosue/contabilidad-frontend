import { Box, Button, CssBaseline, FormControl, FormLabel, Grid, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import AppTheme from "@theme/AppTheme";
import { useState } from "react";

const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
  padding: theme.spacing(2),
}));

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export default function BranchForm() {
  const [formData, setFormData] = useState({
    company_rtn: '',
    name: '',
    address: '',
    email: '',
    phones: '',
    owner_name: '',
    is_active: true,
  });

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = () => {
    const dataToSend = {
      ...formData,
      phones: formData.phones.split(',').map(p => p.trim()),
      // @ts-ignore
      is_active: formData.is_active === 'true' || formData.is_active === true,
    };
    console.log("Submitting branch:", dataToSend);
    // Aquí iría tu lógica de envío: fetch/axios/post/etc.
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Container>
        <Section>
          <Typography variant="h6" gutterBottom>Registrar Sucursal</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel htmlFor="company_rtn">RTN de la Empresa</FormLabel>
                <TextField
                  id="company_rtn"
                  name="company_rtn"
                  required
                  value={formData.company_rtn}
                  onChange={handleChange('company_rtn')}
                  placeholder="08011985123960"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel htmlFor="name">Nombre de la Sucursal</FormLabel>
                <TextField
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange('name')}
                  placeholder="Sucursal Centro"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel htmlFor="address">Dirección</FormLabel>
                <TextField
                  id="address"
                  name="address"
                  multiline
                  value={formData.address}
                  onChange={handleChange('address')}
                  placeholder="Barrio Centro, Ave. Principal"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel htmlFor="email">Correo electrónico</FormLabel>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  placeholder="sucursal@example.com"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel htmlFor="phones">Teléfonos</FormLabel>
                <TextField
                  id="phones"
                  name="phones"
                  value={formData.phones}
                  onChange={handleChange('phones')}
                  placeholder="(504) 1234-5678, (504) 9876-5432"
                  helperText="Separa los teléfonos con coma"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel htmlFor="owner_name">Nombre del Encargado</FormLabel>
                <TextField
                  id="owner_name"
                  name="owner_name"
                  value={formData.owner_name}
                  onChange={handleChange('owner_name')}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleSubmit}>
                Guardar Sucursal
              </Button>
            </Grid>
          </Grid>
        </Section>
      </Container>
    </AppTheme>
  );
}