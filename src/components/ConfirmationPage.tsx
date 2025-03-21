import { useState, useEffect } from "react";
import ColorModeSelect from "../theme/ColorModeSelect";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../theme/AppTheme";
import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";
import { useAuth } from "../hooks/useAuth";

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

const ConfirmationContainer = styled(Stack)(({ theme }) => ({
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

export default function ConfirmationPage({ token }: { token: string }) {
  const { handleRetry, message, retryCount, status, confirmUser } = useAuth()
  useEffect(() => {
    confirmUser({token});
  }, [token]);
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <ConfirmationContainer>
        <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
        <Card variant="outlined">
          {status === "loading" ? (
            <Typography variant="h4">Confirming your account...</Typography>
          ) : status === "success" ? (
            <>
              <CheckCircleOutline color="success" sx={{ fontSize: 60 }} />
              <Typography variant="h4">Confirmation Successful</Typography>
              <Typography variant="body1">{message}</Typography>
              <Button variant="contained" onClick={() => (window.location.href = "/login")}>
                Go to Login
              </Button>
            </>
          ) : (
            <>
              <ErrorOutline color="error" sx={{ fontSize: 60 }} />
              <Typography variant="h4">Confirmation Failed</Typography>
              <Typography variant="body1">{message}</Typography>
              <Button variant="contained" color="error" onClick={()=>handleRetry({token})} disabled={retryCount >= 3}>
                Try Again ({3 - retryCount} attempts left)
              </Button>
              <Button onClick={() => window.history.back()} variant="contained" sx={{ display: retryCount >= 3 ? 'block' : 'none' }}>Close</Button>
            </>
          )}
        </Card>
      </ConfirmationContainer>
    </AppTheme>
  );
}
