import { Diversity1 } from "@mui/icons-material";
import { TableCell, styled, Typography, linearProgressClasses, LinearProgress, TableContainer,Link,TableHead, Button, Checkbox } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import { cursorTo } from "readline";

interface StyledButtonProps {
  btnState: string;
  onClick: () => void;
  children: React.ReactNode;
}

export const FontBold = styled(Typography)
(({ theme }: any) => (
  { 
    fontWeight: '700',
  }
)
);

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

export const Typography_Grid = styled('div')
(({ div }: any) => (
  { 
    flexDirection: 'row',  
    display: 'flex',
    alignItems:'center',
  }
)
);

export const TableMainContainer = styled(TableContainer)
(({ theme }: any) => (
  {
    boxShadow:'none',
    backgroundColor: 'transparent',
    overflow: 'auto',
    height: '670px',
  }
)
);

export const TableOtherContainer = styled(TableContainer)
(({ theme }: any) => (
  {
    boxShadow:'none',
    backgroundColor: 'transparent',
    overflow: 'auto',
    
  }
)
);

export const Table_Head = styled(TableHead)
(({ theme }: any) => (
  {  
    position: 'sticky',
    top: '0px',
    zIndex:'99',
  }
)
);

export const StyledText = styled(Typography)(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '400',
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

export const StaticTypo = styled(Typography)(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '22px',
  color:'#5C6469',
  marginRight:'10px',
  marginBottom:'0px',
}));

export const LinkText = styled(Link)(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '22px',
  color:'#D43131',
  border: 'none',
  background: '#fff',
}));

export const StyledName = styled(Typography)(({ div }: any) => ({
  fontSize: '14px',
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

export const TableMid = styled(TableCell)(({ div }: any) => ({
  fontSize: '13px',
  fontWeight: '700',
  lineHeight: '15.83px',
  color:'#000',
  border: '1px solid #B1C6E2',
  background:'#EBF4FF',
  padding: '12px',
}));

export const TableMidData = styled(TableCell)(({ div }: any) => ({
  border: '1px solid #B1C6E2',
  background:'#EBF4FF',
  padding: '12px',
}));
  

export const ActionBtn = styled(Typography)(({ div }: any) => ({
  border: '1px solid #17236D',
  fontSize: '12px',
  fontWeight: '700',
  lineHeight: '14.62px',
  padding:'2px 12px',
  display: 'inline-block',
  borderRadius: '34px',
  color:'#17236D',
  textAlign: 'center',
  whiteSpace: 'nowrap',
}));
  
export const Text = styled(Typography)(({ div }: any) => ({
  fontSize: '12px',
  fontWeight: '400',
  lineHeight: '16px',
  textAlign: 'left',
  color: '#242629',

}));
  
export  const StyledMuiButton = styled(Button)<StyledButtonProps>`
    background-color: ${(props) => 
      props.btnState=='active' ? '#0D426A' : 
      props.btnState=='enable' ? 'transparent' : 
      props.btnState=='disable' ? 'transparent' : 'transparent'};
    color: ${(props) => 
      props.btnState=='active' ? '#fff' : 
      props.btnState=='enable' ? '#5C6469' : 
      props.btnState=='disable'? '#C8CED2' : '#5C6469'};
    border: ${props => 
        props.btnState=='active' ? '1px solid #5C6469' : 
        props.btnState=='enable'? '1px solid #5C6469' : 
        props.btnState=='disable'  ? '1px solid #C8CED2' : '1px solid #5C6469'};
    cursor: ${props =>
          props.btnState=='disable'  ? 'not-allowed' : 'pointer'};
    font-size: 10px;
    font-weight: 600;
    line-height: 16px;
    padding: 2px 12px;
    display: inline-block;
    border-radius: 3px;
    text-align: center;
    margin-right: 10px;
    &:hover{
      background-color: ${(props) => 
        props.btnState=='active' ? '#0D426A' : 
        props.btnState=='enable' ? 'transparent' : 
        props.btnState=='disable' ? 'transparent' : 'transparent'};
      color: ${(props) => 
        props.btnState=='active' ? '#fff' : 
        props.btnState=='enable' ? '#5C6469' : 
        props.btnState=='disable' ? '#C8CED2' : '#5C6469'};
        border: ${props => 
          props.btnState=='active' ? '1px solid #5C6469' : 
          props.btnState=='enable' ? '1px solid #5C6469' : 
          props.btnState=='disable' ? '1px solid #C8CED2' : '1px solid #5C6469'};
    }
`;

export const BorderLinearProgress = styled(LinearProgress)(({ theme, value }:any) => ({
  height: 7,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: value && value < 100 ? '#FFAE64' : '#41B145',
  },
}));

export const SpanText = styled(Typography)(({ div }: any) => ({
  border: '1px solid #E1E1E1',
  fontSize: '12px',
  fontWeight: '500',
  lineHeight: '18px',
  textAlign: 'center',
  padding:'2px 12px',
  display: 'inline-block',
  borderRadius: '16px',
  color:'#5C6469',
  background:'#F5F7F6',
  marginRight:'5px',
}));

export const HeadingTag= styled(Typography)(({ div }: any) => ({
  fontSize: '24px',
  fontWeight: '700',
  lineHeight: '32px',
  textAlign: 'left',
  color: 'rgba(0, 0, 0, 1)',
  margin: '30px 0',
}));

export const TableTopmain = styled('div')(({ div }: any) => ({
  display: 'flex',
  alignItems: 'center',
  margin:'0 10px',
}));

export const TableTop= styled('div')(({ div }: any) => ({
  
  width: '500px',
  border: '1px solid #D2E6FF',
  background: '#F3F7FC',
  borderRadius: '10px', 
  marginLeft:'10px',
}));

export const FilterMenu= styled('div')(({ div }: any) => ({

  margin: '0',
  
}));


export const TableDiv = styled('div')(({ div }: any) => ({
  
  background: '#fff',
  padding:'10px 0',
  margin:'25px 0',

}));


export const BoxFilter = styled('div')(({ div }: any) => ({
  
  background: '#fff',
  borderBottom: '1px solid #DFE1E6',
  padding:'12px 16px',

}));



 
export const FilterButtons = styled('button')(({ div }: any) => ({
  
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '20px',
  textAlign: 'left',
  boxShadow: '0px 1px 2px 0px #1018280D',
  border: '1px solid #D0D5DD',
  padding:'14px 16px',
  borderRadius:'8px',
  display:'flex',
  alignItems: 'center',
  cursor:'pointer',
  background:'#fff',
  width:'auto',

}));



export const RightPrint= styled('div')(({ div }: any) => ({
  display:'flex' ,
  flexDirection:'row',
  justifyContent: 'end', 
  gap: '10px' ,
  alignItems:'center',
  flexWrap:'wrap',

}));


export const RightBox= styled('div')(({ div }: any) => ({
  border: '1px solid #D0D5DD' ,
  borderRadius:'8px',
  background:'#fff',
  cursor:'pointer',
  padding:'10px 16px',
  display:'flex' ,
  alignItems:'center',

}));

export const MainBoxtop= styled('div')(({ div }: any) => ({
  display:'flex',
  justifyContent:'space-between',
  alignItems:'center',
  marginTop:'20px'

}));


export const BoxfilterLeft= styled(Typography)(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '20px',
  textAlign: 'left',
  color: '#344054',

}));


