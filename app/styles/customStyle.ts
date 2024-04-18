import { TableCell, styled, Typography } from "@mui/material";

export const StyledTableCell = styled(TableCell)
(({ theme }: any) => (
  {
    
    color:'#fff',
   
  }
)
);


export const StyledText = styled(Typography)(({ theme }: any) => ({
  fontSize: '14px',
  fontWeight: '700',
  lineHeight: '20px',
  textAlign: 'left',
  color:'#475467',
}));