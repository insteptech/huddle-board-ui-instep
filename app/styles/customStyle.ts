import { TableCell, styled, Typography, linearProgressClasses, LinearProgress, TableContainer, Link, TableHead, Button, Checkbox, List, ListItem } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import '@iroomit/react-date-range/dist/styles.css'; // main css file
import zIndex from "@mui/material/styles/zIndex";
import { cursorTo } from "readline";

interface StyledButtonProps {
  buttonstate: string;
  onClick: () => void;
  children: React.ReactNode;
}

export const FontBold = styled(Typography)(({ theme }: any) => ({
  fontWeight: '700',
}));

export const StyledTableCell = styled(TableCell)(({ theme }: any) => ({
  color: '#fff',
  fontSize: '12px',
  fontWeight: '600',
  lineHeight: '14.62px',
}));

export const TdTableCell = styled(TableCell)(({ theme }: any) => ({
  borderBottom: 'none',
}));

export const Typography_Grid = styled('div')(({ div }: any) => ({
  flexDirection: 'row',
  display: 'flex',
  alignItems: 'center',
}));

export const LoaderBox = styled('div')(({ div }: any) => ({
  flexDirection: 'column',
  display: 'flex',
  alignItems: 'center',
  marginTop: '85px',
  width: '600px',
  height: '150px',
}));

export const TableMainContainer = styled(TableContainer)(({ theme }: any) => ({
  boxShadow: 'none',
  backgroundColor: 'transparent',
  overflow: 'auto',
  margin: '10px 0 0 0 !important',


}));

export const TableOtherContainer = styled(TableContainer)(({ theme }: any) => ({
  boxShadow: 'none',
  backgroundColor: 'transparent',
  overflow: 'auto',
}));

export const Table_Head = styled(TableHead)(({ theme }: any) => ({
  position: 'sticky',
  top: '0px',
  zIndex: '99',
}));

export const StyledText = styled(Typography)(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '20px',
  color: '#475467',
}));

export const StyledTableRow = styled(TableRow)(({ div }: any) => ({
  margin: '20px',
  boxShadow: '0px 2px 5px 0px #0000000D',
  background: '#fff',
  "&:hover": {
    background: '#F0F2FF',
    boxShadow: '0px 4px 4px 0px #00000040',
    cursor: 'pointer'
  },
}));

export const StaticTypo = styled(Typography)(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '22px',
  color: '#5C6469',
  marginRight: '10px',
  marginBottom: '0px',
}));

export const LinkText = styled(Link)(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '22px',
  color: '#D43131',
  border: 'none',
  background: '#fff',
}));

export const StyledPatient = styled('div')(({ div }: any) => ({
  textDecoration: 'none',
}));

export const StyledName = styled('div')(({ div }: any) => ({
  fontSize: '14px',
  lineHeight: '20px',
  color: '#17236D',
}));

export const StyledCopy = styled('div')(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '20px',
  color: '#475467',
}));

export const IconProgress = styled('div')(({ div }: any) => ({
  display: 'flex',
  alignItems: 'center',
}));

export const ProviderCell = styled(Typography)(({ div }: any) => ({
  marginLeft: '10px',
  fontSize: '14px',
  fontWeight: '500',
  lineHeight: '20px',
  color: '#344054',
}));

export const TableMid = styled(TableCell)(({ div }: any) => ({
  fontSize: '13px',
  fontWeight: '700',
  lineHeight: '15.83px',
  color: '#000',
  border: '1px solid #B1C6E2',
  background: '#EBF4FF',
  padding: '12px',
}));

export const TableMidData = styled(TableCell)(({ div }: any) => ({
  borderRight: '1px solid #B1C6E2',
  borderBottom: 'none',
  padding: '12px',
  "&:last-child": {
    borderRight: 'none',
  }
}));

export const ActionBtn = styled(Typography)(({ div }: any) => ({
  border: '1px solid #17236D',
  fontSize: '12px',
  fontWeight: '700',
  lineHeight: '14.62px',
  padding: '2px 12px',
  display: 'inline-block',
  borderRadius: '34px',
  color: '#17236D',
  textAlign: 'center',
}));

export const Text = styled(Typography)(({ div }: any) => ({
  fontSize: '12px',
  fontWeight: '400',
  lineHeight: '16px',
  textAlign: 'left',
  color: '#242629',
  cursor: 'pointer'
}));

