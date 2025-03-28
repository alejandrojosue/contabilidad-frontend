import { Button, CircularProgress } from "@mui/material";

interface ButtonProps {
  loading: boolean;
  onClick: () => void;
  type: 'button' | 'submit';
  variant: 'text' | 'outlined' | 'contained';
  text: string;
  fullWidth?: boolean;
}
export default function CustomButton({ ...props }: ButtonProps) {
 return (
  <Button {...props}>
   {props.loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : props.text}
  </Button>
 );
}