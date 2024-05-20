import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material';

import { useAppSelector } from '../../../common/hooks/useRedux';
import { SideBarItem } from './SideBarItem';

interface NavBarProps {
  drawerWidth: number;
}
export const SideBar = ({ drawerWidth }: NavBarProps) => {
  const { displayName } = useAppSelector((state) => state.auth.data!);
  const { notes, active } = useAppSelector((state) => state.journal.data);
  
  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      <Drawer variant="permanent" open sx={{ display: { xs: 'block', '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } } }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {notes.map((note) => (
            <SideBarItem note={note} key={note.id} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
