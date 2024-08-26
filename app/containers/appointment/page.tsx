'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useInView } from 'react-intersection-observer';
import { getAppointmentDetail, getAppointmentsList, getFiltersData, getSelectedFilterDetail, getSelectedFilterList, updateAppointmentDetail, getAllAppointments, auditLog } from '@/app/redux/actions/appointment';
import { AppDispatch, AppState } from '@/app/redux/store';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import FilterButton from "@/app/components/filter";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
// import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import arrowLeft from "../../images/leftarrow.svg"
import arrowRight from "../../images/rightarrow.svg"
import { LoaderBox } from '../../styles/customStyle';
import pdfIcon from "../../images/pdficon.svg"
import {
  HeadingTag,
  TableMainContainer,
  Table_Head,
  StyledTableCell,
  TableDiv,
  TableTopMain,
  TableTop,
  FilterMenu,
  TableOtherContainer,
  RightPrint,
  RightBox,
  MainBoxTop,
  TypoSpan,
  SearchClearIcon,
  TableMidData
} from '../../styles/customStyle';
import { AppointmentState, FiltersDataState, emptyAppointmentList, emptySelectedFilter, updateFilter } from '@/app/redux/slices/appointment';
import { Box, Container, Input, InputAdornment, CircularProgress } from '@mui/material';
import PatientNotFound from '@/app/components/patientNotFound';
import { API_URL } from '@/app/redux/config/axiosInstance';
import { formatDates, parseDate, urlParams } from '@/app/utils/helper';
import DatePicker from '@/app/components/datePicker';
import { accessToken, loginAuthentication, notAuthenticated, isTokenExpired } from '@/app/utils/auth';
import IdleModal from '@/app/components/idleModal';
import { addEventData, addOtherData, EventData, getAllEventData, getAllOtherData } from '../../utils/indexeddb';
import { useCallback } from 'react';

const Row = dynamic(() => import('@/app/components/tableRow/index').then((mod) => mod), {
  ssr: false,
});

type AppointmentListProps = {
  initialAppointments: AppointmentState[];
};

