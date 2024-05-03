'use client'
import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import TuneIcon from '@mui/icons-material/Tune';
import { Box, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import {
    BoxFilter,
    FilterButtons,
    BoxFilterLeft,
    BoxFilterRightMid,
    BoxFilterRight,
    TableCellHd,
    TableCellTd,
    CheckboxInner,
    TableCellHdMain,
    LoaderBox,
    TableDataList,
    TableData,
} from '../../styles/customStyle';
import SaveFilterModal from '@/app/components/saveFilterModal';

function FilterButton(props:any) {
  const { getAppointmentFiltersData, filtersData, isFilterDataLoading } = props;
  const { patient_screening, provider, visit_type } = filtersData || {};
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [filterName , setFilterName] = React.useState('');

  const modalToggle = () => {
    setIsModalOpen(!isModalOpen);
  }

  const handleInput = (data: any) => {    
    setFilterName(data.target.value);
  }

  const [selectedVisitType, setSelectedVisitType] = useState([]);
  const [selectedScreening, setSelectedScreening] = useState([]);
  const [selectedProviders, setSelectedProviders] = useState([]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    getAppointmentFiltersData();
  };

  const handleMenuItemClick = (filter: any, type: string) => {
    console.log('filter:--',filter,'type:--',type );
    if(type === "visit_type") {
      // setSelectedVisitType(selectedVisitType.push(filter.uuid))

    } else if (type === "patient_screening") {

    } else if (type === "provider") {

    }
    
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const applyFilters = () => {
    console.log('selectedFilter:--', selectedFilter);
    
  }

  const createFilter = () => {
    modalToggle();
  }
  

  return (
    <>
      <Box
        component={"div"}
        sx={{ display: "flex", margin: "0", alignItems: "center", gap: "10px" }}
      >
        <Grid container>
          <Grid item xs={1} sx={{}}>
            <FilterButtons
              aria-controls="filter-menu"
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
              <TuneIcon
                sx={{ fontSize: "16px", marginRight: "5px", color: "#344054" }}
              />
              <span style={{ fontSize: "16px", color: "#344054" }}>Filter</span>
            </FilterButtons>
            <Menu
              id="filter-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <TableContainer sx={{ boxShadow: "unset" }} component={Paper}>
                <BoxFilter
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <BoxFilterLeft>Filter by</BoxFilterLeft>
                  <BoxFilterRight>
                    <BoxFilterRightMid sx={{ cursor: "pointer" }} onClick={()=>applyFilters()}>Apply</BoxFilterRightMid>
                    <BoxFilterRightMid sx={{ color: "#5C6469", cursor: "pointer" }} onClick={() => createFilter()}>
                      Create Filter
                    </BoxFilterRightMid>
                    <BoxFilterRightMid sx={{ color: "#5C6469", cursor: "pointer" }}>
                      Reset
                    </BoxFilterRightMid>
                  </BoxFilterRight>
                </BoxFilter>
                {isFilterDataLoading && (
                  <LoaderBox sx={{ display: "flex" }}>
                    <CircularProgress />
                    Loading Filters
                  </LoaderBox>
                )}
  
                {!isFilterDataLoading && (
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableData>
                        <TableDataList sx={{width:'160px', }}>
                          <TableCellHdMain>
                            Saved Filter{" "}
                            <SettingsOutlinedIcon style={{ fontSize: "12px" }} />
                          </TableCellHdMain>
                          <TableCellTd>savedFilter</TableCellTd>
                        </TableDataList>
  
                        <TableDataList>
                          <TableCellHd>
                            Visit Type ({visit_type?.length})
                          </TableCellHd>
  
                          {visit_type?.map((visit: any, index: number) => (
                            <TableCellTd key={index}>
                              <CheckboxInner
                                key={index}
                                sx={{ "& .MuiSvgIcon-root": { fontSize: 16 } }}
                                {...label}
                                onClick={()=>handleMenuItemClick(visit,'visit_type')}
                              />
                              {visit.visit_type}
                            </TableCellTd>
                          ))}
                        </TableDataList>
  
                        <TableDataList>
                          <TableCellHd>
                            Screening ({patient_screening?.length})
                          </TableCellHd>
                          {patient_screening?.map(
                            (patient: any, index: number) => (
                              <TableCellTd key={index}>
                                <CheckboxInner
                                  key={index}
                                  sx={{ "& .MuiSvgIcon-root": { fontSize: 16 } }}
                                  {...label}
                                  onClick={()=>handleMenuItemClick(patient,'patient_screening')}
                                />
                                {patient.name}
                              </TableCellTd>
                            )
                          )}
                        </TableDataList>
  
                        <TableDataList>
                          <TableCellHd>
                            Providers ({provider?.length})
                          </TableCellHd>
                          {provider?.map((pro: any, index: number) => (
                            <TableCellTd key={index}>
                              <CheckboxInner
                                key={index}
                                sx={{ "& .MuiSvgIcon-root": { fontSize: 16 } }}
                                {...label}
                                onClick={()=>handleMenuItemClick(pro,'provider')}
                              />
                              {pro.name}
                            </TableCellTd>
                          ))}
                        </TableDataList>
                      </TableData>
                    </TableHead>
                  </Table>
                )}
              </TableContainer>
            </Menu>
          </Grid>
        </Grid>
      </Box>
      <SaveFilterModal isModalOpen={isModalOpen} modalToggle={modalToggle} filterName={filterName} setFilterName={handleInput}/>
    </>
  );
  
  
}

export default FilterButton;