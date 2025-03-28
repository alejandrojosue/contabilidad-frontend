import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import AppTheme from "@theme/AppTheme";
import { styled } from "@mui/material/styles";
import { Button, CssBaseline, Typography, Stack, TextField } from "@mui/material";
import MuiCard from "@mui/material/Card";
import { ErrorOutline, LockReset } from "@mui/icons-material";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const ResetContainer = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.up("lg")]: {
    minHeight: "100vh",
  },
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

export default function ResetPasswordPage({ token }: { token: string }) {
  const { verifyTokenResetPassword, recoveryPass, message, status, email } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  useEffect(() => {
    if (token) verifyTokenResetPassword({ token });
  }, [token]);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    await recoveryPass({ password, email });
    window.location.href = "/dashboard";
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <ResetContainer>
        <Card variant="outlined">
          {status === "loading" ? (
            <Typography variant="h4">Validando token...</Typography>
          ) : status === "error" ? (
            <>
              <ErrorOutline color="error" sx={{ fontSize: 60 }} />
              <Typography variant="h4">Error</Typography>
              <Typography variant="body1">{message}</Typography>
            </>
          ) : (
            <>
              <LockReset color="primary" sx={{ fontSize: 60 }} />
              <Typography variant="h4">Restablecer Contraseña</Typography>
              <Typography variant="body1">Correo: {email}</Typography>
              <TextField
                type="password"
                label="Nueva Contraseña"
                fullWidth
                margin="dense"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                type="password"
                label="Confirmar Contraseña"
                fullWidth
                margin="dense"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button variant="contained" onClick={handleSubmit} fullWidth>
                Cambiar Contraseña
              </Button>
            </>
          )}
        </Card>
      </ResetContainer>
    </AppTheme>
  );
}