const CollapsibleTable: React.FC<AppointmentListProps> = ({ initialAppointments }) => {
  const [isPatientNotFound, setIsPatientNotFound] = useState(true);
  const [isClearFilter, setIsClearFilter] = useState(false);
  const [patientNameSearch, setPatientNameSearch] = React.useState('');
  const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false);
  const [arrowDisabledRight, setArrowDisabledRight] = useState<boolean>(false);
  const [arrowDisabledLeft, setArrowDisabledLeft] = useState<boolean>(false);

  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const dispatch = useDispatch<AppDispatch>();
  const appointmentsList = useSelector((state: AppState) => state.appointment?.appointmentsData?.results) || [];
  const appointmentDetail = useSelector((state: AppState) => state.appointment?.appointmentDetail) || [];
  const isNextAppointmentsList = useSelector((state: AppState) => state.appointment?.appointmentsData?.next);
  const isDetailLoading = useSelector((state: AppState) => state.appointment.isDetailLoading);
  const appointmentFiltersData = useSelector((state: AppState) => state.appointment.appointmentFiltersData);
  const isFilterDataLoading = useSelector((state: AppState) => state.appointment.isFilterDataLoading);
  const selectedFilterList = useSelector((state: AppState) => state.appointment.selectedFilterList);
  const filters = useSelector((state: AppState) => state.appointment.filtersData);
  const { page } = filters;
  const [date, setDate] = React.useState(new Date());
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVisitType, setSelectedVisitType] = useState<any>(filters.visit_types || []);
  const [selectedScreening, setSelectedScreening] = useState<any>(filters.screening || []);
  const [selectedProviders, setSelectedProviders] = useState<any>(filters.providers_uuids || []);
  const [selectedAppointmentUuid, setSelectedAppointmentUuid] = useState<string>('');
  const [selectedAppointmentGap, setSelectedAppointmentGap] = useState<number>();
  const [selectedSavedFilterUuid, setSelectedSavedFilterUuid] = useState<string>('');
  const [isAppointmentTimeSortAscending, setIsAppointmentTimeSortAscending] = useState(false);
  const [isPatientNameSortAscending, setIsPatientNameSortAscending] = useState(false);
  const [loaderAppoint, setLoaderAppoint] = useState<any>(false);
  const [mainLoader, setMainLoader] = useState<any>(true);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [reverseModal, setReverseModal] = useState(false);
  const [idleModalOpen, setIdleModalOpen] = useState(false);
  const [actionValue, setActionValue] = useState({
    value: "",
    data: "",
    detail: {}
  })

  const [eventData, setEventData] = useState<EventData[]>([]);

  const [newEventData, setNewEventData] = useState<EventData[]>([]);
  const dispatchMemoized = useCallback(dispatch, []); // memoize dispatch

  useEffect(() => {
    async function fetchEventData() {
      const data: any = await getAllEventData();
      setEventData(data);
    }
    fetchEventData();
  }, []);

  const handleAddEventData: any = async (event_type: string, output: string, misc_info: string) => {
    await addEventData({ event_type, output, misc_info });
    const EventData: any = await getAllEventData();
    setEventData(EventData); // Update the state with the new data

  };

  const { ref, inView } = useInView();
  const [windowHeight, setWindowHeight] = useState(0);
  const [idleTime, setIdleTime] = useState(0);

  useEffect(() => {
    const processEventData = async () => {
      for (const item of eventData) {
        const existingItem = newEventData.find((existingItem) => existingItem.id === item.id);
        if (!existingItem) {
          try {
            dispatch(auditLog([{ event_type: item.event_type, output: item.output, misc_info: item.misc_info }]))
            await addOtherData(item);
            const updatedEventData = await getAllOtherData();
            setNewEventData(updatedEventData);
          } catch (error) {
            console.error('Error processing event data:', error);
          }
        }
      }
    };

    if (eventData.length > 0) {
      processEventData();
    }
    return () => {

    };
  }, [eventData, dispatch, newEventData]);

  useEffect(() => {
    function handleResize() {
      setWindowHeight(window.innerHeight);
    }
    setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let timer = null;
    const resetIdleTime = () => {
      setIdleTime(0);
    };

    const incrementIdleTime = () => {
      setIdleTime(prevIdleTime => prevIdleTime + 1);
    };

    timer = setInterval(incrementIdleTime, 60000);

    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart'];
    const resetIdleOnActivity = () => {
      resetIdleTime();
    };
    events.forEach(event => {
      document.addEventListener(event, resetIdleOnActivity);
    });

    return () => {
      clearInterval(timer);
      events.forEach(event => {
        document.removeEventListener(event, resetIdleOnActivity);
      });
    };
  }, []);

  useEffect(() => {
    if (idleTime > 59) {
      setIdleModalOpen(true);
    }
  }, [idleTime]);

  const loadMoreAppointment = (filter: FiltersDataState, auditState?: any) => {
    dispatch(getAppointmentsList(filter)).then((response: any) => {
      setMainLoader(false);
      dispatch(updateFilter({ page: filter && filter.page ? filter.page + 1 : page }));
      if (response?.payload?.results.length === 0) {
        setIsClearFilter(true);
      } else {
        setIsClearFilter(false);
      }
    })

    auditState === "FRONTEND_FILTER_CLICK_FILTER_APPLIED_SUCCESS" ? (
      handleAddEventData("FRONTEND_FILTER_CLICK_GENERAL", "Frontend Filters Applied", "Frontend Filters Applied")
    )
      : auditState === "FRONTEND_FILTER_CLICK_FILTER_RESET" ?
        (
          handleAddEventData("FRONTEND_FILTER_CLICK_GENERAL", "Frontend Filter Reset", "Frontend Filter Reset")
        )
        : auditState === "FRONTEND_FILTER_CLICK_DATE_FILTER_SELECTED" ?
          (
            handleAddEventData("FRONTEND_FILTER_CLICK_GENERAL", "Frontend Filters Applied", "Frontend Filters Applied")
          )
          : auditState === "FRONTEND_TILE_CLICK_PATIENT_NAME_SORTING" ?
            (
              handleAddEventData("FRONTEND_TILE_CLICK_PATIENT_NAME", "Frontend Filters sorting according to patient name", "Frontend Filters Applied")
            )
            : auditState === "FRONTEND_TILE_CLICK_PATIENT_TIME_SORTING" ?
              (
                handleAddEventData("FRONTEND_TILE_CLICK_APPOINTMENT_TIME", "Frontend Filters sorting according to appt time", "Frontend Filters Applied")
              )
              : null;
  };

  // useEffect(() => {
  //   const refreshToken = localStorage.getItem('refresh_token');
  //   const accessToken = localStorage.getItem('access_token');

  //   if (!refreshToken || !accessToken) {
  //     window.location.href = "/tokenExpired";
  //     return; 
  //   }

  //   if (isTokenExpired(refreshToken)) {
  //     window.location.href = "/tokenExpired";
  //     return; 
  //   }

  //   if (isTokenExpired(accessToken)) {
  //     window.location.href = "/tokenExpired";
  //     return; 
  // }
  // },[]);

  useEffect(() => {
    if (!loginAuthentication() && !notAuthenticated()) {
      window.location.href = '/unauthorized';
    }

    dispatch(getAppointmentsList(filters))
      .then((response: any) => {
        setIsPatientNotFound(false);
        dispatch(updateFilter({ page: Number(page) + 1 }));
        setMainLoader(false);


        if (response?.payload?.results.length === 0) {
          setIsClearFilter(true);

        } else {
          setIsClearFilter(false);
        }
      })
      .catch((error) => {
        setMainLoader(false);

        console.error("An error occurred while fetching appointments:", error);
        window.location.href = "/auth/login"
      });
  }, []);

  useEffect(() => {
    if (inView && isNextAppointmentsList) {
      loadMoreAppointment(filters);
    }
  }, [inView]);

  const appointmentDetails = (id: any) => {
    dispatch(getAppointmentDetail({ appointment_id: id })).then(() => {
      setLoaderAppoint(false);
    })
  };

  const getAction = (value: string) => {
    switch (value) {
      case 'clinician_agrees':
        return { clinician_agrees: true };
      case 'clinician_disagrees':
        return { clinician_disagrees: true };
      case 'test_ordered':
        return { test_ordered: true };
      default:
        return {};
    }
  };

  const getAction2 = (value: string) => {
    switch (value) {
      case 'clinician_agrees':
        return { clinician_agrees: false, clinician_disagrees: false, test_ordered: false };
      case 'clinician_disagrees':
        return { clinician_disagrees: false, clinician_agrees: false, test_ordered: false };
      case 'test_ordered':
        return { test_ordered: false };
      default:
        return {};
    }
  };

  const updateButtonState = (value: any, data: any, detail: any) => {
    if (data == "disable") {
      toast.error("cannot select")
      return;
    }
    if (data == "enable") {
      setConfirmationModal(true)
      setActionValue({
        value: value,
        data: data,
        detail: detail
      })
    }
    if (data == "active") {
      setReverseModal(true)
      setActionValue({
        value: value,
        data: data,
        detail: detail
      })
    }
  }

  const updateOutCome = (value: any, data: any, detail: any) => {
    setReverseModal(false);
    setConfirmationModal(false)


    const { appointment_id, uuid } = detail;
    const payload = {
      appointment_id: appointment_id,
      screening_id: uuid,
      action: data == "enable" ? getAction(value) : getAction2(value)
    }

    dispatch(updateAppointmentDetail(payload)).then(() => {
      toast.success("Successfully Updated");
      appointmentDetails(appointment_id);
      handleAddEventData("FRONTEND_TILE_CLICK_ACTION", `FRONTEND_TILE_CLICK_ACTION${value}`, `FRONTEND_TILE_CLICK_ACTION${value}`)

      const formattedDates = formatDates(filters.appointment_start_date, filters.appointment_end_date);
      const payload = {
        page: 1,
        page_size: 200,
        appointment_start_date: formattedDates.start,
        appointment_end_date: formattedDates.end,
      };
      dispatch(getAllAppointments(payload));
    }).catch(() => {
      toast.error("Update failed");
      handleAddEventData("FRONTEND_TILE_CLICK_ACTION", `FRONTEND_TILE_CLICK_ACTION${value}`, `FRONTEND_TILE_CLICK_ACTION${value}`)
    })
  }

  // const handlePrint = () => {
  //   fetch(url, { method: 'get', headers: { "Authorization": `JWT ${accessToken}` } })
  //     .then(res => res.blob())
  //     .then(res => {
  //       const url = URL.createObjectURL(res);
  //       const newTab = window.open(url, '_blank');
  //       if (newTab) {
  //         newTab.onload = () => {
  //           newTab.print();
  //         };
  //       } else {
  //         console.error('Failed to open new tab');
  //       }
  //     });
  // }

  const handlePdf = () => {

    const timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const appliedFilters = {
      ...filters,
      file_type: 'pdf',
      timezone: timezone
    };
    const url = `${API_URL}download-appointments/?${urlParams(appliedFilters)}`;
    fetch(url, { method: 'get', headers: { "Authorization": `JWT ${accessToken()}` } })
      .then(res => res.blob())
      .then(res => {
        const aElement = document.createElement('a');
        aElement.setAttribute('download', "appointments.pdf");
        const href = URL.createObjectURL(res);
        aElement.href = href;
        aElement.setAttribute('target', '_blank');
        aElement.click();
        URL.revokeObjectURL(href);
        handleAddEventData("FRONTEND_PRINT_CLICK", "Frontend Print Document Successful", "Frontend Print Document Successful")
      });
  };

  const getAppointmentFiltersData = () => {
    dispatch(getFiltersData());
    dispatch(getSelectedFilterList());
  }

  const resetFilters = (isFilterPopOpen: boolean = false) => {
    const formattedDates = formatDates(date, date);
    const timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const filtersData = {
      ...filters,
      visit_types: [],
      providers_uuids: [],
      screening: [],
      page: 1,
      page_size: 10,
      patient_name: '',
      appointment_start_date: formattedDates.start,
      appointment_end_date: formattedDates.end,
      timezone: timezone
    };
    setMainLoader(true);
    setSelectedVisitType([]);
    setSelectedScreening([]);
    setSelectedProviders([]);
    dispatch(updateFilter(filtersData));
    dispatch(emptyAppointmentList());
    loadMoreAppointment(filters, "FRONTEND_FILTER_CLICK_FILTER_RESET");
    setPatientNameSearch('');
    setSelectedSavedFilterUuid('');
    if (!isFilterPopOpen) {
      setAnchorEl(null);
    }
    setRange({
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    });
    setIsFilterApplied(false);
    dispatch(emptySelectedFilter());
  }

  useEffect(() => {
    if (selectedVisitType.length === 0 && selectedProviders.length === 0 && selectedScreening.length === 0) {
      const formattedDates = formatDates(date, date);
      const timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const filtersData = {
        ...filters,
        visit_types: [],
        providers_uuids: [],
        screening: [],
        page: 1,
        page_size: 10,
        appointment_start_date: formattedDates.start,
        appointment_end_date: formattedDates.end,
        timezone: timezone
      };

      dispatch(updateFilter(filtersData));
      loadMoreAppointment(filtersData);
      dispatch(emptyAppointmentList());
      setSelectedSavedFilterUuid('');
    }
  }, [selectedVisitType, selectedProviders, selectedScreening])

  const searchAppointmentPatientName = (e: any) => {
    setPatientNameSearch(e.target.value);

    if (!e?.target?.value) {
      const filtersData = {
        ...filters,
        page: 1,
        page_size: 10,
        patient_name: e.target.value
      };
      setTimeout(() => {
        dispatch(emptyAppointmentList());
        setIsFilterApplied(false);
        loadMoreAppointment(filtersData);
        dispatch(updateFilter(filtersData));
      }, 500)
      handleAddEventData("FRONTEND_FILTER_CLICK_GENERAL", "Frontend Filter Search Removed Successfully", "Frontend Filter Search Removed Successfully")
    }

    if (e?.target?.value?.length > 1) {

      const newVal = e.target.value;

      const filtersData = {
        ...filters,
        visit_types: selectedVisitType,
        providers_uuids: selectedProviders,
        screening: selectedScreening,
        page: 1,
        page_size: 10,
        patient_name: newVal
      };

      dispatch(emptyAppointmentList());
      setIsFilterApplied(true);
      dispatch(updateFilter(filtersData));
      loadMoreAppointment(filtersData);
      handleAddEventData("FRONTEND_FILTER_CLICK_GENERAL", "Frontend Filter Search Applied Successfully", "Frontend Filter Search Applied Successfully")
    }
  }

  const getFilterDetail = (filter: any) => {
    setSelectedSavedFilterUuid(filter.uuid);
    dispatch(getSelectedFilterDetail(filter.uuid)).then((response: any) => {
      const { payload } = response || {};
      if (!payload) return;

      const filtersData = {
        ...filters,
        visit_types: payload.visit_type,
        providers_uuids: payload.providers,
        screening: payload.screening,
        page: 1,
        page_size: 10,
        patient_name: ''
      };

      setSelectedVisitType(payload.visit_type);
      setSelectedScreening(payload.screening);
      setSelectedProviders(payload.providers);
      dispatch(updateFilter(filtersData));
      dispatch(emptyAppointmentList());
      loadMoreAppointment(filtersData);
    })
  }

  const dateRangeHandleChange = (dates: any) => {
    const formattedDates = formatDates(dates, dates);
    const filter = {
      ...filters,
      appointment_start_date: formattedDates.start,
      appointment_end_date: formattedDates.end,
      page: 1,
      page_size: 10,
    };
    dispatch(updateFilter(filter));
    dispatch(emptyAppointmentList());
    loadMoreAppointment(filter, "FRONTEND_FILTER_CLICK_DATE_FILTER_SELECTED");
  }

  const handleAppointmentTimeSort = () => {
    setIsAppointmentTimeSortAscending(!isAppointmentTimeSortAscending);
    const filtersData = {
      ...filters,
      sort_by: isAppointmentTimeSortAscending ? 'appointment_timestamp' : '-appointment_timestamp',
      page: 1,
      page_size: 10,
    };


    dispatch(updateFilter(filtersData));
    dispatch(emptyAppointmentList());
    loadMoreAppointment(filtersData, "FRONTEND_TILE_CLICK_PATIENT_TIME_SORTING");
  }

  const handlePatientNameSort = () => {
    setIsPatientNameSortAscending(!isPatientNameSortAscending);
    const filtersData = {
      ...filters,
      sort_by: isPatientNameSortAscending ? 'patient__patient_first_name' : '-patient__patient_first_name',
      page: 1,
      page_size: 10,
    };
    dispatch(updateFilter(filtersData));
    dispatch(emptyAppointmentList());
    loadMoreAppointment(filtersData, "FRONTEND_TILE_CLICK_PATIENT_NAME_SORTING");
  }

  const handleCalenderButtonClick = (direction: string) => {
    const appointmentsListString = localStorage.getItem('huddleBoardConfig');
    if (!appointmentsListString) return;
    const { past_calendar_days_count, future_calender_days_count } = JSON.parse(appointmentsListString);

    const currentDate = new Date();
    const currentDay = currentDate.getDate();

    const selectedDate = new Date(date);

    if (direction.toLowerCase() === "left") {
      selectedDate.setDate(date.getDate() - 1);
      handleAddEventData("FRONTEND_FILTER_CLICK_GENERAL", "Frontend Date filter selected using left arrow", "Frontend Date filter selected using left arrow")

    } else {
      selectedDate.setDate(date.getDate() + 1);
      handleAddEventData("FRONTEND_FILTER_CLICK_GENERAL", "Frontend Date filter selected using right arrow", "Frontend Date filter selected using right arrow")
    }
    setDate(selectedDate);
    const selectedDay = selectedDate.getDate();

    const minDateOnly = new Date(currentDate);
    minDateOnly.setDate(currentDay - past_calendar_days_count);

    const maxDateOnly = new Date(currentDate);
    maxDateOnly.setDate(currentDay + future_calender_days_count);
    setArrowDisabledRight(false);
    setArrowDisabledLeft(false);


    if (minDateOnly.getDate() === selectedDay) {
      setArrowDisabledLeft(true);
    } else if (maxDateOnly.getDate() === selectedDay) {
      setArrowDisabledRight(true);
    }

    dateRangeHandleChange(selectedDate);
  }

  return (
    <>
      <Container maxWidth={false}>
        <MainBoxTop>
          <HeadingTag variant="h1" sx={{ margin: "0" }}>
            My Schedule
          </HeadingTag>
          <RightPrint>
            {
              arrowDisabledLeft ?
                <RightBox sx={{ visibility: "hidden" }} onClick={() => handleCalenderButtonClick("left")}>
                  <img src={arrowLeft.src} style={{ fontSize: "15px" }} />
                </RightBox> :
                <RightBox onClick={() => handleCalenderButtonClick("left")}>
                  <img src={arrowLeft.src} style={{ fontSize: "15px" }} />
                </RightBox>
            }
            <Box>
              <DatePicker
                date={date}
                setDate={setDate}
                setArrowDisabledRight={setArrowDisabledRight}
                setArrowDisabledLeft={setArrowDisabledLeft}
                dateRangeHandleChange={dateRangeHandleChange}
              />
            </Box>
            {
              arrowDisabledRight ?
                <RightBox sx={{ visibility: "hidden" }} onClick={() => handleCalenderButtonClick("right")}>
                  <img src={arrowRight.src} style={{ fontSize: "15px" }} />
                </RightBox> :
                <RightBox onClick={() => handleCalenderButtonClick("right")}>
                  <img src={arrowRight.src} style={{ fontSize: "15px" }} />
                </RightBox>
            }
            <RightBox onClick={() => handlePdf()}
              sx={{
                ':hover': {
                  backgroundColor: "#F5F7F6",

                }
              }}
            >
              <img src={pdfIcon.src} style={{ fontSize: "20px", marginRight: "5px" }} />
              <TypoSpan variant="caption"

              >PDF</TypoSpan>
            </RightBox>

            {/* <RightBox onClick={() => handlePrint()}>
              <PrintOutlinedIcon style={{ fontSize: "20px", marginRight: "5px" }} />
              <TypoSpan variant="caption">Print</TypoSpan>
            </RightBox> */}

          </RightPrint>
        </MainBoxTop>

        <TableDiv>
          <TableTopMain>
            <FilterMenu>
              <FilterButton
                getAppointmentFiltersData={getAppointmentFiltersData}
                appointmentFiltersData={appointmentFiltersData}
                isFilterDataLoading={isFilterDataLoading}
                loadMoreAppointment={loadMoreAppointment}
                filters={filters}
                selectedFilterList={selectedFilterList}
                setSelectedVisitType={setSelectedVisitType}
                setSelectedScreening={setSelectedScreening}
                setSelectedProviders={setSelectedProviders}
                setAnchorEl={setAnchorEl}
                anchorEl={anchorEl}
                selectedVisitType={selectedVisitType}
                selectedScreening={selectedScreening}
                selectedProviders={selectedProviders}
                resetFilters={resetFilters}
                getFilterDetail={getFilterDetail}
                selectedSavedFilterUuid={selectedSavedFilterUuid}
                setIsFilterApplied={setIsFilterApplied}
                setMainLoader={setMainLoader}
                isFilterApplied={isFilterApplied}
              />
            </FilterMenu>
            <TableTop>
              <Input
                sx={{
                  "&::before, &::after": { display: "none" },
                  border: "none",
                  padding: "10px",
                  width: "100%",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "14px",
                  color: "#5C6469",
                }}
                id="input-with-icon-adornment"
                placeholder="Search by patient name or MRN"
                value={patientNameSearch}
                onChange={(e) => searchAppointmentPatientName(e)}
                startAdornment={
                  <>
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#0D426A" }} />
                    </InputAdornment>

                    {patientNameSearch.length > 0 && <InputAdornment position="end">
                      <SearchClearIcon onClick={() => resetFilters()}><CloseIcon sx={{ color: "#0D426A" }} /></SearchClearIcon>
                    </InputAdornment>}
                  </>
                }
              />
            </TableTop>
          </TableTopMain>


          {(isPatientNotFound || isClearFilter) && (
            <TableOtherContainer sx={{ m: "10px 0 0 0", height: windowHeight - 300 }}>
              <Table sx={{ height: "100%" }} aria-label="collapsible table">
                <Table_Head sx={{ backgroundColor: "#17236D", color: "#fff" }}>
                  <TableRow>
                    <StyledTableCell>
                      Appt Time{" "}
                      <ArrowDownwardIcon
                        style={{ verticalAlign: "middle", fontSize: "18px" }}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      Patient Name{" "}
                      <ArrowDownwardIcon
                        style={{ verticalAlign: "middle", fontSize: "18px" }}
                      />
                    </StyledTableCell>
                    <StyledTableCell>Type of Visit</StyledTableCell>
                    <StyledTableCell>Screening</StyledTableCell>
                    <StyledTableCell>Provider</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
                  </TableRow>
                </Table_Head>
                <TableBody>
                  {
                    mainLoader
                      ?
                      <TableRow>
                        <TableMidData style={{ border: "none", backgroundColor: "white" }} colSpan={12} >
                          <LoaderBox sx={{ width: "100%", margin: "0px", height: windowHeight - 400, justifyContent: "center" }}>
                            <CircularProgress />
                            Loading Appointments
                          </LoaderBox>
                        </TableMidData>
                      </TableRow>
                      : <PatientNotFound icon={isFilterApplied} resetFilters={resetFilters} />
                  }
                </TableBody>
              </Table>
            </TableOtherContainer>
          )}

          {!isPatientNotFound && !isClearFilter && (
            <TableMainContainer sx={{ height: windowHeight - 250 }}>
              <Table aria-label="collapsible table">
                <Table_Head sx={{ backgroundColor: "#17236D", color: "#fff" }}>
                  <TableRow>
                    <StyledTableCell onClick={() => handleAppointmentTimeSort()}>
                      Appt Time{" "}
                      {isAppointmentTimeSortAscending ? <ArrowDownwardIcon style={{ verticalAlign: "middle", fontSize: "18px" }} /> : <ArrowUpwardOutlinedIcon style={{ verticalAlign: "middle", fontSize: "18px" }} />}
                    </StyledTableCell>
                    <StyledTableCell onClick={() => handlePatientNameSort()}>
                      Patient Name{" "}
                      {isPatientNameSortAscending ? <ArrowDownwardIcon style={{ verticalAlign: "middle", fontSize: "18px" }} /> : <ArrowUpwardOutlinedIcon style={{ verticalAlign: "middle", fontSize: "18px" }} />}
                    </StyledTableCell>
                    <StyledTableCell>Type of Visit</StyledTableCell>
                    <StyledTableCell>Screening</StyledTableCell>
                    <StyledTableCell>Provider</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
                  </TableRow>
                </Table_Head>
                {
                  mainLoader ? <TableBody>
                    <TableRow>
                      <TableMidData style={{ border: "none", backgroundColor: "white" }} colSpan={12} >
                        <LoaderBox sx={{ width: "100%", margin: "0px", height: windowHeight - 400, justifyContent: "center" }}>
                          <CircularProgress />
                          Loading Appointments
                        </LoaderBox>
                      </TableMidData>
                    </TableRow>
                  </TableBody> : <TableBody>
                    {appointmentsList.map(
                      (appointment: AppointmentState, index: number) => (
                        <Row
                          key={index}
                          appointment={appointment}
                          selectedAppointmentUuid={selectedAppointmentUuid}
                          setSelectedAppointmentUuid={setSelectedAppointmentUuid}
                          appointmentDetail={appointmentDetail}
                          appointmentDetails={appointmentDetails}
                          updateOutCome={updateOutCome}
                          isDetailLoading={isDetailLoading}
                          setLoaderAppoint={setLoaderAppoint}
                          loaderAppoint={loaderAppoint}
                          updateButtonState={updateButtonState}
                          confirmationModal={confirmationModal}
                          reverseModal={reverseModal}
                          setConfirmationModal={setConfirmationModal}
                          setReverseModal={setReverseModal}
                          actionValue={actionValue}
                          setSelectedAppointmentGap={setSelectedAppointmentGap}
                          selectedAppointmentGap={selectedAppointmentGap}
                        />
                      )
                    )}
                  </TableBody>
                }
              </Table>
              <div><h6 ref={ref} style={{ textAlign: "center", visibility: "hidden", height: "1px" }} ></h6></div>
            </TableMainContainer>
          )
          }

          {/* {isAppointmentLoading && (
            <AppointmentLoaderBox sx={{ display: "flex" }}>
              <CircularProgress />
              Loading Appointments
            </AppointmentLoaderBox>
          )} */}

        </TableDiv>
      </Container>

      <IdleModal idleTime={idleTime} setIdleTime={setIdleTime} idleModalOpen={idleModalOpen} setIdleModalOpen={setIdleModalOpen} />
    </>
  );

};

export default CollapsibleTable;
function expiredTokenCheck() {
  throw new Error('Function not implemented.');
}

