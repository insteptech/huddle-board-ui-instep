'use client'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import {LogoIcon} from '../../images';
import { useTheme } from '@mui/material';
import {Typography_Grid,StaticTypo,LinkText} from  '../../styles/customStyle'; 
import { useSelector } from 'react-redux';
import { AppState } from '@/app/redux/store';



const Header = ( ) => { 
  const theme: any = useTheme();
  const huddleBoardConfig:any = localStorage.getItem('huddleBoardConfig');
  const config = JSON.parse(huddleBoardConfig);
    
  return (
    <Box sx={{ display: 'flex'    }}>
      <CssBaseline />
      <AppBar className='headerMain' component="nav" sx={{ p:'15px 20px',boxShadow:'0px 4px 4px 0px rgba(0, 0, 0, 0.03)' ,position: 'relative',flexDirection: 'row',    justifyContent:' space-between', backgroundColor: theme.customArgs.hearderBgColor  }}>
      <LogoIcon /> 
        <Typography_Grid>
        <StaticTypo variant="caption" display="block" gutterBottom>
          {config?.user_full_name}
        </StaticTypo>
        <LinkText sx={{textDecoration:'none', borderLeft:'2px solid #C8CED2', paddingLeft: '10px',}} > Logout</LinkText>
        </Typography_Grid>
      </AppBar>
    </Box>

  );
}


export default Header;
