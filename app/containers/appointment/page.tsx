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

import {BorderLinearProgress, IconProgress, ProviderCell, SpanText, SpanTextC, SpanTextCopd, SpanTextD, StyledCopy, StyledName, StyledTableCell, StyledTableRow, StyledText, TableMainContainer, TdTableCell} from  '../../styles/customStyle'; 
import { getAppointmentsList } from "@/app/redux/actions/appointment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { Stack } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

let data = [
  {
    time: "09:30 AM",
    name: "Alex Gates",
	copydata: "MRN: 127206374",
    TypeofVisit: "New Patient",
    Screening: "PVD",
    Providers: "Dr. Sam Jones",
    action: "0/1",
    
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  },


    {
    time: "09:30 AM",
    name: "Alex Gates",
	copydata: "MRN: 127206374",
    TypeofVisit: "New Patient",
    Screening: "PVD",
    Screening2: "COPD",
    Providers: "Dr. Sam Jones",
    action: "0/1",
    
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  },


  {
    time: "09:30 AM",
    name: "Alex Gates",
	copydata: "MRN: 127206374",
    TypeofVisit: "New Patient",
    Screening: "PVD",
    ScreeningD: "Diabetes",
    ScreeningC: "CHF",
    Providers: "Dr. Sam Jones",
    action: "0/1",
    
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  },



  {
    time: "09:30 AM",
    name: "Alex Gates",
	copydata: "MRN: 127206374",
    TypeofVisit: "New Patient",
    Screening: "PVD",
    Providers: "Dr. Sam Jones",
    action: "0/1",
    
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  },


  {
    time: "09:30 AM",
    name: "Alex Gates",
	copydata: "MRN: 127206374",
    TypeofVisit: "New Patient",
    Screening: "PVD",
    ScreeningD: "Diabetes",
    ScreeningC: "CHF",
    Providers: "Dr. Sam Jones",
    action: "0/1",
    
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  },


  {
    time: "09:30 AM",
    name: "Alex Gates",
	copydata: "MRN: 127206374",
    TypeofVisit: "New Patient",
    Screening: "PVD",
    Providers: "Dr. Sam Jones",
    action: "0/1",
    
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  },



  {
    time: "09:30 AM",
    name: "Alex Gates",
	copydata: "MRN: 127206374",
    TypeofVisit: "New Patient",
    Screening: "PVD",
    ScreeningD: "Diabetes",
    ScreeningC: "CHF",
    Providers: "Dr. Sam Jones",
    action: "0/1",
    
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  },

  {
    time: "09:30 AM",
    name: "Alex Gates",
	copydata: "MRN: 127206374",
    TypeofVisit: "New Patient",
    Screening: "PVD",
    Screening2: "COPD",
    Providers: "Dr. Sam Jones",
    action: "0/1",
    
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  },




  {
    time: "09:30 AM",
    name: "Alex Gates",
	copydata: "MRN: 127206374",
    TypeofVisit: "New Patient",
    Screening: "PVD",
    ScreeningD: "Diabetes",
    ScreeningC: "CHF",
    Providers: "Dr. Sam Jones",
    action: "0/1",
    
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  },

  

];

function Row(props: any) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TdTableCell>
          <StyledText> {row.time}</StyledText>
        </TdTableCell>
        <TdTableCell>
          <StyledName> {row.name}</StyledName>
          <StyledCopy>
      
          {row.copydata}
            <ContentCopyIcon
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
          <StyledText> {row.TypeofVisit}</StyledText>
        </TdTableCell>

        <TdTableCell>
          <SpanText>{row.Screening}</SpanText>
          {row.Screening2&&
           <SpanTextCopd>{row.Screening2}</SpanTextCopd>
          }

          {row.ScreeningD&&
           <SpanTextD>{row.ScreeningD}</SpanTextD>
          }

         {row.ScreeningC&&
           <SpanTextC>{row.ScreeningC}</SpanTextC>
          }
         
        </TdTableCell>

        <TdTableCell>
      
          <StyledText>{row.Providers} </StyledText>
        </TdTableCell>

        <TdTableCell>
          <IconProgress>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <BorderLinearProgress variant="determinate" value={50} />
            </Stack>

            <ProviderCell>{row.action}</ProviderCell>
            <IconButton
              aria-label="expand row"
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
                  {row.history.map((historyRow: any) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell>{historyRow.amount}</TableCell>
                      <TableCell>
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
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
  const appointmentsList = useSelector((state:any) => state.appointment?.appointmentsData?.results)

  useEffect(() => {
    dispatch(getAppointmentsList({
      page_size: 10,
      page: page
    }));
  }, []);

  return (
    <TableMainContainer component={Paper} sx={{ m: "30px 0" }}>
      <Table aria-label="collapsible table">
        <TableHead sx={{ backgroundColor: "#17236D", color: "#fff" }}>
          <TableRow>
            <StyledTableCell>
              Appt Time{" "}
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
          {data.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableMainContainer>
  );
}

function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
