'use client'
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TuneIcon from '@mui/icons-material/Tune';
import { Box, Container, TextField, IconButton } from '@mui/material';
// import { SearchIcon } from '@material-ui/icons';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

function FilterButton() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState(null);

    const handleClick = (event:any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (filter:any) => {
        setSelectedFilter(filter);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getDataForFilter = (filter:any) => {

        switch (filter) {
            case 'Filter 1':
                return ['Filter 1 Data 1', 'Filter 1 Data 2', 'Filter 1 Data 3'];
            case 'Filter 2':
                return ['Filter 2 Data 1', 'Filter 2 Data 2', 'Filter 2 Data 3'];
            case 'Filter 3':
                return ['Filter 3 Data 1', 'Filter 3 Data 2', 'Filter 3 Data 3'];
            default:
                return [];
        }
    };
    function createData(
        savedFilter: string,
        visitType: string,
        Screening: string,
        Providers: string,
       
      ) {
        return { savedFilter, visitType, Screening, Providers };
      }
      
      const rows = [
        createData('New Patient List', "New Patient", "PVD", "Dr. David Smith"),
        createData('',  "New Patient", "PVD", "Dr. David Smith"),
        createData('',  "New Patient", "PVD", "Dr. David Smith"),
        createData('',  "New Patient", "PVD", "Dr. David Smith"),
        
      ];
      const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
    <>
        <Box component={'div'} sx={{display:"flex", margin:'0', alignItems:'center' , gap:'10px' }} >
                <Grid container sx={{gap:'10px'}} marginTop={'10px'}>
                    <Grid item xs={1} sx={{
                        '.mui-kwx3q7-MuiContainer-root':{
                            paddingTop:'0px !important',
                            height:'100%',
                        },
                        
                        
                        '.mui-1n1d3b3-MuiContainer-root':{
                           width:'100% !important'
                        },

                           'button':{
                            width:'100%',
                           },
                       
                        '.MuiIconButton-root:hover':{
                           background:'transparent',
                        }, 
                    }}>
                    <Container sx={{border:'1px solid grey' , width:'100%', margin:'0' , borderRadius:'8px'}}> 
                    <IconButton
                aria-controls="filter-menu"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
            >
                <TuneIcon sx={{fontSize:'16px', marginRight:"5px"  }}/>
               <span style={{fontSize:'16px'}} >Filter</span> 
                  </IconButton>
                  <Menu
                id="filter-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >

                {/* <MenuItem onClick={() => handleMenuItemClick('Filter 1')}>Saved Filter</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('Filter 2')}>Visit Type (1)</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('Filter 3')}>Screening (0)</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('Filter 3')}>Providers (1)</MenuItem> */}
                <TableContainer component={Paper}>
                <Box sx={{display:"flex" , flexDirection:"row", justifyContent:"space-between" , fontWeight:"600" ,margin:"0  15px"}}>
                    <span>Filter by</span>
                    <div>
                        <span  style={{margin:"0 20px"}}>Apply</span>
                        <span>Reset</span>
                    </div>
                    
                </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
           
            <TableCell>Saved Filter</TableCell>
            <TableCell align="right">Visit Type (1)</TableCell>
            <TableCell align="right">Screening (0)</TableCell>
            <TableCell align="right">Providers (1)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row , i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell component="th" scope="row">
                {row.savedFilter}
              </TableCell>
              <TableCell align="right"> <Checkbox {...label} />{row.visitType}</TableCell>
              <TableCell align="right"> <Checkbox {...label} />{row.Screening}</TableCell>
              <TableCell align="right"> <Checkbox {...label} />{row.Providers}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
             
                 </Menu>                  
                    <div>
                {selectedFilter && (
                    <div>
                        <h2>Data for {selectedFilter}</h2>
                        <ul>
                            {getDataForFilter(selectedFilter).map((data, index) => (
                                <li key={index}>{data}</li>
                            ))}
                        </ul>
                    </div>
                )}
                   </div>
                   </Container>  
                   </Grid>
                   <Grid >
                <TextField style={{width:"320px"}}
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <IconButton>
                            {/* <SearchIcon /> */} search
                            </IconButton>
                        ),
                        }}
                    placeholder="Search by patient name or MRN" 
                    size='small'
                />
                </Grid>              
                </Grid>
                
        </Box>
            {/* <Container sx={{ width:"500px", display:"flex" , justifyContent:"space-around" , margin:'0'}}>
            <Button variant='outlined'>
                <TuneIcon sx={{fontSize:'16px', marginRight:"5px"       }}/>
                    Filter
            </Button>
            <TextField  InputProps={{
                        startAdornment: (
                            <IconButton>
                            <SearchIcon />
                            </IconButton>
                        ),
                        }} placeholder='Search by patient name or MRN' style={{width:"70%"}} variant='outlined' size='small'/>
                
            </Container> */}
      
        </>
       
    );
}

export default FilterButton;