export const StyledMuiButton = styled(Button) <StyledButtonProps>`
    background-color: ${(props) =>
    props.buttonstate == 'active' ? '#0D426A' :
      props.buttonstate == 'enable' ? 'transparent' :
        props.buttonstate == 'disable' ? 'transparent' : 'transparent'};
    color: ${(props) =>
    props.buttonstate == 'active' ? '#fff' :
      props.buttonstate == 'enable' ? '#5C6469' :
        props.buttonstate == 'disable' ? '#C8CED2' : '#5C6469'};
    border: ${props =>
    props.buttonstate == 'active' ? '1px solid #5C6469' :
      props.buttonstate == 'enable' ? '1px solid #5C6469' :
        props.buttonstate == 'disable' ? '1px solid #C8CED2' : '1px solid #5C6469'};
    cursor: ${props =>
    props.buttonstate == 'disable' ? 'not-allowed' : 'pointer'};
    font-size: 10px;
    font-weight: 600;
    line-height: 16px;
    padding: 2px 12px;
    display: inline-block;
    border-radius: 3px;
    text-align: center;
    margin: 5px 0;
    margin-right: 10px;
    &:hover{
      background-color: ${(props) =>
    props.buttonstate == 'active' ? '#0D426A' :
      props.buttonstate == 'enable' ? 'transparent' :
        props.buttonstate == 'disable' ? 'transparent' : 'transparent'};
      color: ${(props) =>
    props.buttonstate == 'active' ? '#fff' :
      props.buttonstate == 'enable' ? '#5C6469' :
        props.buttonstate == 'disable' ? '#C8CED2' : '#5C6469'};
        border: ${props =>
    props.buttonstate == 'active' ? '1px solid #5C6469' :
      props.buttonstate == 'enable' ? '1px solid #5C6469' :
        props.buttonstate == 'disable' ? '1px solid #C8CED2' : '1px solid #5C6469'};
    }

    &:last-child{
      margin-right: 0px;
    }


`;

export const BorderLinearProgress = styled(LinearProgress)(({ theme, value }: any) => ({
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
  padding: '2px 12px',
  display: 'inline-block',
  borderRadius: '16px',
  color: '#5C6469',
  background: '#F5F7F6',
  marginRight: '5px',
}));

export const HeadingTag = styled(Typography)(({ div }: any) => ({
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
  margin: '0 10px',
}));

export const TableTop = styled('div')(({ div }: any) => ({
  width: '500px',
  border: '1px solid #D2E6FF',
  background: '#F3F7FC',
  borderRadius: '10px',
  marginLeft: '10px',
}));

export const FilterMenu = styled('div')(({ div }: any) => ({
  margin: '0',
}));

export const TableDiv = styled('div')(({ div }: any) => ({
  background: '#fff',
  padding: '10px 0',
  margin: '25px 0',
}));

export const BoxFilter = styled('div')(({ div }: any) => ({
  background: '#fff',
  borderBottom: '1px solid #DFE1E6',
  padding: '12px 16px',
}));

export const FilterButtons = styled('button')(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '20px',
  textAlign: 'left',
  boxShadow: '0px 1px 2px 0px #1018280D',
  border: '1px solid #D0D5DD',
  padding: '14px 16px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  background: '#fff',
  width: 'auto',
}));

export const RightPrint = styled('div')(({ div }: any) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'end',
  gap: '10px',
  alignItems: 'center',
  flexWrap: 'wrap',
}));

export const RightBox = styled('div')(({ div }: any) => ({
  border: '1px solid #D0D5DD',
  borderRadius: '8px',
  background: '#fff',
  cursor: 'pointer',
  padding: '10px 16px',
  display: 'flex',
  alignItems: 'center',
}));

export const MainBoxTop = styled('div')(({ div }: any) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '20px'
}));

export const BoxFilterLeft = styled(Typography)(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '20px',
  textAlign: 'left',
  color: '#344054',
}));

export const TypoSpan = styled(Typography)(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '20px',
  cursor: 'pointer',
  color: '#344054',
}));

export const BoxFilterRightMid = styled(Button)(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '17.05px',
  textAlign: 'left',
  color: '#17236D',
  margin: '0px',
  minWidth: 'auto',

  "&:hover": {
    background: '#fff',
  },
}));

export const TableCellHd = styled('div')(({ div }: any) => ({
  fontSize: '11px',
  fontWeight: '700',
  lineHeight: '16px',
  textAlign: 'left',
  padding: '8px 16px',
  border: 'none',
  position: 'sticky',
  top: '0',
  background: '#fff',
  zIndex: '99',
}));

