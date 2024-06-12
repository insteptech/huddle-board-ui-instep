'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useInView } from 'react-intersection-observer';
import { getAppointmentDetail, getAppointmentsList, getFiltersData, getSelectedFilterDetail, getSelectedFilterList, updateAppointmentDetail, getAllAppointments } from '@/app/redux/actions/appointment';
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
import { accessToken, notAuthenticated } from '@/app/utils/auth';

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

  const [actionValue, setActionValue] = useState({
    value: "",
    data: "",
    detail: {}
  })

  const { ref, inView } = useInView();
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWindowHeight(window.innerHeight);
    }
    setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const loadMoreAppointment = (filter: FiltersDataState) => {
    dispatch(getAppointmentsList(filter)).then((response: any) => {
      setMainLoader(false);
      dispatch(updateFilter({ page: filter && filter.page ? filter.page + 1 : page }));
      if (response?.payload?.results.length === 0) {
        setIsClearFilter(true);
      } else {
        setIsClearFilter(false);
      }
    })
  };

  useEffect(() => {
    if (!notAuthenticated()) {
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
      });
  };

  const getAppointmentFiltersData = () => {
    dispatch(getFiltersData());
    dispatch(getSelectedFilterList());
  }

  const resetFilters = (isFilterPopOpen: boolean = false) => {
    const formattedDates = formatDates(date, date);
    const filters = {
      visit_types: [],
      providers_uuids: [],
      screening: [],
      page: 1,
      page_size: 10,
      patient_name: '',
      appointment_start_date: formattedDates.start,
      appointment_end_date: formattedDates.end,
      sort_by: isAppointmentTimeSortAscending ? 'appointment_timestamp' : '-appointment_timestamp'
    };
    setMainLoader(true);
    setSelectedVisitType([]);
    setSelectedScreening([]);
    setSelectedProviders([]);
    dispatch(updateFilter(filters));
    dispatch(emptyAppointmentList());
    loadMoreAppointment(filters);
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

  const searchAppointmentPatientName = (e: any) => {
    setPatientNameSearch(e.target.value);

    if (!e?.target?.value) {
      const filtersData = {
        ...filters,
        page: 1,
        page_size: 10,
        patient_name: '',
        sort_by: isAppointmentTimeSortAscending ? 'appointment_timestamp' : '-appointment_timestamp'
      };
      setIsFilterApplied(false);
      dispatch(updateFilter(filtersData));
      dispatch(emptyAppointmentList());
      loadMoreAppointment(filtersData);
    }

    if (e?.target?.value?.length > 1) {
      const filtersData = {
        ...filters,
        visit_types: [],
        providers_uuids: [],
        screening: [],
        page: 1,
        page_size: 10,
        patient_name: e.target.value
      };
      setIsFilterApplied(true);
      dispatch(updateFilter(filtersData));
      dispatch(emptyAppointmentList());
      loadMoreAppointment(filtersData);
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
    loadMoreAppointment(filter);
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
    loadMoreAppointment(filtersData);
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
    loadMoreAppointment(filtersData);
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
    } else {
      selectedDate.setDate(date.getDate() + 1);
    }
    setDate(selectedDate);
    const selectedDay = selectedDate.getDate();

    const minDateOnly = parseDate(currentDay - past_calendar_days_count);
    const maxDateOnly = parseDate(currentDay + future_calender_days_count);
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
            <TableOtherContainer sx={{ m: "30px 0", height: windowHeight - 300 }}>
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
            <TableMainContainer sx={{ m: "30px 0", height: windowHeight - 250 }}>
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
              <div><h6 ref={ref} style={{ textAlign: "center", visibility: "hidden" }} >....</h6></div>
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
    </>
  );

};

export default CollapsibleTable;
