import { TableCell, styled, Typography, linearProgressClasses, LinearProgress, TableContainer } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import { cursorTo } from "readline";

export const StyledTableCell = styled(TableCell)
(({ theme }: any) => (
  {
    
  color:'#fff',
  fontSize: '12px',
  fontWeight: '600',
  lineHeight: '14.62px',
   
  }
)
);



export const TdTableCell = styled(TableCell)
(({ theme }: any) => (
  {
    
    borderBottom: 'none',
    
  }
)
);



export const TableMainContainer = styled(TableContainer)
(({ theme }: any) => (
  {
    
    boxShadow:'none',
    backgroundColor: 'transparent',

  }
)
);




export const StyledText = styled(Typography)(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '700',
  lineHeight: '20px',
  color:'#475467',
}));
 


export const StyledTableRow = styled(TableRow)(({ div }: any) => ({
  
  margin:'20px',
  boxShadow: '0px 2px 5px 0px #0000000D',
  background:'#fff',
  "&:hover": {
    background: '#F0F2FF',
    boxShadow: '0px 4px 4px 0px #00000040',
    cursor:'pointer'
  },
}));






export const StyledName = styled(Typography)(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '700',
  lineHeight: '20px',
  color:'#17236D',

}));


export const StyledCopy = styled(Typography)(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '20px',
  color:'#475467',
}));

export const IconProgress = styled(Typography)(({ div }: any) => ({

  display: 'flex',
  alignItems:'center',
}));


export const ProviderCell = styled(Typography)(({ div }: any) => ({
marginLeft:'10px',
fontSize: '14px',
fontWeight: '500',
lineHeight: '20px',
color:'#344054',
}));





export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 7,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#FFAE64' : '#EAECF0',
  },
}));


export const SpanText = styled(Typography)(({ div }: any) => ({
  border: '1px solid #E9D7FE',
  fontSize: '12px',
  fontWeight: '500',
  lineHeight: '18px',
  textAlign: 'center',
  padding:'2px 12px',
  display: 'inline-block',
  borderRadius: '16px',
  color:'#6941C6',
  background:'#F9F5FF',
}));


export const SpanTextCopd = styled(Typography)(({ div }: any) => ({
  border: '1px solid #FCCEEE',
  fontSize: '12px',
  fontWeight: '500',
  lineHeight: '18px',
  textAlign: 'center',
  padding:'2px 12px',
  display: 'inline-block',
  borderRadius: '16px',
  color:'#C11574',
  background:'#FDF2FA',
  marginLeft:'5px',
}));

export const SpanTextC = styled(Typography)(({ div }: any) => ({
  border: '1px solid #C7D7FE',
  fontSize: '12px',
  fontWeight: '500',
  lineHeight: '18px',
  textAlign: 'center',
  padding:'2px 12px',
  display: 'inline-block',
  borderRadius: '16px',
  color:'#3538CD',
  background:'#EEF4FF',
  marginLeft:'5px',
}));


export const SpanTextD= styled(Typography)(({ div }: any) => ({
  border: '1px solid #C7D7FE',
  fontSize: '12px',
  fontWeight: '500',
  lineHeight: '18px',
  textAlign: 'center',
  padding:'2px 12px',
  display: 'inline-block',
  borderRadius: '16px',
  color:'#175CD3',
  background:'#EFF8FF',
  marginLeft:'5px',
}));