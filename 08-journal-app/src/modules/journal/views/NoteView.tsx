import '@sweetalert2/theme-material-ui/material-ui.min.css';

import { Delete, Save, Upload } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Grid, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import Swal from 'sweetalert2';

import { formatDateToSpanishLocale } from '../../../common/helpers/handlerDates';
import { useForm } from '../../../common/hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../../common/hooks/useRedux';
import { setActiveNote } from '../../../common/store/journal/journalSlice';
import { StartDeletingNote, StartSavingNote, StartUploadingFiles } from '../../../common/store/journal/journalThunks';
import { ImageGallery } from '../components/ImageGallery';

export const NoteView = () => {
  const {
    data: { active: note, messageSaved, messageDeleted },
    loading,
  } = useAppSelector((state) => state.journal);
  const { body, title, date, onInputChange, formState } = useForm(note);
  const dateString = useMemo(() => formatDateToSpanishLocale(date), [date]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState, dispatch]);

  const onSaveNote = () => {
    dispatch(StartSavingNote());
  };

  const onDeleteNote = () => {
    dispatch(StartDeletingNote());
  };
  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) dispatch(StartUploadingFiles(files));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messageSaved !== '') Swal.fire('Nota guardada', messageSaved, 'success');
  }, [messageSaved]);

  return (
    <Grid className="animate__animated animate__fadeIn animate__faster" container direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
      <Grid item>
        <Typography fontSize={39} fontWeight="ligth">
          {dateString}
        </Typography>
      </Grid>
      <Grid item sx={{ marginLeft: 'auto' }}>
        <input type="file" multiple onChange={onFileInputChange} style={{ display: 'none' }} ref={fileInputRef} />
        <IconButton sx={{ mr: 1 }} color="primary" disabled={loading} onClick={() => fileInputRef.current?.click()}>
          <Upload />
        </IconButton>
      </Grid>
      <Grid item>
        <LoadingButton sx={{ mr: 1 }} loading={loading} loadingPosition="start" startIcon={<Delete />} variant="outlined" onClick={onDeleteNote}>
          Borrar
        </LoadingButton>
      </Grid>
      <Grid item>
        <LoadingButton sx={{ mr: 1 }} loading={loading} loadingPosition="start" startIcon={<Save />} variant="outlined" onClick={onSaveNote}>
          Guardar
        </LoadingButton>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título de la actividad"
          label="Título"
          sx={{ border: 'none', mb: 1 }}
          name="title"
          onChange={onInputChange}
          value={title}
        ></TextField>

        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="¿Qué sucedió el día de hoy?"
          multiline
          minRows={5}
          name="body"
          onChange={onInputChange}
          value={body}
        ></TextField>
      </Grid>
      {/* Image Gallery */}
      <ImageGallery images={note.imageUrl || []} />
    </Grid>
  );
};
