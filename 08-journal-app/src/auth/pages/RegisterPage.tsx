import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as ReouterLink } from 'react-router-dom';

import { AuthLayout } from '../layout/AuthLayout';

export const RegisterPage = () => {
  return (
    <AuthLayout title="Registrar usuario">
      <form>
        <Grid container>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField label="Nombre completo" type="text" placeholder="Anthony Loyaga" fullWidth></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField label="Correo" type="email" placeholder="correo@google.com" fullWidth></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField label="Contraseña" type="password" placeholder="Constraseña" fullWidth></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField label="Repetir contraseña" type="password" placeholder="Repetir constraseña" fullWidth></TextField>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth>
                <Typography sx={{ ml: 1 }}>Crear cuenta</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?,</Typography>
            <Link component={ReouterLink} color="inherit" to="/auth/login">
              ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
