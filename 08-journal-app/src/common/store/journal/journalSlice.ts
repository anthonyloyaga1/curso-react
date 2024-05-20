import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Journal, Note } from './../../interfaces/journal.interface';

interface JournalState {
  data: Journal;
  loading: boolean;
  error: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: JournalState = {
  status: 'idle',
  data: {
    isSaving: true,
    messageSaved: '',
    messageDeleted: '',
    notes: [],
    activate: null,
    active: {
      id: '',
      title: '',
      body: '',
      imageUrl: [],
      date: 0,
    },
  },
  loading: false,
  error: null,
};

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    processingNote: (state) => {
      state.status = 'loading';
      state.data.messageSaved = '';
      state.data.messageDeleted = '';
      state.loading = true;
    },
    addNewEmptyNote(state, action: PayloadAction<Note>) {
      state.status = 'succeeded';
      state.data.notes.push(action.payload);
      state.loading = false;
    },
    setActiveNote(state, action: PayloadAction<Note>) {
      state.status = 'succeeded';
      state.data.active = action.payload;
    },
    setDeactivateNote: (state) => {
      state.status = 'succeeded';
      state.data.active = initialState.data.active;
      state.loading = false;
    },
    updateNote(state, action: PayloadAction<Note>) {
      state.status = 'succeeded';
      state.data.notes = state.data.notes.map((note) => (note.id === action.payload.id ? action.payload : note));
      state.data.active = action.payload;
      state.data.messageSaved = `${action.payload.title}, actualizada correctamente.`;
      state.loading = false;
    },
    deleteNote(state, action: PayloadAction<string>) {
      state.data.notes = state.data.notes.filter((note) => note.id !== action.payload);
      state.data.messageDeleted = 'Nota eliminada correctamente';
    },
    setNotes(state, action: PayloadAction<Note[]>) {
      state.status = 'succeeded';
      state.data.notes = action.payload;
    },
    deleteImage(state, action: PayloadAction<string>) {
      state.data.active.imageUrl = state.data.active.imageUrl?.filter((img) => img !== action.payload) || [];
      state.data.notes = state.data.notes.map((note) => (note.id === state.data.active.id ? state.data.active : note));
      state.loading = false;
      state.data.messageDeleted = 'Imagen eliminada correctamente';
    },
    clearNotesLogout: (state) => {
      state.data = initialState.data;
      state.status = 'idle';
    },
  },
});

export const { processingNote, addNewEmptyNote, setActiveNote, setDeactivateNote, updateNote, deleteNote, setNotes, deleteImage, clearNotesLogout } =
  journalSlice.actions;
