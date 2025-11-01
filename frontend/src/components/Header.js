import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';

const Header = () => {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar>
        <Box display="flex" alignItems="center">
          <NetworkCheckIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div">
            QoS Predictor
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;