'use client'
import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {DisableBtn,Table_Head,FontBold,EnableBtn,ActionBtn,TablemidData,TableMid,Text,OtBtn,BorderLinearProgress, HeadingTag, IconProgress, ProviderCell, SpanText, StyledCopy, StyledName, StyledTableCell, StyledTableRow, StyledText, TableMainContainer, TdTableCell} from  '../../styles/customStyle'; 
import { getAppointmentDetail, getAppointmentsList } from "@/app/redux/actions/appointment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { Stack } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { AppointmentState } from '../../redux/slices/appointment';
import { AppState } from '../../redux/store';
import { useInView } from "react-intersection-observer";
import { getTime } from '../../utils/helper';

type AppointmentListProps = {
  initialAppointments: AppointmentState[]
}

function GetScreening ({ screening } :string [] | any) {
  return (
    <>
    {screening.length && screening.map((screen: string, index: number)=> (
      <>{index< 3 && <SpanText>{screen}</SpanText>}</>
    ))}
    {screening.length > 2 &&<SpanText>+ {screening.length - 3}</SpanText>}
    </>
  );
}

function Row(props: any) {
  const { appointment, selectedAppointmentUuid, setSelectedAppointmentUuid, appointmentDetails, appointmentDetail } = props;
  const [open, setOpen] = React.useState(false);  

  const setRow = (id:string) => {
    setSelectedAppointmentUuid(id);
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
          <StyledName><FontBold> {appointment.patient_name}</FontBold></StyledName>
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
              onClick={() => setRow(appointment.uuid)}
            >
              {open && selectedAppointmentUuid === appointment.uuid ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </IconProgress>
        </TdTableCell>
      </StyledTableRow>

      

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0,padding:'0', }} colSpan={6}>
          <Collapse in={open && selectedAppointmentUuid === appointment.uuid}  timeout="auto" unmountOnExit>
            <Box>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableMid>Screening</TableMid>
                    <TableMid>Action</TableMid>
                    <TableMid>Reason</TableMid>
                    <TableMid>Outcome</TableMid>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {appointmentDetail.length > 0 && appointmentDetail.map((detail: any) => {
                        return (
                            <TableRow id={detail.uuid}>
                            <TablemidData>
                            <SpanText>{detail.screening}</SpanText>
                            </TablemidData>

                            <TablemidData>
                            <ActionBtn>{detail.action}</ActionBtn> 
                            </TablemidData>

                            <TablemidData>
                            <Text>{detail.description}</Text>
                            </TablemidData>

                            <TablemidData>
                            <OtBtn>Clinician Agrees</OtBtn>
                            <OtBtn>Clinician Disagrees</OtBtn>
                            <OtBtn>Test Ordered</OtBtn>
                            </TablemidData>
                            
                          </TableRow>
                      )
                    })
                    }
                </TableBody>
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

  const [selectedAppointmentUuid, setSelectedAppointmentUuid] = useState<string>('');
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
        <Table_Head sx={{ backgroundColor: "#17236D", color: "#fff" }}>
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
        </Table_Head>
        <TableBody>
        {appointmentsList.map((appointment: AppointmentState) => (
              <Row key={appointment.uuid} appointment={appointment} selectedAppointmentUuid={selectedAppointmentUuid} setSelectedAppointmentUuid={setSelectedAppointmentUuid} appointmentDetail={appointmentDetail} appointmentDetails={appointmentDetails}/>
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