export const TypoSpan= styled(Typography)(({ div }: any) => ({
  fontSize:'14px',
  fontWeight:'600',
  lineHeight:'20px',
  cursor:'pointer',
  color: '#344054',

}));


export const BoxfilterRightmid= styled(Typography)(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '17.05px',
  textAlign: 'left',
  color: '#17236D',
  margin:'0 10px',

}));

export const TablecellHd= styled(TableCell)(({ div }: any) => ({
  fontSize: '11px',
  fontWeight: '700',
  lineHeight: '16px',
  textAlign: 'left',
  padding:'8px 16px',
  border:'none',
  borderRight:'1px solid #DFE1E6',

}));

export const TablecellHdmain= styled(TableCell)(({ div }: any) => ({
  fontSize: '11px',
  fontWeight: '700',
  lineHeight: '16px',
  textAlign: 'left',
  display:'flex',
  alignItems:'Center',
  justifyContent:'space-between',
  padding:'8px 16px',
  border:'none',
  borderRight:'1px solid #DFE1E6',
}));


export const TablecellTd= styled(TableCell)(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '20px',
  textAlign: 'left',
  color:'#172B4D',
  padding:'8px 16px',
  border:'none',
  borderRight:'1px solid #DFE1E6',

}));

export const BoxfilterRight= styled('div')(({ div }: any) => ({

  display: 'flex',
  alignItems: 'center',
  
}));

export const CheckboxInner= styled(Checkbox)(({ div }: any) => ({

  marginRight:'10px',
  padding:' 0px',
  
  
}));   


export const MainBox= styled('div')(({ div }: any) => ({
  display:'flex',
  alignItems: 'center',
  flexDirection:'column',

}));

export const StyledTablecenter= styled(TableCell)(({ div }: any) => ({

  borderBottom:'none',
 

}));




export const MainBoxheading= styled(Typography)(({ div }: any) => ({
  fontSize: '20px',
  fontWeight: '600',
  lineHeight: '24px',
  textAlign: 'left',
  color:'#172B4D',
  margin:'20px 0',


}));


export const MainBoxsubheading= styled(Typography)(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '20px',
  textAlign: 'left',
  color:'#44546F',
  marginBottom:'20px',



}));



export const ClearButton = styled('button')(({ div }: any) => ({
  
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '18px',
  padding:'10px 20px',
  borderRadius:'3px',
  cursor:'pointer',
  background:'#B5C0C7',
  border:'none',
  color:'#fff',


}));


