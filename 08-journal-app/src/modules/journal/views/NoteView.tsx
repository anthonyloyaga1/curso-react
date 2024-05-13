import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';

import { ImageGallery } from '../components/ImageGallery';

export const NoteView = () => {
  return (
    <Grid className="animate__animated animate__fadeIn animate__faster" container direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
      <Grid item>
        <Typography fontSize={39} fontWeight="ligth">
          09 de mayo de 2024
        </Typography>
      </Grid>
      <Grid item>
        <Button color="primary" sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título de la actividad"
          label="Título"
          sx={{ border: 'none', mb: 1 }}
        ></TextField>

        <TextField type="text" variant="filled" fullWidth placeholder="¿Qué sucedió el día de hoy?" multiline minRows={5}></TextField>
      </Grid>
      {/* Image Gallery */}
      <ImageGallery />
    </Grid>
  );
};
