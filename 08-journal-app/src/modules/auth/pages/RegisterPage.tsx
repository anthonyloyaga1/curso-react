import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { FormEvent, FormEventHandler, useEffect, useMemo, useState } from 'react';
import { Link as ReouterLink } from 'react-router-dom';

import { useForm } from '../../../common/hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../../common/hooks/useRedux';
import { startCreatingUserWithEmailPassword } from '../../../common/store/auth/authThunks';
import { AuthLayout } from '../layout/AuthLayout';

const formData = {
  email: '',
  password: '',
  displayName: '',
};

const formValidations = {
  email: [(value) => value.includes('@'), 'Correo debe tener una @'],
  password: [(value) => value.length >= 6, 'Password debe tener mas de 6 letras'],
  displayName: [(value) => value.length >= 1, 'Nombre debe ser mayor a 1'],
};

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const { error, status } = useAppSelector((state) => state.auth);

  const isAuthenticated = useMemo(() => status === 'authenticated', [status]);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { email, password, displayName, onInputChange, isFormValid, displayNameValid, emailValid, passwordValid } = useForm(
    formData,
    formValidations,
  );

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return null;
    dispatch(startCreatingUserWithEmailPassword(email, password, displayName));
  };

  return (
    <AuthLayout title="Registrar usuario">
      <h1>FormValid {isFormValid ? 'Válido' : 'Incorrecto'}</h1>
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Anthony Loyaga"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={formSubmitted ? displayNameValid : null}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={formSubmitted ? emailValid : null}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Constraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={formSubmitted ? passwordValid : null}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField label="Repetir contraseña" type="password" placeholder="Repetir constraseña" fullWidth></TextField>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={12} display={error ? '' : 'none'}>
              <Alert severity="error">{error}</Alert>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth disabled={isAuthenticated}>
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
