import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';

import { FirebaseDB } from '../../firebase/firebase';
import { fileUpload } from '../../helpers/fileUpload';
import { Note } from '../../interfaces/journal.interface';
import { AppThunk } from '../../types/AppThunk';
import { addNewEmptyNote, deleteImage, deleteNote, processingNote, setActiveNote, setDeactivateNote, setNotes, updateNote } from './journalSlice';

export const StartNewNote = (): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(processingNote());
    const { uid } = getState().auth.data!;

    const newNote: Note = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const StartLoadingNotes = (): AppThunk => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth.data!;

    const notesSnap = await getDocs(collection(FirebaseDB, `${uid}/journal/notes`));

    const notes: Note[] = [];
    notesSnap.forEach((snap) => notes.push({ id: snap.id, ...snap.data() } as Note));

    if (notes.length === 0) return;

    notes.sort((a, b) => a.date - b.date);

    dispatch(setNotes(notes));
  };
};

export const StartSavingNote = (): AppThunk => {
  return async (dispatch, getState) => {
    // Despacha la acción "processingNote" para indicar que la nota se está guardando.
    dispatch(processingNote());

    // Obtiene la nota activa y el ID de usuario del almacenamiento de Redux.
    const { active: note } = getState().journal.data;
    const { uid } = getState().auth.data!;

    // Crea una referencia de documento Firestore para la nota utilizando el ID de usuario y el ID de la nota.
    const noteDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`), note.id);

    // Guarda la nota en la base de datos de Firestore utilizando la función "setDoc".
    await setDoc(noteDoc, note);

    // Finalmente, despacha la acción "updateNote" para actualizar la nota en el almacenamiento de Redux.
    dispatch(updateNote(note));
  };
};

export const StartDeletingNote = (): AppThunk => {
  return async (dispatch, getState) => {
    // Despacha la acción "processingNote" para indicar que la nota se está guardando.
    dispatch(processingNote());

    // Obtiene el ID de usuario del almacenamiento de Redux.
    const { uid } = getState().auth.data!;
    const { active: note } = getState().journal.data;

    // Crea una referencia de documento Firestore para la nota utilizando el ID de usuario y el ID de la nota.
    const noteDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`), note.id);

    // Elimina la nota de la base de datos de Firestore utilizando la función "deleteDoc".
    await deleteDoc(noteDoc);
    dispatch(setDeactivateNote());

    // Finalmente, despacha la acción "deleteNote" para eliminar la nota del almacenamiento de Redux.
    dispatch(deleteNote(note.id!));
  };
};
export const StartUploadingFiles = (files: FileList): AppThunk => {
  return async (dispatch, getState) => {
    if (files.length === 0) return;
    dispatch(processingNote());

    const { active: note } = getState().journal.data;
    const { uid } = getState().auth.data!;

    // const urlImage = await fileUpload(files[0]);

    const fileUploadPromises: Promise<string>[] = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const phtosURL = await Promise.all(fileUploadPromises);

    // Obtiene la nota activa y el ID de usuario del almacenamiento de Redux.
    const newUpdated = { ...note, imageUrl: [...(note.imageUrl ?? []), ...phtosURL] };

    // Crea una referencia de documento Firestore para la nota utilizando el ID de usuario y el ID de la nota.
    const noteDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`), newUpdated.id);

    // Guarda la nota en la base de datos de Firestore utilizando la función "setDoc".
    await setDoc(noteDoc, newUpdated);

    // Finalmente, despacha la acción "updateNote" para actualizar la nota en el almacenamiento de Redux.
    dispatch(updateNote(newUpdated));
  };
};

export const startDeletingImage = (url: string): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(processingNote());

    const { active: note } = getState().journal.data;
    const { uid } = getState().auth.data!;
    // const imgActiveFiltered = note.imageUrl?.filter((img) => img !== url) || [];

    const noteDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`), note.id);
    await setDoc(noteDoc, note);

    dispatch(deleteImage(url));
  };
};
