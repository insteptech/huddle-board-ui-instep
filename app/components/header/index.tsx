'use client'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import {LogoIcon} from '../../images';
import Container from "@mui/material/Container";
import { useTheme } from '@mui/material';
import { Typography } from '@mui/material';
import { Link } from '@mui/material';
import {Typography_Grid,StaticTypo,LinkText} from  '../../styles/customStyle'; 



const Header = ( ) => { 
   
  const theme: any = useTheme();
  return (
    <Box sx={{ display: 'flex'    }}>
      <CssBaseline />
      <AppBar component="nav" sx={{  p: 2,position: 'relative',flexDirection: 'row',    justifyContent:' space-between', backgroundColor: theme.customArgs.hearderBgColor  }}>
      <LogoIcon /> 


      <Typography_Grid>
      <StaticTypo variant="caption" display="block" gutterBottom>
        Adam Steele
      </StaticTypo>
       <LinkText> Logout</LinkText>
      </Typography_Grid>


      </AppBar>
    </Box>

  );
}


export default Header;
