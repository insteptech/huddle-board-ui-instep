'use client'
import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import TuneIcon from '@mui/icons-material/Tune';
import { Box, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
    TabledataList,
    TableData,
} from '../../styles/customStyle';

function FilterButton(props:any) {
  const { getAppointmentFiltersData, filtersData, isFilterDataLoading } = props;
  const { patient_screening, provider, visit_type } = filtersData || {};
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    getAppointmentFiltersData();
  };

  const handleMenuItemClick = (filter: any) => {
    setSelectedFilter(filter);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getDataForFilter = (filter: any) => {
    switch (filter) {
      case "Filter 1":
        return ["Filter 1 Data 1", "Filter 1 Data 2", "Filter 1 Data 3"];
      case "Filter 2":
        return ["Filter 2 Data 1", "Filter 2 Data 2", "Filter 2 Data 3"];
      case "Filter 3":
        return ["Filter 3 Data 1", "Filter 3 Data 2", "Filter 3 Data 3"];
      default:
        return [];
    }
  };
  
  function createData(
    savedFilter: string,
    visitType: string,
    Screening: string,
    Providers: string
  ) {
    return { savedFilter, visitType, Screening, Providers };
  }

  const rows = [
    createData("New Patient List", "New Patient", "PVD", "Dr. David Smith"),
    createData("", "New Patient", "PVD", "Dr. David Smith"),
    createData("", "New Patient", "PVD", "Dr. David Smith"),
    createData("", "New Patient", "PVD", "Dr. David Smith"),
  ];
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

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
              <TuneIcon sx={{ fontSize: "16px", marginRight: "5px", color: "#344054" }} />
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
                    <BoxFilterRightMid>Apply</BoxFilterRightMid>
                    <BoxFilterRightMid sx={{ color: "#5C6469" }}>
                      Create Filter
                    </BoxFilterRightMid>
                    <BoxFilterRightMid sx={{ color: "#5C6469" }}>
                      Reset
                    </BoxFilterRightMid>
                  </BoxFilterRight>
                </BoxFilter>
                {isFilterDataLoading && <LoaderBox sx={{ display: 'flex' }}>
                  <CircularProgress />
                  Loading Filters
                </LoaderBox>}
                {!isFilterDataLoading && <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableData>
                      <TabledataList>
                      <TableCellHdMain>
                        Saved Filter{" "}
                        <SettingsOutlinedIcon style={{ fontSize: "12px" }} />
                      </TableCellHdMain>
                      <TableCellTd >savedFilter</TableCellTd>
                      </TabledataList>

                      <TabledataList>
                      <TableCellHd>Visit Type ({visit_type?.length})</TableCellHd>
                      <TableCellTd>
                          <CheckboxInner
                            sx={{ "& .MuiSvgIcon-root": { fontSize: 16 } }}
                            {...label}
                          />
                          New Patient
                        </TableCellTd>
                      </TabledataList>


                      <TabledataList>
                      <TableCellHd>Screening ({patient_screening?.length})</TableCellHd>
                      <TableCellTd>
                          <CheckboxInner
                            sx={{ "& .MuiSvgIcon-root": { fontSize: 16 } }}
                            {...label}
                          />
                          PVD
                        </TableCellTd>
                      </TabledataList>


                      <TabledataList>
                      <TableCellHd>Providers ({provider?.length})</TableCellHd>
                      <TableCellTd>
                          <CheckboxInner
                            sx={{ "& .MuiSvgIcon-root": { fontSize: 16 } }}
                            {...label}
                          />
                          Dr. David Smith

                        </TableCellTd>
                      </TabledataList>
                      
                    </TableData>
                  </TableHead>
                </Table>}
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