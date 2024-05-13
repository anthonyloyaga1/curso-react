import 'animate.css';

import { Box, Toolbar } from '@mui/material';
import { ReactNode } from 'react';

import { NavBar } from '../components/NavBar';
import { SideBar } from '../components/SideBar';

interface JournalLayoutProps {
  children: ReactNode;
}

const drawerWidth = 240;

export const JournalLayout = ({ children }: JournalLayoutProps) => {
  return (
    <Box className="animate__animated animate__fadeIn animate__faster" sx={{ display: 'flex' }}>
      {/* Navbar */}
      <NavBar drawerWidth={drawerWidth} />
      {/* SideBar */}
      <SideBar drawerWidth={drawerWidth} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};
