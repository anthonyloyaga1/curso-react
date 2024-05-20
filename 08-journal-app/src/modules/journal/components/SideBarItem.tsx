import { TurnedInNot } from '@mui/icons-material';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '../../../common/hooks/useRedux';
import { Note } from '../../../common/interfaces/journal.interface';
import { setActiveNote } from '../../../common/store/journal/journalSlice';

interface SideBarItemProps {
  note: Note;
}

export const SideBarItem = ({ note }: SideBarItemProps) => {
  const dispatch = useAppDispatch();
  const {data} = useAppSelector((state) => state.journal);

  const newTitle = useMemo(() => {
    return note.title.length > 15 ? note.title.slice(0, 15) + '...' : note.title;
  }, [note.title]);

  const onClickNote = () => {
    console.log(data);
    
    dispatch(setActiveNote(note));
  };

  return (
    <ListItem key={note.id} disablePadding>
      <ListItemButton onClick={onClickNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={note.body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
