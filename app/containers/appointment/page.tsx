'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useInView } from 'react-intersection-observer';
import { getAppointmentDetail, getAppointmentsList, updateAppointmentDetail } from '@/app/redux/actions/appointment';
import { AppDispatch, AppState } from '@/app/redux/store';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import FilterButton from "@/app/components/filter";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import SearchIcon from '@mui/icons-material/Search';

import {
  HeadingTag,
  TableMainContainer,
  Table_Head,
  StyledTableCell,
  TableDiv,
  TableTopmain,
  TableTop,
  FilterMenu,

} from '../../styles/customStyle';
import { AppointmentState } from '@/app/redux/slices/appointment';
import { Box, Input, InputAdornment } from '@mui/material';
import PatientNotFound from '@/app/components/patientNotFound';

const Row = dynamic(() => import('@/app/components/tableRow/index').then((mod) => mod), {
  ssr: false,
});

type AppointmentListProps = {
  initialAppointments: AppointmentState[];
};

const CollapsibleTable: React.FC<AppointmentListProps> = ({ initialAppointments }) => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const appointmentsList = useSelector((state: AppState) => state.appointment?.appointmentsData?.results) || [];
  const appointmentDetail = useSelector((state: AppState) => state.appointment?.appointmentDetail) || [];
  const isNextAppointmentsList = useSelector((state: AppState) => state.appointment?.appointmentsData?.next);
  const isDetailLoading = useSelector((state: AppState) => state.appointment.isDetailLoading);
  const isPatientNotFound = true;

  const [selectedAppointmentUuid, setSelectedAppointmentUuid] = useState<string>('');
  const { ref, inView } = useInView();

  const loadMoreAppointment = () => {
    dispatch(getAppointmentsList({ page: page, page_size: 10 }));
    setPage(page + 1);
  };

  useEffect(() => {
    dispatch(getAppointmentsList({ page_size: 10, page: page }));
    setPage(page + 1);
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
  return (
    <>
      {/* <HeadingTag variant="h1">My Schedule</HeadingTag> */}
      <Box component={'div'} sx={{
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
      marginTop:'20px'
    }}>
      <HeadingTag variant="h1" sx={{margin:'0'}}>
        My Schedule       
        </HeadingTag>
        <div style={{display:"flex" , flexDirection:"row" ,justifyContent: "end", gap: "10px" , alignItems:'center',flexWrap:'wrap'}}>  
       
        <Box        
        height={35}
                width={35}
                display="flex"
                alignItems="center"
                gap={1}
                p={1}
                sx={{ border: '1px solid #D0D5DD' , borderRadius:"8px",background:"#fff", cursor:"pointer",}}>
              <ArrowBackIosNewIcon style={{fontSize:"15px"}}/> 
        </Box>

       <Box height={35}
                width={35}
                display="flex"
                alignItems="center"
                gap={1}
                p={1}
                sx={{ border: '1px solid #D0D5DD' , borderRadius:"8px", background:"#fff",cursor:"pointer",}}>
                  <ArrowForwardIosIcon  style={{fontSize:"15px"}}/>
        </Box>
        <Box onClick={()=>handlePdf()}
          height={35}
                width={80}
                display="flex"
                alignItems="center"
                gap={1}
                p={1}
                sx={{ border: '1px solid #D0D5DD' , borderRadius:"8px", background:"#fff",cursor:"pointer",}}> 
              <SaveAltIcon 
              style={{fontSize:"15px"}}/>
              <span style={{fontSize:"14px",fontWeight:"600",lineHeight:"20px",cursor:"pointer",}}>PDF</span>
          </Box>
          
          <Box onClick={()=>handlePrint()}
            height={35}
                width={80}
                display="flex"
                alignItems="center"
                gap={1}
                p={1}
                sx={{ border: '1px solid #D0D5DD' , borderRadius:"8px", background:"#fff",cursor:"pointer",}}>
              <PrintOutlinedIcon style={{fontSize:"15px"}}/>
              <span style={{fontSize:"14px",fontWeight:"600",lineHeight:"20px",}}>Print</span>
          </Box>
      </div>     
      </Box>



      
      <TableDiv>
      <TableTopmain >

        <FilterMenu>
        <FilterButton />
        </FilterMenu>

        <TableTop >
        <Input sx={{"&::before, &::after":{display:'none'}, border: 'none', padding: '10px', width:'100%',fontSize: '14px',fontWeight: '400',lineHeight: '14px',color:'#5C6469',}}

          id="input-with-icon-adornment" placeholder="With sxSearch Patient Name.." inputProps={{ disableUnderline: true }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon  sx={{color:'#0D426A',}}/>
            </InputAdornment>
          }
        />

        </TableTop>

        </TableTopmain>
      <TableMainContainer sx={{ m: '30px 0' }}>
        <Table aria-label="collapsible table">
          <Table_Head sx={{ backgroundColor: '#17236D', color: '#fff' }}>
            <TableRow>
              <StyledTableCell>Appt Time <ArrowDownwardIcon style={{ verticalAlign: 'middle', fontSize: '18px' }} /></StyledTableCell>
              <StyledTableCell>Patient Name <ArrowDownwardIcon style={{ verticalAlign: 'middle', fontSize: '18px' }} /></StyledTableCell>
              <StyledTableCell>Type of Visit</StyledTableCell>
              <StyledTableCell>Screening</StyledTableCell>
              <StyledTableCell>Providers</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </Table_Head>
          <TableBody>
          {isPatientNotFound? <PatientNotFound icon = {false} />:appointmentsList.map((appointment: AppointmentState,index: number) => (
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
            ))}
          </TableBody>
        </Table>
        <div ref={ref}></div>
      </TableMainContainer>
   </TableDiv>
    </>
  );
};

export default CollapsibleTable;
