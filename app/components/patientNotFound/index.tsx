'use client'
import { StyledTableCell } from "@/app/styles/customStyle";
import { Box, Button, Container } from "@mui/material";
import TableRow from '@mui/material/TableRow';
import { QuestionMarkIcon, SearchNotFoundIcon } from '../../images/index';


const PatientNotFound = (props : any) => {
   const {icon} = props

   return ( 
    <> 
    {icon?
    <TableRow>
    <StyledTableCell  sx={{textAlign:'center', color:'#000'}} colSpan={6}>
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            gap:'10px',
            alignItems:'center',
            paddingTop:'30px 10px 30px 10px'
        }}>
            <QuestionMarkIcon/>
        <Box component={'h2'}>
              We can't seem to find the patient you are looking for.
        </Box>
        <Box >
            Modify your search criteria and search again.
        </Box>
        <Button variant="outlined">Clear Search</Button>
    
        </Box>
    </StyledTableCell>
    </TableRow>
    :<TableRow>
    <StyledTableCell  sx={{textAlign:'center', color:'#000'}} colSpan={6}>
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            gap:'10px',
            alignItems:'center',
            paddingTop:'30px 10px 30px 10px'
        }}>
            <SearchNotFoundIcon/>
        <Box component={'h2'}>
             No Appointments for today.
        </Box>
        <Box>
            Try refreshing the page after some time.
        </Box>      
        </Box>
    </StyledTableCell>
    </TableRow> }
     </>
   
   )
  };
  
  export default PatientNotFound;