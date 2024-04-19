'use client'
import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import {BorderLinearProgress, HeadingTag, IconProgress, ProviderCell, SpanText, SpanTextC, SpanTextCopd, SpanTextD, StyledCopy, StyledName, StyledTableCell, StyledTableRow, StyledText, TableMainContainer, TdTableCell} from  '../../styles/customStyle'; 
import { getAppointmentsList } from "@/app/redux/actions/appointment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { Stack } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { AppointmentState } from '../../redux/slices/appointment';
import { AppState } from '../../redux/store';

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

function getTime (timestamp:string) {
  var d = new Date();
  var hr = d.getHours();
  var min = d.getMinutes();

  var ampm = "am";
  if( hr > 12 ) {
      hr -= 12;
      ampm = "pm";
  }
  return hr + ":" + min + " " +ampm ;
}

function Row(props: any) {
  const { appointment } = props;
  const [open, setOpen] = React.useState(false);

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
              <BorderLinearProgress variant="determinate" value={50} /> 
            </Stack>

            <ProviderCell>{appointment.selected_gap_count}/{appointment.gap_count}</ProviderCell>
            <IconButton
              aria-label="expand appointment"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </IconProgress>
        </TdTableCell>
      </StyledTableRow>

      

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {appointment.history.map((historyRow: any) => (
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
                  ))} */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const appointmentsList = useSelector(( state: AppState ) => state.appointment?.appointmentsData?.results) || [];

  useEffect(() => {
    dispatch(getAppointmentsList({
      page_size: 10,
      page: page
    }));
  }, []);

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
              <Row key={appointment.uuid} appointment={appointment} />
            ))}
        </TableBody>
      </Table>
      </TableMainContainer>
    </>
  );
}

function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}