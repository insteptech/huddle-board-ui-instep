'use client'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import {LogoIcon} from '../../images';
import Container from "@mui/material/Container";
import { useTheme } from '@mui/material';




const Header = ( ) => { 
   
  const theme: any = useTheme();
  console.log(theme,"jhgf")
  return (
 

    <Box sx={{ display: 'flex'    }}>
      <CssBaseline />
      <AppBar component="nav" sx={{  p: 5,position: 'relative', backgroundColor: theme.customArgs.hearderBgColor  }}>
      <LogoIcon /> 
      </AppBar>
    </Box>

  );
}


export default Header;
