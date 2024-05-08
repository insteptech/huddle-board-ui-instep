import { TableCell, styled, Typography, linearProgressClasses, LinearProgress, TableContainer,Link,TableHead, Button, Checkbox } from "@mui/material";
import TableRow from "@mui/material/TableRow";

interface StyledButtonProps {
  buttonState: string;
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

export const LoaderBox = styled('div')
(({ div }: any) => (
  { 
    flexDirection: 'column',  
    display: 'flex',
    alignItems:'center',
    marginTop:'85px',
    width: '600px',
    height: '150px',
  }
)
);


export const TableMainContainer = styled(TableContainer)
(({ theme }: any) => (
  {
    boxShadow:'none',
    backgroundColor: 'transparent',
    overflow: 'auto',
    height: '615px',
    margin: '10px 0 0 0 !important',
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

export const StyledPatient = styled('div')(({ div }: any) => ({
 
  textDecoration:'underline',
}));

export const StyledName = styled('div')(({ div }: any) => ({
  fontSize: '14px',
  lineHeight: '20px',
  color:'#17236D',
}));

export const StyledCopy = styled('div')(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '20px',
  color:'#475467',
}));

export const IconProgress = styled('div')(({ div }: any) => ({
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
 
  
}));
  
export const Text = styled(Typography)(({ div }: any) => ({
  fontSize: '12px',
  fontWeight: '400',
  lineHeight: '16px',
  textAlign: 'left',
  color: '#242629',
  whiteSpace: 'nowrap',
  width: '120px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));
  
export  const StyledMuiButton = styled(Button)<StyledButtonProps>`
    background-color: ${(props) => 
      props.buttonState=='active' ? '#0D426A' : 
      props.buttonState=='enable' ? 'transparent' : 
      props.buttonState=='disable' ? 'transparent' : 'transparent'};
    color: ${(props) => 
      props.buttonState=='active' ? '#fff' : 
      props.buttonState=='enable' ? '#5C6469' : 
      props.buttonState=='disable'? '#C8CED2' : '#5C6469'};
    border: ${props => 
        props.buttonState=='active' ? '1px solid #5C6469' : 
        props.buttonState=='enable'? '1px solid #5C6469' : 
        props.buttonState=='disable'  ? '1px solid #C8CED2' : '1px solid #5C6469'};
    cursor: ${props =>
          props.buttonState=='disable'  ? 'not-allowed' : 'pointer'};
    font-size: 10px;
    font-weight: 600;
    line-height: 16px;
    padding: 2px 12px;
    display: inline-block;
    border-radius: 3px;
    text-align: center;
    margin-right: 10px;
    margin-bottom: 10px;
    &:hover{
      background-color: ${(props) => 
        props.buttonState=='active' ? '#0D426A' : 
        props.buttonState=='enable' ? 'transparent' : 
        props.buttonState=='disable' ? 'transparent' : 'transparent'};
      color: ${(props) => 
        props.buttonState=='active' ? '#fff' : 
        props.buttonState=='enable' ? '#5C6469' : 
        props.buttonState=='disable' ? '#C8CED2' : '#5C6469'};
        border: ${props => 
          props.buttonState=='active' ? '1px solid #5C6469' : 
          props.buttonState=='enable' ? '1px solid #5C6469' : 
          props.buttonState=='disable' ? '1px solid #C8CED2' : '1px solid #5C6469'};
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

export const TableTopMain = styled('div')(({ div }: any) => ({
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

export const MainBoxTop= styled('div')(({ div }: any) => ({
  display:'flex',
  justifyContent:'space-between',
  alignItems:'center',
  marginTop:'20px'
}));

export const BoxFilterLeft= styled(Typography)(({ div }: any) => ({
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

export const BoxFilterRightMid= styled(Typography)(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '17.05px',
  textAlign: 'left',
  color: '#17236D',
  margin:'0 10px',
}));

export const TableCellHd= styled('div')(({ div }: any) => ({
  fontSize: '11px',
  fontWeight: '700',
  lineHeight: '16px',
  textAlign: 'left',
  padding:'8px 16px',
  border:'none',
  position:'sticky',
  top:'0',
  background:'#fff',
  zIndex:'99',
  
  
}));

export const TableCellHdMain= styled('div')(({ div }: any) => ({
  fontSize: '11px',
  fontWeight: '700',
  lineHeight: '16px',
  textAlign: 'left',
  display:'flex',
  alignItems:'Center',
  justifyContent:'space-between',
  padding:'8px 12px',
  border:'none',
  borderRight:'1px solid #DFE1E6',
  
}));

export const TableCellTd= styled('div')(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '20px',
  textAlign: 'left',
  color:'#172B4D',
  padding:'8px 12px',
  border:'none',
  display:'flex',
}));

export const BoxFilterRight= styled('div')(({ div }: any) => ({
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

export const StyledTableCenter= styled(TableCell)(({ div }: any) => ({
  borderBottom:'none',
}));

export const MainBoxHeading= styled(Typography)(({ div }: any) => ({
  fontSize: '20px',
  fontWeight: '600',
  lineHeight: '24px',
  textAlign: 'left',
  color:'#172B4D',
  margin:'20px 0',
}));

export const MainBoxSubHeading= styled(Typography)(({ div }: any) => ({
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

export const TableDataList= styled('th')(({ div }: any) => ({
  width:'215px',
  height: '300px',
  overflowX: 'auto',
  borderRight:'1px solid #DFE1E6',
}));


export const TableData= styled('tr')(({ div }: any) => ({
  display:'flex',
  justifyContent:'space-between',
}));


export const ModalHeader= styled('div')(({ div }: any) => ({
  padding:'0 24px',
  margin:'15px 0',
  display:'flex',
  alignItems:'Center',
  justifyContent:'space-between',
}));


export const ModalHeaderIcon= styled('div')(({ div }: any) => ({
  width:'48px',
  height: '48px',
  border:'1px solid #EAECF0',
  borderRadius:'10px',
  display:'flex',
  alignItems:'Center',
  justifyContent:'Center',
}));


export const DialogTitleInner = styled('h2')(({ div }: any) => ({
  fontSize: '18px',
  fontWeight: '600',
  lineHeight: '28px',
  color:'#101828',
}));

export const DialogContentTextInner = styled(Typography)(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '20px',
  color:'#8B8D97',
}));

export const InputTitleInner = styled(Typography)(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '20px',
  color:'#344054',
  marginBottom:'10px',
}));



export const DialogContent = styled('div')(({ div }: any) => ({
  padding:'0 24px',
  margin:'0 0 15px 0',
}));

export const DialogContentTexts = styled('div')(({ div }: any) => ({
  background: '#fff',
}));



export const DialogActionsMain = styled('div')(({ div }: any) => ({
  display:'flex',
  alignItems:'Center',
  justifyContent:'space-between',
  gap:'10px',
  margin:'30px 0 20px 0',
}));


export const InputCloase = styled('div')(({ div }: any) => ({
 position:"absolute",
 right:'0',
}));





export const ButtonCancel = styled('button')(({ div }: any) => ({ 
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '24px',
  border: '1px solid #D0D5DD',
  padding:'10px 18px',
  borderRadius:'8px',
  width:'50%',
  cursor:'pointer',
  background:'#fff',
  color:'#344054',
  "&:hover": {
    background: '#F9FAFB',
  },

}));

export const ButtonSave = styled('button')(({ div }: any) => ({ 
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '24px',
  border: '1px solid #D0D5DD',
  padding:'10px 18px',
  borderRadius:'8px',
  cursor:'pointer',
  background:'#17236D',
  color:'#fff',
  width:'50%',
   "&:hover": {
    background: '#6941C6',
  },
  
}));



export const TextFieldInput = styled('input')(({ div }: any) => ({ 
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '24px',
  border: '1px solid #D0D5DD',
  padding:'10px 14px',
  borderRadius:'8px',
  background:'#fff',
  color:'#0D426A',
  width:'100%',

  "&:focus": {
    
    boxShadow: 'unset',
    outline:'0',
 
  },
  
}));

