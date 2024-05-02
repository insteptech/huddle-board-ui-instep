'use client'
import { StyledTableCell } from "@/app/styles/customStyle";
import { Box, Button, Container } from "@mui/material";
import TableRow from '@mui/material/TableRow';
import { QuestionMarkIcon, SearchNotFoundIcon } from '../../images/index';
import {

    MainBox,
    MainBoxheading,
    MainBoxsubheading,
    StyledTablecenter,
    ClearButton,
  
  } from '../../styles/customStyle';


const PatientNotFound = (props : any) => {
   const {icon} = props

   return ( 
    <> 
    {icon?
    <TableRow>
 <StyledTablecenter  sx={{textAlign:'center', color:'#000'}} colSpan={6}>
 <MainBox>
            <QuestionMarkIcon/>
        <MainBoxheading variant="h2">
              We can't seem to find the patient you are looking for.
        </MainBoxheading>
        <MainBoxsubheading >
            Modify your search criteria and search again.
        </MainBoxsubheading>
        <ClearButton>Clear Search</ClearButton>
    
        </MainBox>
    </StyledTablecenter>
    </TableRow>
    :<TableRow>
    <StyledTablecenter  sx={{textAlign:'center', color:'#000'}} colSpan={6}>
        <MainBox>
            <SearchNotFoundIcon/>
        <MainBoxheading variant='h2'>
             No Appointments for today.
        </MainBoxheading>
        <MainBoxsubheading>
            Try refreshing the page after some time.
        </MainBoxsubheading>      
        </MainBox>
    </StyledTablecenter>
    </TableRow> }
     </>
   
   )
  };
  
  export default PatientNotFound;