export const TableCellHdMain = styled('div')(({ div }: any) => ({
  fontSize: '11px',
  fontWeight: '700',
  lineHeight: '16px',
  textAlign: 'left',
  display: 'flex',
  alignItems: 'Center',
  justifyContent: 'space-between',
  padding: '8px 12px',
  border: 'none',
  borderRight: '1px solid #DFE1E6',
}));

export const TableCellTd = styled('div')(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '20px',
  textAlign: 'left',
  color: '#172B4D',
  padding: '8px 12px',
  border: 'none',
  display: 'flex',
}));

export const BoxFilterRight = styled('div')(({ div }: any) => ({
  display: 'flex',
  alignItems: 'center',
}));

export const CheckboxInner = styled(Checkbox)(({ div }: any) => ({
  marginRight: '10px',
  padding: ' 0px',
}));

export const MainBox = styled('div')(({ div }: any) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
}));

export const StyledTableCenter = styled(TableCell)(({ div }: any) => ({
  borderBottom: 'none',
}));

export const MainBoxHeading = styled(Typography)(({ div }: any) => ({
  fontSize: '20px',
  fontWeight: '600',
  lineHeight: '24px',
  textAlign: 'left',
  color: '#172B4D',
  margin: '20px 0',
}));

export const MainBoxSubHeading = styled(Typography)(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '20px',
  textAlign: 'left',
  color: '#44546F',
  marginBottom: '20px',
}));

export const ClearButton = styled('button')(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '18px',
  padding: '10px 20px',
  borderRadius: '3px',
  cursor: 'pointer',
  background: '#B5C0C7',
  border: 'none',
  color: '#fff',
}));

export const TableDataList = styled('th')(({ div }: any) => ({
  width: '215px',
  height: '300px',
  overflowX: 'auto',
  borderRight: '1px solid #DFE1E6',
}));

export const TableData = styled('tr')(({ div }: any) => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

export const TestButton = styled('div')(({ div }: any) => ({
  display: 'flex',
  alignItems: 'Center',
  fontSize: '10px',
  fontWeight: '400',
  lineHeight: '16px',
  color: '#5C6469',
  marginRight: '0px'
}));

export const ModalHeader = styled('div')(({ div }: any) => ({
  padding: '0 24px',
  margin: '15px 0',
  display: 'flex',
  alignItems: 'Center',
  justifyContent: 'space-between',
}));

export const ModalHeaderIcon = styled('div')(({ div }: any) => ({
  width: '48px',
  height: '48px',
  border: '1px solid #EAECF0',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'Center',
  justifyContent: 'Center',
}));

export const DialogTitleInner = styled('h2')(({ div }: any) => ({
  fontSize: '18px',
  fontWeight: '600',
  lineHeight: '28px',
  color: '#101828',
}));

export const DialogContentTextInner = styled(Typography)(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '20px',
  color: '#8B8D97',
}));

export const InputTitleInner = styled(Typography)(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '20px',
  color: '#344054',
  marginBottom: '10px',
}));

export const DialogContent = styled('div')(({ div }: any) => ({
  padding: '0 24px',
  margin: '0 0 15px 0',
}));

export const RadioMain = styled('div')(({ div }: any) => ({

  '.radio_sec_inner': {
    padding: '4px 6px',
    margin: '0',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '20px',
    color: '#172B4D',
    "&:hover": {
      background: '#F5F5F5',
    },
  },

  '.selectedSavedFilter': {
    background: '#F5F5F5',
  },

  '.Mui-checked': {

    color: '#17236D',

  },

  '.MuiRadio-root': {
    padding: '0',
    paddingLeft: '0',
    paddingRight: '7px',

  },

  '.MuiTypography-root': {

    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '20px',

  }
}));

export const DialogContentTexts = styled('div')(({ div }: any) => ({
  background: '#fff',
}));

export const DialogActionsMain = styled('div')(({ div }: any) => ({
  display: 'flex',
  alignItems: 'Center',
  justifyContent: 'space-between',
  gap: '10px',
  margin: '20px 0 20px 0',
}));

export const SearchClearIcon = styled('div')(({ div }: any) => ({
  position: "absolute",
  right: '0',
  marginRight: '10px',
  cursor: 'pointer'
}));

