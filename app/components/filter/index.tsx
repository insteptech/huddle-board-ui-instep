'use client'
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TuneIcon from '@mui/icons-material/Tune';
import { Box, Container, TextField, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import {
    BoxFilter,
    FilterButtons,
    BoxfilterLeft,
    BoxfilterRightmid,
    BoxfilterRight,
    TablecellHd,
    TablecellTd,
    CheckboxInner,
    TablecellHdmain,

} from '../../styles/customStyle';

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
         
                <Grid container>
                    <Grid item xs={1} sx={{
                    }}>
                   
                    <FilterButtons
                aria-controls="filter-menu"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
            >
                <TuneIcon sx={{fontSize:'16px', marginRight:"5px"  }}/>
               <span style={{fontSize:'16px'}} >Filter</span> 
                  </FilterButtons>
                  <Menu
                  
                id="filter-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <TableContainer sx={{boxShadow:"unset" , }} component={Paper}>
                <BoxFilter sx={{display:"flex" , flexDirection:"row", justifyContent:"space-between"}}>
                     
                    <BoxfilterLeft>Filter by</BoxfilterLeft>
                    <BoxfilterRight>
                        <BoxfilterRightmid>Apply</BoxfilterRightmid>
                        <BoxfilterRightmid sx={{color: '#5C6469',}}>Create Filter</BoxfilterRightmid>
                        <BoxfilterRightmid sx={{color: '#5C6469',}}>Reset</BoxfilterRightmid>
                    </BoxfilterRight>
                    
                </BoxFilter>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
           
            <TablecellHdmain>Saved Filter <SettingsOutlinedIcon style={{  fontSize: '12px' }} /></TablecellHdmain>
            <TablecellHd >Visit Type (1)</TablecellHd>
            <TablecellHd >Screening (0)</TablecellHd>
            <TablecellHd >Providers (1)</TablecellHd>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row , i) => (
            <TableRow
              key={i}
            >

              <TablecellTd scope="row">
                {row.savedFilter}
              </TablecellTd>
              <TablecellTd> <CheckboxInner   sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} {...label } />{row.visitType}</TablecellTd>
              <TablecellTd> <CheckboxInner  sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} {...label} />{row.Screening}</TablecellTd>
              <TablecellTd> <CheckboxInner  sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} {...label} />{row.Providers}</TablecellTd>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
             
                 </Menu>   
                 
{/*                                 
                    <div>
                {selectedFilter && (
                    <div>
                        <h2>Data for {selectedFilter}</h2>
                        <ul className="zero">
                            {getDataForFilter(selectedFilter).map((data, index) => (
                                <li key={index}>{data}</li>
                            ))}
                        </ul>
                    </div>
                )}
                   </div> */}
                   
                   </Grid>
                       
                </Grid>
                
        </Box>
      
        </>
       
    );
}

export default FilterButton;
