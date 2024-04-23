'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useInView } from 'react-intersection-observer';
import { getAppointmentDetail, getAppointmentsList } from '@/app/redux/actions/appointment';
import { AppDispatch, AppState } from '@/app/redux/store';

import {
  HeadingTag,
  TableMainContainer,
  Table_Head,
  StyledTableCell,
  StyledTableRow,
  StyledText,
  StyledName,
  StyledCopy,
  IconProgress,
  BorderLinearProgress,
  ProviderCell,
  TableMidData,
  ActionBtn,
  Text,
  StyledCustomButton,
  TdTableCell,
  SpanText,
  FontBold,
  EnableBtn,
  DisableBtn
} from '../../styles/customStyle';
import { AppointmentState } from '@/app/redux/slices/appointment';
import { getTime } from '@/app/utils/helper';

type AppointmentListProps = {
  initialAppointments: AppointmentState[];
};

function GetScreening({ screening }: { screening: string[] }) {
  return (
    <>
      {screening.slice(0, 3).map((screen, index) => (
        <SpanText key={index}>{index < 3 ? screen : ''}</SpanText>
      ))}
      {screening.length > 3 && <SpanText>+ {screening.length - 3}</SpanText>}
    </>
  );
}

function Row(props: any) {
  const { appointment, selectedAppointmentUuid, setSelectedAppointmentUuid, appointmentDetails, appointmentDetail } = props;
  const [open, setOpen] = useState(false);

  const setRow = (id: any) => {
    setSelectedAppointmentUuid(id);
    appointmentDetails(id);
    setOpen(!open);
  };

  const renderCellContent = (content: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined, isBold: boolean) => (
    isBold ? <FontBold>{content}</FontBold> : <StyledText>{content}</StyledText>
  );

  return (
    <>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TdTableCell>
          {renderCellContent(getTime(appointment.appointment_timestamp), appointment.selected_gap_count === 0)}
        </TdTableCell>
        <TdTableCell>
          <StyledName>
            {renderCellContent(appointment.patient_name, appointment.selected_gap_count === 0)}
            <StyledCopy>
              {appointment.mrn}
              <ContentCopyIcon
                onClick={() => navigator.clipboard.writeText(appointment.mrn)}
                sx={{ verticalAlign: 'middle', color: '#17236D', fontSize: '15px', marginLeft: '5px' }}
              />
            </StyledCopy>
          </StyledName>
        </TdTableCell>
        <TdTableCell>{renderCellContent(appointment.visit_type, appointment.selected_gap_count === 0)}</TdTableCell>
        <TdTableCell><GetScreening screening={appointment.screening} /></TdTableCell>
        <TdTableCell>{renderCellContent(appointment.provider, appointment.selected_gap_count === 0)}</TdTableCell>
        <TdTableCell>
          <IconProgress>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <BorderLinearProgress variant="determinate" value={(appointment.selected_gap_count / appointment.gap_count) * 100} />
            </Stack>
            <ProviderCell>{`${appointment.selected_gap_count}/${appointment.gap_count}`}</ProviderCell>
            <IconButton aria-label="expand appointment" size="small" onClick={() => setRow(appointment.uuid)}>
              {open && selectedAppointmentUuid === appointment.uuid ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </IconProgress>
        </TdTableCell>
      </StyledTableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, padding: '0' }} colSpan={6}>
          <Collapse in={open && selectedAppointmentUuid === appointment.uuid} timeout="auto" unmountOnExit>
            <Box>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableMidData>Screening</TableMidData>
                    <TableMidData>Action</TableMidData>
                    <TableMidData>Reason</TableMidData>
                    <TableMidData>Outcome</TableMidData>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointmentDetail.map((detail:any) => (
                    <TableRow key={detail.uuid}>
                      <TableMidData><SpanText>{detail.screening}</SpanText></TableMidData>
                      <TableMidData><ActionBtn>{detail.action}</ActionBtn></TableMidData>
                      <TableMidData><Text>{detail.description}</Text></TableMidData>
                      <TableMidData>
                        <StyledCustomButton>Clinician Agrees</StyledCustomButton>
                        <DisableBtn>Clinician Disagrees</DisableBtn>
                        <EnableBtn>Test Ordered</EnableBtn>
                      </TableMidData>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

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
  }, []);

  useEffect(() => {
    if (inView && isNextAppointmentsList) {
      loadMoreAppointment();
    }
  }, [inView]);

  const appointmentDetails = (id: any) => {
    dispatch(getAppointmentDetail({ appointment_id: id }));
  };

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
            {appointmentsList.map((appointment: AppointmentState) => (
              <Row
                key={appointment.uuid}
                appointment={appointment}
                selectedAppointmentUuid={selectedAppointmentUuid}
                setSelectedAppointmentUuid={setSelectedAppointmentUuid}
                appointmentDetail={appointmentDetail}
                appointmentDetails={appointmentDetails}
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
