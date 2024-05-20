import { Add } from '@mui/icons-material';
import { Fab } from '@mui/material';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../common/hooks/useRedux';
import { StartLoadingNotes, StartNewNote } from '../../../common/store/journal/journalThunks';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView } from '../views/NoteView';
import { NothingSelectedView } from '../views/NothingSelectedView';

export const JournalPage = () => {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.journal);

  const noActiveNote = data && data.active != null && data.active.id === '';

  const onClickNewNote = () => {
    dispatch(StartNewNote());
  };
 
  useEffect(() => {
    dispatch(StartLoadingNotes());
  }, [dispatch]);

  return (
    <JournalLayout>
      {noActiveNote ? <NothingSelectedView /> : <NoteView />}

      <Fab
        disabled={loading}
        onClick={onClickNewNote}
        color="secondary"
        sx={{
          position: 'fixed',
          right: 50,
          bottom: 50,
        }}
      >
        <Add />
      </Fab>
    </JournalLayout>
  );
};
