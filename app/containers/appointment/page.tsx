'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useInView } from 'react-intersection-observer';
import { getAppointmentDetail, getAppointmentsList, getFiltersData, updateAppointmentDetail } from '@/app/redux/actions/appointment';
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
  TableTopMain,
  TableTop,
  FilterMenu,
  TableOtherContainer,
  RightPrint,
  RightBox,
  MainBoxTop,
  TypoSpan
} from '../../styles/customStyle';
import { AppointmentState } from '@/app/redux/slices/appointment';
import { Input, InputAdornment } from '@mui/material';
import PatientNotFound from '@/app/components/patientNotFound';

const Row = dynamic(() => import('@/app/components/tableRow/index').then((mod) => mod), {
  ssr: false,
});

type AppointmentListProps = {
  initialAppointments: AppointmentState[];
};

const CollapsibleTable: React.FC<AppointmentListProps> = ({ initialAppointments }) => {
  const [page, setPage] = useState(1);
  const [isPatientNotFound, setIsPatientNotFound] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const appointmentsList = useSelector((state: AppState) => state.appointment?.appointmentsData?.results) || [];
  const appointmentDetail = useSelector((state: AppState) => state.appointment?.appointmentDetail) || [];
  const isNextAppointmentsList = useSelector((state: AppState) => state.appointment?.appointmentsData?.next);
  const isDetailLoading = useSelector((state: AppState) => state.appointment.isDetailLoading);
  const filtersData = useSelector((state: AppState) => state.appointment.filtersData);
  const isFilterDataLoading = useSelector((state: AppState) => state.appointment.isFilterDataLoading);

  const [selectedAppointmentUuid, setSelectedAppointmentUuid] = useState<string>('');
  const { ref, inView } = useInView();

  const loadMoreAppointment = () => {
    dispatch(getAppointmentsList({ page: page, page_size: 10 }));
    setPage(page + 1);
  };

  useEffect(() => {
    dispatch(getAppointmentsList({ page_size: 10, page: page })).then(() => {
      setIsPatientNotFound(false);
    })
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

  const getAppointmentFiltersData = () => {
    dispatch(getFiltersData());
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
            <FilterButton getAppointmentFiltersData={getAppointmentFiltersData} filtersData={filtersData} isFilterDataLoading={isFilterDataLoading}/>
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
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#0D426A" }} />
                </InputAdornment>
              }
            />
          </TableTop>
        </TableTopMain>
        {isPatientNotFound && (
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
                <PatientNotFound icon={false} />
              </TableBody>
            </Table>
          </TableOtherContainer>
        )}
  
        {!isPatientNotFound && (
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
