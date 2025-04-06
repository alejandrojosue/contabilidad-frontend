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

export default function CompanyForm() {
  const [formData, setFormData] = useState({
    rtn: '',
    name: '',
    address: '',
    email: '',
    phones: '',
    owner_name: '',
    plan_id: '',
  });

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = () => {
    const dataToSend = {
      ...formData,
      phones: formData.phones.split(',').map(p => p.trim()), // convertir a arreglo
    };
    console.log("Submitting:", dataToSend);
    // Aquí iría tu lógica de envío: fetch/axios/post/etc.
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Container>
        <Section>
          <Typography variant="h6" gutterBottom>Registrar Empresa</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel htmlFor="rtn">RTN</FormLabel>
                <TextField
                  id="rtn"
                  name="rtn"
                  required
                  value={formData.rtn}
                  onChange={handleChange('rtn')}
                  placeholder="08011985123960"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel htmlFor="name">Nombre</FormLabel>
                <TextField
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange('name')}
                  placeholder="Empresa S.A."
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
                  placeholder="empresa@example.com"
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
                <FormLabel htmlFor="owner_name">Nombre del Propietario</FormLabel>
                <TextField
                  id="owner_name"
                  name="owner_name"
                  value={formData.owner_name}
                  onChange={handleChange('owner_name')}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel htmlFor="plan_id">Plan de Pago</FormLabel>
                <TextField
                  id="plan_id"
                  name="plan_id"
                  type="number"
                  value={formData.plan_id}
                  onChange={handleChange('plan_id')}
                  placeholder="1"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleSubmit}>
                Guardar Empresa
              </Button>
            </Grid>
          </Grid>
        </Section>
      </Container>
    </AppTheme>
  );
}