export const ButtonCancel = styled('button')(({ div }: any) => ({
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '24px',
  border: '1px solid #D0D5DD',
  padding: '10px 18px',
  borderRadius: '8px',
  width: '50%',
  cursor: 'pointer',
  background: '#fff',
  color: '#344054',
  "&:hover": {
    background: '#F9FAFB',
  },
}));

export const ButtonSave = styled(Button)(({ div }: any) => ({
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '24px',
  border: '1px solid #D0D5DD',
  padding: '10px 18px',
  borderRadius: '8px',
  background: '#17236D',
  color: '#fff !important',
  width: '50%',
  "&:hover": {
    background: '#6941C6',
  },
  "&:disabled": {
    background: '#B5C0C7'
  }
}));

export const ButtonDelete = styled(Button)(({ div }: any) => ({
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '24px',
  border: '1px solid #D92D20',
  padding: '10px 18px',
  borderRadius: '8px',
  background: '#D92D20',
  color: '#fff !important',
  width: '50%',
  "&:hover": {
    background: '#B42318',
  },

}));


export const ButtonConfirm = styled(Button)(({ div }: any) => ({
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '24px',
  border: '1px solid #2abdf0',
  padding: '10px 18px',
  borderRadius: '8px',
  background: '#2abdf0',
  color: '#fff !important',
  width: '50%',
  "&:hover": {
    background: '#2abdf0',
  },

}));

export const TextFieldInput = styled('input')(({ div }: any) => ({
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '24px',
  border: '1px solid #D0D5DD',
  padding: '10px 14px',
  borderRadius: '8px',
  background: '#fff',
  color: '#0D426A',
  width: '100%',
  "&:focus": {
    boxShadow: 'unset',
    outline: '0',
  },
}));

export const DataRangeBox = styled('div')(({ div }: any) => ({

  '.mui-6hp17o-MuiList-root-MuiMenu-list': {
    boxShadow: '0px 3px 5px 0px #091E4233',

  },
  '.rdrDefinedRangesWrapper': {
    width: 'auto !important'
  },
  '.mui-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper': {
    position: 'relative'
  },


  '.rdrDayNumber': {
    top: '0',
    display: 'inline',
    'span::after': {
      display: 'none'
    },
  },
  '.rdrDateDisplayWrapper,.rdrInputRanges ': {
    display: 'none'
  },
  '.rdrDefinedRangesWrapper button': {
    borderBottom: 'none',
    color: '#2D3748',
    'span': {
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '21px',
      textWrap: 'nowrap',
      marginBottom: '0.6rem',
    }
  }
}));

export const CalenderSection = styled('div')(({ div }: any) => ({
  position: 'relative',
  '.CustomCalender': {
    position: 'absolute',
    right: '-88%',
    zIndex: '99999',
    boxShadow: '0px 3px 5px 0px #091E4233',
    background: '#FFFFFF',
    top: '40px'
  },
  '.CustomCalenderhide': {
    display: 'none'
  },
  '.DateRangePickerComp': {
    padding: '20px',
  },

  '.rdrMonth button span': {
    borderRadius: '50%!important',
    margin: 'auto',
    width: '30px',
    height: '30px',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '21px',
  },

  '.rdrDay .rdrSelected': {
    backgroundColor: '#2abdf0 !important'
  },
  '.rdrDayEndPreview': {
    borderColor: '#2abdf0'
  }

}));

export const AppointmentLoaderBox = styled('div')(({ div }: any) => ({
  flexDirection: 'column',
  display: 'flex',
  alignItems: 'center',
  marginTop: '85px',
  height: '150px',
}));

// 404 - Page not found

export const BoxSec = styled('div')(({ div }: any) => ({
  display: 'flex',
  alignItems: 'center',
  background: '#fff',
  justifyContent: 'center',
  position: 'absolute',
  left: '0',
  right: '0',
  bottom: '0',
  top: '-150px',
  backgroundColor: '#F3F7FC',
  backgroundPosition: 'bottom center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100%',

}));

export const BoxSection = styled('div')(({ div }: any) => ({
  display: 'flex',
  alignItems: 'center',
  background: '#fff',
  justifyContent: 'center',
  position: 'absolute',
  left: '0',
  right: '0',
  bottom: '0',
  top: '-50px',
  backgroundColor: '#F3F7FC',
  backgroundPosition: 'bottom center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100%',

  '@media (max-width: 1280px)': {
    top: '0px'
  }

}));



