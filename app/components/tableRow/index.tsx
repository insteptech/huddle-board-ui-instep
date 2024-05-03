'use client'
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { 
    Stack, 
    IconButton, 
    TableRow, 
    TableCell, 
    Collapse, 
    Table, 
    TableHead, 
    TableBody, 
    Tooltip,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { 
    FontBold, 
    StyledText, 
    StyledTableRow, 
    TdTableCell, 
    StyledName, 
    StyledCopy, 
    IconProgress,
    BorderLinearProgress, 
    ProviderCell, 
    TableMidData, 
    SpanText, 
    ActionBtn, 
    Text, 
    StyledMuiButton ,
    StyledPatient
} from '@/app/styles/customStyle';

import { getOutComeBtnState } from '@/app/utils/appointment';
import { getTime } from '@/app/utils/helper';


interface MyButtonProps {
    buttonState: any;
    onClick: () => void;
    children: React.ReactNode;
}

const outComes = [{name:"Clinician Agrees", key:"clinician_agrees"},{name:"Clinician Disagrees",key:"clinician_disagrees"},{name:"Test Ordered",key:"test_ordered"}]
  
const MyButton: React.FC<MyButtonProps> = ({ buttonState, onClick, children }: any) => {
    return (
        <StyledMuiButton buttonState={buttonState} onClick={onClick}>
        {children}
        </StyledMuiButton>
    );
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

const Row = ( props: any) => { 
const { appointment, selectedAppointmentUuid, setSelectedAppointmentUuid, appointmentDetails, appointmentDetail, updateOutCome, isDetailLoading } = props;
const [open, setOpen] = useState(false);
const [isCopied, setIsCopied] = useState(false);

const setRow = (id: any) => {
    setSelectedAppointmentUuid(id);
    appointmentDetails(id);
    setOpen(!open);
};

const copyMrn = (mrn: any) => {
    navigator.clipboard.writeText(mrn);
    setIsCopied(true);
}

const renderCellContent = (content: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined, isBold: boolean) => (
    isBold ? <FontBold>{content}</FontBold> : <StyledText>{content}</StyledText>
);

return (
    <>
    <StyledTableRow sx={{ '& > *': { borderBottom: 'unset', backgroundColor: (open && selectedAppointmentUuid === appointment.uuid)? '#D2E6FF' : '#fff'  } }}>
        <TdTableCell>
        {renderCellContent(getTime(appointment.appointment_timestamp), appointment.selected_gap_count === 0)}
        </TdTableCell>
        <TdTableCell>
        <StyledName>
        <StyledPatient>{renderCellContent(appointment.patient_name, appointment.selected_gap_count === 0)}</StyledPatient>
            <StyledCopy>
            MRN: {appointment.mrn}
                <Tooltip title={isCopied ? "Copied" : "Copy"} placement="top">
                    <ContentCopyIcon
                        onClick={() => copyMrn(appointment.mrn)}
                        sx={{ verticalAlign: 'middle', color: '#17236D', fontSize: '15px', marginLeft: '5px' }}
                    />
                </Tooltip>
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
                {open && selectedAppointmentUuid === appointment.uuid ? <><Tooltip title="Collapse" placement="top"><KeyboardArrowUpIcon /></Tooltip></> : <><Tooltip title="Expand" placement="top"><KeyboardArrowDownIcon /></Tooltip></>}
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
                    <TableMidData  sx={{ width: '430px' }}>Outcome</TableMidData>
                </TableRow>
                </TableHead>
                <TableBody>
                {!isDetailLoading && appointmentDetail.map((detail:any) => (
                    <TableRow key={detail.uuid}>
                        <TableMidData><SpanText>{detail.screening}</SpanText></TableMidData>
                        <TableMidData><ActionBtn>{detail.action}</ActionBtn></TableMidData>
                        <TableMidData><Text>{detail.description}</Text></TableMidData>
                        <TableMidData  sx={{ width: '430px' }}>
                        {outComes.map((item,index)=>(
                            <MyButton
                                key={index}
                                buttonState={getOutComeBtnState(detail,item.key)}
                                onClick={() => updateOutCome(item.key, getOutComeBtnState(detail,item.key), detail)}>
                            {item.name}
                            </MyButton>
                        ))}
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

export default Row;