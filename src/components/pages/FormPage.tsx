import { CssBaseline, Button, Box, Typography } from "@mui/material";
import AppTheme from "@theme/AppTheme";
import { useRef, useState, ElementType } from "react";
import { styled } from "@mui/material/styles";
import { formRegistry } from "@components/formRegistry"; // importa el registro

const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
}));

const PageHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
}));

interface Props {
  title: string;
  formName: keyof typeof formRegistry;
}

export default function DynamicFormPage({ title, formName }: Props) {
  const [hasChanges] = useState(true);
  const formRef = useRef<any>(null); // puedes hacer esto más estricto si lo deseas
  const FormComponent = formRegistry[formName] as ElementType;

  if (!FormComponent) {
    return <Typography color="error">Formulario "{formName}" no encontrado.</Typography>;
  }

  const handleFormSubmit = () => {
    formRef.current?.handleSubmit?.(); // usa optional chaining
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Container>
        {/* Título y botón */}
        <PageHeader>
          <Typography variant="h6">{title}</Typography>
          <Button
            variant="contained"
            disabled={!hasChanges}
            onClick={handleFormSubmit}
          >
            Guardar
          </Button>
        </PageHeader>

        {/* Render del formulario dinámico */}
        <FormComponent ref={formRef} />
      </Container>
    </AppTheme>
  );
}