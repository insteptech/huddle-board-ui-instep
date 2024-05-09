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
import { useDispatch } from 'react-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


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
    RadioMain,
} from '../../styles/customStyle';
import SaveFilterModal from '@/app/components/saveFilterModal';
import { AppDispatch } from '@/app/redux/store';
import { emptyAppointmentList, updateFilter } from '@/app/redux/slices/appointment';
import { createAppointmentFilter } from '@/app/redux/actions/appointment';
import { toast } from 'react-toastify';

function FilterButton(props:any) {
  const { getAppointmentFiltersData, appointmentFiltersData, isFilterDataLoading, loadMoreAppointment, filters, selectedFilterList } = props;
  const { patient_screening, provider, visit_type } = appointmentFiltersData || {};
  
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedVisitType, setSelectedVisitType] = useState<any>(filters.visit_types||[]);
  const [selectedScreening, setSelectedScreening] = useState<any>(filters.screening_uuids||[]);
  const [selectedProviders, setSelectedProviders] = useState<any>(filters.providers_uuids||[]);
  const [selectedVisitTypeUuid, setSelectedVisitTypeUuid] = useState<any>(filters.visit_types||[]);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [filterName , setFilterName] = React.useState('');
  const [isSavedFilterSettingClicked, setIsSavedFilterSettingClicked] = React.useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const modalToggle = () => {
    setIsModalOpen(!isModalOpen);
  }

  const handleInput = (data: any) => {    
    setFilterName(data.target.value);
  }

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    getAppointmentFiltersData();
  };

  const handleMenuItemClick = (filter: any | never, type: string) => {
    if(type === "visit_type") {
      const index = selectedVisitType.indexOf(filter.visit_type);
      if (index === -1) {
        setSelectedVisitType([...selectedVisitType, filter.visit_type]);
      } else {
        const updatedFilters = [...selectedVisitType];
        updatedFilters.splice(index, 1);
        setSelectedVisitType(updatedFilters);
      }

      const ind = selectedVisitTypeUuid.indexOf(filter.uuid);
      if (ind === -1) {
        setSelectedVisitTypeUuid([...selectedVisitTypeUuid, filter.uuid]);
      } else {
        const updatedFilters = [...selectedVisitTypeUuid];
        updatedFilters.splice(ind, 1);
        setSelectedVisitTypeUuid(updatedFilters);
      }

    } else if (type === "patient_screening") {
      const index = selectedScreening.indexOf(filter.uuid);
      if (index === -1) {
        setSelectedScreening([...selectedScreening, filter.uuid]);
      } else {
        const updatedFilters = [...selectedScreening];
        updatedFilters.splice(index, 1);
        setSelectedScreening(updatedFilters);
      }
    } else if (type === "provider") {
      const index = selectedProviders.indexOf(filter.uuid);
      if (index === -1) {
        setSelectedProviders([...selectedProviders, filter.uuid]);
      } else {
        const updatedFilters = [...selectedProviders];
        updatedFilters.splice(index, 1);
        setSelectedProviders(updatedFilters);
      }
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const applyFilters = () => {
    const filters = {
      visit_types: selectedVisitType,
      providers_uuids: selectedProviders,
      screening_uuids: selectedScreening,
      page: 1,
      page_size: 10
    };
        
    dispatch(updateFilter(filters));
    dispatch(emptyAppointmentList());
    loadMoreAppointment(filters);
    setAnchorEl(null);
  }

  const createFilterModal = () => {
    modalToggle();
  }

  const resetFilters = () => {
    const filters = {
      visit_types: [],
      providers_uuids: [],
      screening_uuids: [],
      page: 1,
      page_size: 10,
      patient_name: ''
    };
    setSelectedVisitType([]);
    setSelectedScreening([]);
    setSelectedProviders([]);
    dispatch(updateFilter(filters));
    dispatch(emptyAppointmentList());
    loadMoreAppointment(filters);
    setAnchorEl(null);
  }
  
  const createFilter = () => {
    const payload = {
      filter_name : filterName,
      visit_type: selectedVisitTypeUuid,
      screening: selectedScreening,
      provider: selectedProviders
    };

    dispatch(createAppointmentFilter(payload)).then((e)=> {
      console.log('then',e);
      if (e?.payload) {
        toast.success(e?.payload?.message);
        setIsModalOpen(false);
      }
    })
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
                    <BoxFilterRightMid sx={{ color: "#5C6469", cursor: "pointer" }} onClick={() => createFilterModal()}>
                      Create Filter
                    </BoxFilterRightMid>
                    <BoxFilterRightMid sx={{ color: "#5C6469", cursor: "pointer" }} onClick={()=>resetFilters()}>
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
                       {selectedFilterList?.length > 0 && <TableDataList sx={{width:'160px'}}>
                          <TableCellHdMain>
                            Saved Filter{" "}
                            <SettingsOutlinedIcon style={{ fontSize: "12px", cursor: "pointer" }} onClick={()=>setIsSavedFilterSettingClicked(!isSavedFilterSettingClicked)}/>
                          </TableCellHdMain>
                          {selectedFilterList?.map((list: any, index: number) => (
                            <TableCellTd key={index}>
                              {isSavedFilterSettingClicked &&<CheckboxInner
                                key={index}
                                sx={{ "& .MuiSvgIcon-root": { fontSize: 16 } }}
                                {...label}
                              />}
                              {list.name}
                            </TableCellTd>
                          ))}
                        </TableDataList>}
                        <TableDataList >
                        <TableCellHd>
                            Visit Type ({visit_type?.length})
                          </TableCellHd>
                          <RadioMain>
                         

                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            className='radio_sec'
                          >
                            <FormControlLabel className='radio_sec_inner'  value="female" control={<Radio />} label="Female" />
                            <FormControlLabel className='radio_sec_inner'value="male" control={<Radio />} label="Male" />

                          </RadioGroup>
                          
                          </RadioMain>
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
                                checked={filters?.visit_types?.includes(visit.visit_type)|| selectedVisitType?.includes(visit.visit_type)|| false}
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
                                  checked={filters?.screening_uuids?.includes(patient.uuid)|| selectedScreening?.includes(patient.uuid)||false} 
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
                                checked={filters?.providers_uuids?.includes(pro.uuid)||selectedProviders?.includes(pro.uuid)||false} 
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
      <SaveFilterModal isModalOpen={isModalOpen} modalToggle={modalToggle} filterName={filterName} setFilterName={handleInput} createFilter={createFilter}/>
    </>
  );
  
  
}

export default FilterButton;