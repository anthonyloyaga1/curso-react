import 'animate.css';

import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';
import { Link as ReouterLink } from 'react-router-dom';

import { useForm } from '../../../common/hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../../common/hooks/useRedux';
import { startEmailPasswordSignIn, startGoogleSignIn } from '../../../common/store/auth/authThunks';
import { AuthLayout } from '../layout/AuthLayout';

const initialForm = { email: 'test1@gmail.com', password: '123456' };

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);

  const { email, password, onInputChange } = useForm(initialForm);

  const isAuthenticated = useMemo(() => status === 'authenticated', [status]);

  const onSubmit = (event: any) => {
    event.preventDefault();
    dispatch(startEmailPasswordSignIn(email, password));
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid container className="animate__animated animate__fadeIn animate__faster">
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              onChange={onInputChange}
              value={email}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="constraseña"
              fullWidth
              name="password"
              onChange={onInputChange}
              value={password}
            ></TextField>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} display={error ? '' : 'none'}>
              <Alert severity="error">{error}</Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button disabled={isAuthenticated} type="submit" variant="contained" fullWidth>
                <Typography sx={{ ml: 1 }}>Login</Typography>
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button disabled={isAuthenticated} variant="contained" fullWidth onClick={onGoogleSignIn}>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="end">
          <Link component={ReouterLink} color="inherit" to="/auth/register">
            Crear una cuenta
          </Link>
        </Grid>
      </form>
    </AuthLayout>
  );
};
