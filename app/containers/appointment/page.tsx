'use client'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { 
    BorderLinearProgress, HeadingTag, IconProgress, ProviderCell, 
    SpanText, SpanTextC, SpanTextCopd, SpanTextD, StyledCopy, 
    StyledName, StyledTableCell, StyledTableRow, StyledText, 
    TableMainContainer, TdTableCell 
} from '../../styles/customStyle'; 

import { getAppointmentsList, getAppointmentDetail } from "@/app/redux/actions/appointment";
import { AppDispatch } from "@/app/redux/store";
import { AppointmentState } from '../../redux/slices/appointment';
import { AppState } from '../../redux/store';
import { getTime } from '../../utils/helper';
import { useInView } from "react-intersection-observer";

type AppointmentListProps = {
  initialAppointments: AppointmentState[]
}
const NUMBER_OF_USERS_TO_FETCH = 10

function GetScreening ({ screening } :string [] | any) {
  return (
    <>
      {screening.includes("PVD") &&
        <SpanText>PVD</SpanText>
      }
      {screening.includes("COPD") &&
        <SpanTextCopd>"COPD"</SpanTextCopd>
      }

      {screening.includes("Diabetes") &&
        <SpanTextD>Diabetes</SpanTextD>
      }

      {screening.includes("CHF") &&
      <SpanTextC>CHF</SpanTextC>
      }
    </>
  );
}

function Row(props: any) {
  const { appointment, selectedAppointment, setSelectedAppointment, appointmentDetails, appointmentDetail } = props;
  const [open, setOpen] = React.useState(false);

  const setRow = (id:string) => {
    setSelectedAppointment(id);
    appointmentDetails(id);
    setOpen(!open)
  }

  return (
    <React.Fragment>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TdTableCell>
          <StyledText> {getTime(appointment.appointment_timestamp)}</StyledText>
        </TdTableCell>
        <TdTableCell>
          <StyledName> {appointment.patient_name}</StyledName>
          <StyledCopy>
          {appointment.mrn}
            <ContentCopyIcon
              onClick={() => {navigator.clipboard.writeText(appointment.mrn)}}
              sx={{
                verticalAlign: "middle",
                color: "#17236D",
                fontSize: "15px",
                marginLeft:'5px',
              }}
            />
          </StyledCopy>
        </TdTableCell>

        <TdTableCell>
          <StyledText> {appointment.visit_type}</StyledText>
        </TdTableCell>

        <TdTableCell>
          <GetScreening screening={appointment.screening} />
        </TdTableCell>

        <TdTableCell>
          <StyledText>{appointment.provider}</StyledText>
        </TdTableCell>

        <TdTableCell>
          <IconProgress>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <BorderLinearProgress variant="determinate" value={( appointment.selected_gap_count / appointment.gap_count )* 100} /> 
            </Stack>

            <ProviderCell>{appointment.selected_gap_count}/{appointment.gap_count}</ProviderCell>
            <IconButton
              aria-label="expand appointment"
              size="small"
              onClick={() => setRow(appointment.uuid)}
            >
              {open && selectedAppointment === appointment.uuid ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </IconProgress>
        </TdTableCell>
      </StyledTableRow>

      

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open && selectedAppointment === appointment.uuid} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Appointment Detail
              </Typography>
              <Table size="small" aria-label="purchases">
                {/* <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointment.history.map((historyRow: any) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="appointment">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell>{historyRow.amount}</TableCell>
                      <TableCell>
                        {Math.round(historyRow.amount * appointment.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody> */}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ initialAppointments } : AppointmentListProps) {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const appointmentsList = useSelector(( state: AppState ) => state.appointment?.appointmentsData?.results) || [];
  const totalAppointmentCount = useSelector(( state: AppState ) => state.appointment?.appointmentsData?.count) || 0;
  const appointmentDetail = useSelector(( state: AppState ) => state.appointment?.appointmentDetail) || [];

  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentState[]>(initialAppointments);
  const { ref, inView } = useInView();

  const loadMoreAppointment = () => {
    dispatch(getAppointmentsList({ page: page, page_size: 10}));
    setPage(page + 1);
  }

  useEffect(() => {
    dispatch(getAppointmentsList({
      page_size: 10,
      page: page
    }));
    loadMoreAppointment()

  }, []);

  useEffect(() => {
    if (inView && totalAppointmentCount < appointmentsList.length) {
      loadMoreAppointment()
    }
  }, [inView])


  const appointmentDetails = (id:string) => {
    dispatch(getAppointmentDetail({
      appointment_id: id
    }));
  }

  return (
    <>
      <HeadingTag variant="h1">
        My Schedule
      </HeadingTag>

      <TableMainContainer sx={{ m: "30px 0" }}>
      <Table aria-label="collapsible table">
        <TableHead sx={{ backgroundColor: "#17236D", color: "#fff" }}>
          <TableRow>
            <StyledTableCell>
              Appt Time
              <ArrowDownwardIcon
                style={{ verticalAlign: "middle", fontSize: "18px" }}
              />
            </StyledTableCell>
            <StyledTableCell>
              Patient Name
              <ArrowDownwardIcon
                style={{ verticalAlign: "middle", fontSize: "18px" }}
              />
            </StyledTableCell>
            <StyledTableCell>Type of Visit</StyledTableCell>
            <StyledTableCell>Screening</StyledTableCell>
            <StyledTableCell>Providers</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {appointmentsList.map((appointment: AppointmentState) => (
              <Row key={appointment.uuid} appointment={appointment} selectedAppointment={selectedAppointment} setSelectedAppointment={setSelectedAppointment} appointmentDetail={appointmentDetail} appointmentDetails={appointmentDetails}/>
            ))}
        </TableBody>
      </Table>
      </TableMainContainer>
      <div ref={ref}></div>
    </> 
  );
}
