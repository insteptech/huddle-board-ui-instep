'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useInView } from 'react-intersection-observer';
import { getAppointmentDetail, getAppointmentsList, getFiltersData, getSelectedFilterDetail, getSelectedFilterList, updateAppointmentDetail } from '@/app/redux/actions/appointment';
import { AppDispatch, AppState } from '@/app/redux/store';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import FilterButton from "@/app/components/filter";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import {
  HeadingTag,
  TableMainContainer,
  Table_Head,
  StyledTableCell,
  TableDiv,
  TableTopMain,
  TableTop,
  FilterMenu,
  TableOtherContainer,
  RightPrint,
  RightBox,
  MainBoxTop,
  TypoSpan,
  SearchClearIcon
} from '../../styles/customStyle';
import { AppointmentState, FiltersDataState, emptyAppointmentList, updateFilter } from '@/app/redux/slices/appointment';
import { Box, Input, InputAdornment } from '@mui/material';
import PatientNotFound from '@/app/components/patientNotFound';
import Calender from '@/app/components/calender';

const Row = dynamic(() => import('@/app/components/tableRow/index').then((mod) => mod), {
  ssr: false,
});

type AppointmentListProps = {
  initialAppointments: AppointmentState[];
};

const CollapsibleTable: React.FC<AppointmentListProps> = ({ initialAppointments }) => {
  const [isPatientNotFound, setIsPatientNotFound] = useState(true);
  const [isClearFilter, setIsClearFilter] = useState(false);
  const [patientNameSearch , setPatientNameSearch] = React.useState('');

  const dispatch = useDispatch<AppDispatch>();
  const appointmentsList = useSelector((state: AppState) => state.appointment?.appointmentsData?.results) || [];
  const appointmentDetail = useSelector((state: AppState) => state.appointment?.appointmentDetail) || [];
  const isNextAppointmentsList = useSelector((state: AppState) => state.appointment?.appointmentsData?.next);
  const isDetailLoading = useSelector((state: AppState) => state.appointment.isDetailLoading);
  const appointmentFiltersData = useSelector((state: AppState) => state.appointment.appointmentFiltersData);
  const isFilterDataLoading = useSelector((state: AppState) => state.appointment.isFilterDataLoading);
  const selectedFilterList = useSelector((state: AppState) => state.appointment.selectedFilterList);
  const filters = useSelector((state: AppState) => state.appointment.filtersData);
  const { page } = filters;

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVisitType, setSelectedVisitType] = useState<any>(filters.visit_types||[]);
  const [selectedScreening, setSelectedScreening] = useState<any>(filters.screening_uuids||[]);
  const [selectedProviders, setSelectedProviders] = useState<any>(filters.providers_uuids||[]);
  const [selectedAppointmentUuid, setSelectedAppointmentUuid] = useState<string>('');
  const { ref, inView } = useInView();

  const loadMoreAppointment = (filter?: FiltersDataState) => {    
    dispatch(getAppointmentsList(filter || filters)).then(( response: any ) => {
      if(response?.payload?.results.length===0){
        setIsClearFilter(true);
      } else {
        setIsClearFilter(false);
      }
      
    })
    dispatch(updateFilter({ page: Number(page) + 1 }));
  };

  useEffect(() => {
    dispatch(getAppointmentsList(filters)).then(() => {
      setIsPatientNotFound(false);
    })
    dispatch(updateFilter({ page: Number(page) + 1 }));
  }, []);

  useEffect(() => {
    if (inView && isNextAppointmentsList) {
      loadMoreAppointment();
    }
  }, [inView]);

  const appointmentDetails = (id: any) => {
    dispatch(getAppointmentDetail({ appointment_id: id }));
  };

  const getAction = (value:string) => {
    switch (value) {
      case 'clinician_agrees':
        return { clinician_agrees: true };
      case 'clinician_disagrees':
        return { clinician_disagrees: true };
      case 'test_ordered':
        return { test_ordered: true };
      default:
        return {};
    }
  };

  const updateOutCome=(value:any,data:any,detail:any)=>{
    const {appointment_id, uuid} = detail;    
    const payload = {
      appointment_id: appointment_id,
      screening_id: uuid,
      action : getAction(value)
    }
    
    dispatch(updateAppointmentDetail(payload)).then(() => {
      toast.success("Successfully Updated");
      appointmentDetails(appointment_id);
    }).catch(() => {
      toast.error("Update failed");
    })
  }

  const handlePrint=()=>{
    console.log("print");
  }

  const handlePdf=()=>{
    console.log("PDF");
  }

  const getAppointmentFiltersData = () => {
    dispatch(getFiltersData());
    dispatch(getSelectedFilterList());
  }

  const resetFilters = (isFilterPopOpen: boolean = false) => {
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
    setPatientNameSearch('');
    if(!isFilterPopOpen) {
      setAnchorEl(null);
    }
  }

  const searchAppointmentPatientName = (e : any) => {    
    setPatientNameSearch(e.target.value);
  
    if(e?.target?.value?.length > 3) {
      const filters = {
        visit_types: [],
        providers_uuids: [],
        screening_uuids: [],
        page: 1,
        page_size: 10,
        patient_name: e.target.value
      };
      dispatch(updateFilter(filters));
      dispatch(emptyAppointmentList());
      loadMoreAppointment(filters);
    }
  }

  const getFilterDetail = (filter: any) => {
    dispatch(getSelectedFilterDetail(filter.uuid)).then((response:any) => {
      console.log('e:--',response);
      const { payload } = response || {};
      if(!payload) return;
      
    })
  }
  
  return (
    <>
      <MainBoxTop>
        <HeadingTag variant="h1" sx={{ margin: "0" }}>
          My Schedule
        </HeadingTag>
        <RightPrint>
          <RightBox>
            <ArrowBackIosNewIcon style={{ fontSize: "15px" }} />
          </RightBox>
          <Box>
            <Calender />
          </Box>
          <RightBox>
            <ArrowForwardIosIcon style={{ fontSize: "15px" }} />
          </RightBox>
          <RightBox onClick={() => handlePdf()}>
            <SaveAltIcon sx={{ fontSize: "20px", marginRight: "5px" }} />
            <TypoSpan variant="caption">PDF</TypoSpan>
          </RightBox>
  
          <RightBox onClick={() => handlePrint()}>
            <PrintOutlinedIcon style={{ fontSize: "20px", marginRight: "5px" }} />
            <TypoSpan variant="caption">Print</TypoSpan>
          </RightBox>
        </RightPrint>
      </MainBoxTop>
  
      <TableDiv>
        <TableTopMain>
          <FilterMenu>
            <FilterButton 
              getAppointmentFiltersData={getAppointmentFiltersData} 
              appointmentFiltersData={appointmentFiltersData} 
              isFilterDataLoading={isFilterDataLoading} 
              loadMoreAppointment={loadMoreAppointment} 
              filters={filters} 
              selectedFilterList={selectedFilterList} 
              setSelectedVisitType={setSelectedVisitType}
              setSelectedScreening={setSelectedScreening}
              setSelectedProviders={setSelectedProviders}
              setAnchorEl={setAnchorEl}
              anchorEl={anchorEl}
              selectedVisitType={selectedVisitType}
              selectedScreening={selectedScreening}
              selectedProviders={selectedProviders}
              resetFilters={resetFilters}
              getFilterDetail={getFilterDetail}
            />
          </FilterMenu>
          <TableTop>
            <Input
              sx={{
                "&::before, &::after": { display: "none" },
                border: "none",
                padding: "10px",
                width: "100%",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "14px",
                color: "#5C6469",
              }}
              id="input-with-icon-adornment"
              placeholder="Search by patient name or MRN"
              value={patientNameSearch}
              onChange={(e)=>searchAppointmentPatientName(e)}
              startAdornment={
                <>
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#0D426A" }} />
                  </InputAdornment>

                  {patientNameSearch.length > 0 && <InputAdornment position="end">
                    <SearchClearIcon onClick={() => resetFilters()}><CloseIcon sx={{ color: "#0D426A" }} /></SearchClearIcon>
                  </InputAdornment>}
                </>
              }
            />
          </TableTop>
        </TableTopMain>
        {(isPatientNotFound || isClearFilter) && (
          <TableOtherContainer sx={{ m: "30px 0" }}>
            <Table aria-label="collapsible table">
              <Table_Head sx={{ backgroundColor: "#17236D", color: "#fff" }}>
                <TableRow>
                  <StyledTableCell>
                    Appt Time{" "}
                    <ArrowDownwardIcon
                      style={{ verticalAlign: "middle", fontSize: "18px" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    Patient Name{" "}
                    <ArrowDownwardIcon
                      style={{ verticalAlign: "middle", fontSize: "18px" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell>Type of Visit</StyledTableCell>
                  <StyledTableCell>Screening</StyledTableCell>
                  <StyledTableCell>Providers</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </Table_Head>
              <TableBody>
                <PatientNotFound icon={isClearFilter} resetFilters={resetFilters}/>
              </TableBody>
            </Table>
          </TableOtherContainer>
        )}
  
        {!isPatientNotFound && !isClearFilter && (
          <TableMainContainer sx={{ m: "30px 0" }}>
            <Table aria-label="collapsible table">
              <Table_Head sx={{ backgroundColor: "#17236D", color: "#fff" }}>
                <TableRow>
                  <StyledTableCell>
                    Appt Time{" "}
                    <ArrowDownwardIcon
                      style={{ verticalAlign: "middle", fontSize: "18px" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    Patient Name{" "}
                    <ArrowDownwardIcon
                      style={{ verticalAlign: "middle", fontSize: "18px" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell>Type of Visit</StyledTableCell>
                  <StyledTableCell>Screening</StyledTableCell>
                  <StyledTableCell>Providers</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </Table_Head>
              <TableBody>
                {appointmentsList.map(
                  (appointment: AppointmentState, index: number) => (
                    <Row
                      key={index}
                      appointment={appointment}
                      selectedAppointmentUuid={selectedAppointmentUuid}
                      setSelectedAppointmentUuid={setSelectedAppointmentUuid}
                      appointmentDetail={appointmentDetail}
                      appointmentDetails={appointmentDetails}
                      updateOutCome={updateOutCome}
                      isDetailLoading={isDetailLoading}
                    />
                  )
                )}
              </TableBody>
            </Table>
            <div ref={ref}></div>
          </TableMainContainer>
        )}
      </TableDiv>
    </>
  );
  
};

export default CollapsibleTable;
