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

import {
  HeadingTag,
  TableMainContainer,
  Table_Head,
  StyledTableCell,
} from '../../styles/customStyle';
import { AppointmentState } from '@/app/redux/slices/appointment';
import dynamic from 'next/dynamic';

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
      appointmentDetails(appointment_id);
    })
  }

  return (
    <>
      <HeadingTag variant="h1">My Schedule</HeadingTag>
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
            {appointmentsList.map((appointment: AppointmentState,index: number) => (
              <Row
                key={index}
                appointment={appointment}
                selectedAppointmentUuid={selectedAppointmentUuid}
                setSelectedAppointmentUuid={setSelectedAppointmentUuid}
                appointmentDetail={appointmentDetail}
                appointmentDetails={appointmentDetails}
                updateOutCome={updateOutCome}
              />
            ))}
          </TableBody>
        </Table>
        <div ref={ref}></div>
      </TableMainContainer>
    </>
  );
};

export default CollapsibleTable;