export const BoxTopContent = styled('div')(({ div }: any) => ({
  fontSize: '60px',
  fontWeight: '600',
  lineHeight: '60px',
  color: '#0D426A',
  textAlign: 'center',
}));


export const BoxContent = styled('div')(({ div }: any) => ({

  textAlign: 'center',
}));

export const BoxImg = styled('div')(({ div }: any) => ({

  marginBottom: '10rem',
}));










export const BoldContent = styled('div')(({ div }: any) => ({
  fontSize: '120px',
  fontWeight: '700',
  lineHeight: '12px',
  color: '#0D426A',
  marginBottom: '4rem',

}));

export const BoxMid = styled('div')(({ div }: any) => ({
  fontSize: '100px',
  fontWeight: '800',
  lineHeight: '80px',
  color: '#101828',
  marginBottom: '30px',
}));


export const ContentOnTop = styled('h4')(({ div }: any) => ({
  fontSize: '1.5rem',
  fontWeight: '600',
  lineHeight: '1.65rem',
  color: '#0D426A',
  marginBottom: '30px',

  '@media (max-width: 1280px)': {
    marginBottom: '20px',
  }
}));

export const ContentBottom = styled(Typography)(({ div }: any) => ({
  fontSize: '1.125rem',
  fontWeight: '400',
  lineHeight: '1.238rem',
  color: '#000',
  marginBottom: '20px',
}));

export const ContentBottomBold = styled('h4')(({ div }: any) => ({
  fontSize: '1.25rem',
  fontWeight: '600',
  lineHeight: '1.25rem',
  color: '#0D426A',
  marginBottom: '5px',
}));


export const ListLoginItem = styled(ListItem)(({ div }: any) => ({
  fontSize: '1.125rem',
  fontWeight: '400',
  lineHeight: '1.35rem',
  color: '#000',
  marginBottom: '20px',
  display: 'list-item',
  padding: '0px',
  paddingLeft: '5px',
  '@media (max-width: 1280px)': {
    marginBottom: '15px',
  }
}));

export const ListLogin = styled(List)(({ div }: any) => ({
  listStyleType: 'disc',
  padding: '0',
  marginBottom: '0',
  marginLeft: '3rem',
}));



export const MidContentSection = styled('div')(({ div }: any) => ({

  display: 'flex',
  margin: '2rem 0',
  '@media (max-width: 1280px)': {
    margin: '1rem 0',
  }

}));

export const MidContentLeft = styled('div')(({ div }: any) => ({

  width: '40%',

  'img': {
    width: '100%',
  },

  '@media (max-width: 1280px)': {
  
    'img': {
    maxWidth: '300px',
  }
  }

}));

export const MidContentRight = styled('div')(({ div }: any) => ({

  width: '60%',

}));

export const Listlogin = styled('div')(({ div }: any) => ({

  width: 'auto',

}));

export const BoxContentLogin = styled('div')(({ div }: any) => ({

  width: '50%',
  textAlign: 'center',

  '@media (max-width: 1280px)': {
    width: '80%'
  }

}));
export const ButtonLogin = styled('button')(({ div }: any) => ({
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '18px',
  textAlign: 'center',
  padding: '10px 20px',
  borderRadius: '3px',
  cursor: 'pointer',
  background: '#0D426A',
  color: '#fff',
  border: 'none',
}));


export const BoxImgLog = styled('div')(({ div }: any) => ({

  marginBottom: '3rem',
  '@media (max-width: 1280px)': {
    marginBottom: '1rem',
  }
}));

export const CharacterCountText = styled(Typography)(({ div }: any) => ({
  fontSize: '10px',
  fontWeight: '400',
  lineHeight: '20px',
  color: '#8B8D97',
  textAlign: 'end'
}));

export const ContentBottomMail = styled(Typography)(({ div }: any) => ({
  fontSize: '1.125rem',
  fontWeight: '400',
  lineHeight: '1.238rem',
  color: '#000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

}));

export const ContentBottomEmailLink = styled(Link)(({ div }: any) => ({
  color: '#2ABDF0',
  fontWeight: '700',
  "&:hover": {
    cursor: 'pointer',
  },
  textDecoration: 'none',
  fontSize: '18px'
}));

export const TableRowInside = styled(TableRow)(({ div }: any) => ({
  border: '1px solid #B1C6E2',
  background: '#EBF4FF',
}));

export const TableMidin = styled('div')(({ div }: any) => ({
  display: 'flex', alignItems: 'Center', justifyContent: 'space-around',
}));