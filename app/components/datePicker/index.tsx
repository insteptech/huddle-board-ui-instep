'use client'
import React, { useEffect, useState, useRef, MouseEvent } from 'react';
import { Box, Button } from '@mui/material';
import { getCurrentDateFormatted } from '@/app/utils/helper';
import { Calendar } from '@iroomit/react-date-range';
import { CalenderSection, DataRangeBox } from '@/app/styles/customStyle';
import calenderIcon from "../../images/calender.svg"
import { useSelector } from 'react-redux';
import { AppState } from '@/app/redux/store';

const DatePicker = (props: any) => {
    const { dateRangeHandleChange, date, setArrowDisabledRight, setDate, setArrowDisabledLeft } = props;
    const [anchorEl, setAnchorEl] = useState(false);
    const [minDate, setMinDate] = useState(new Date());
    const [maxDate, setMaxDate] = useState(new Date());
    const anchorRef = useRef<any>(null);

    const huddleBoardConfig: any = localStorage.getItem('huddleBoardConfig');
    const config = JSON.parse(huddleBoardConfig);

    const minDateFromConfig = config?.past_calendar_days_count;
    const maxDateFromConfig = config?.future_calender_days_count;

    const handleDateChange = (newDate: Date) => {

        const currentDate = new Date()

        dateRangeHandleChange(newDate);
        setDate(newDate);

        const newDate1 = new Date(newDate.getTime() + 1 * 24 * 60 * 60 * 1000);
        const newDate1Only = newDate1.toISOString().split('T')[0];

        const minDate = new Date(currentDate.getTime() - minDateFromConfig * 24 * 60 * 60 * 1000);
        const minDateOnly = minDate.toISOString().split('T')[0];

        const maxDate = new Date(currentDate.getTime() + maxDateFromConfig * 24 * 60 * 60 * 1000);
        const maxDateOnly = maxDate.toISOString().split('T')[0];

        if (newDate1Only == minDateOnly) {
            setArrowDisabledLeft(true)
            setArrowDisabledRight(false)
        }

        else if (newDate1Only == maxDateOnly) {
            setArrowDisabledRight(true)
            setArrowDisabledLeft(false)
        }
        else {
            setArrowDisabledLeft(false)
            setArrowDisabledRight(false)
        }
    }

    useEffect(() => {
        const currentDate = new Date();
        const minDate = new Date(currentDate.getTime() - minDateFromConfig * 24 * 60 * 60 * 1000);
        const maxDate = new Date(currentDate.getTime() + maxDateFromConfig * 24 * 60 * 60 * 1000);

        setMinDate(minDate);
        setMaxDate(maxDate);

        const handleClickOutside = (event: any) => {
            if (anchorRef.current && !anchorRef.current.contains(event.target)) {
                setAnchorEl(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClick = () => {
        setAnchorEl(!anchorEl);
    };

    return (
        <CalenderSection ref={anchorRef}>
            <Button
                sx={{
                    backgroundColor: "#2ABDF0", ':hover': {
                        backgroundColor: "#18A2D1",

                    }
                }}
                className=""
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                variant="contained"
            >
                <img src={calenderIcon.src} style={{ marginRight: '10px' }} />{ }{getCurrentDateFormatted(date)}
            </Button>
            <Box
                className={anchorEl ? 'CustomCalender' : 'CustomCalenderhide'}
            >
                <Box sx={{
                    padding: '0'
                }}>

                    <DataRangeBox
                        sx={{
                            '.rdrDayHovered .rdrDayNumber::after': {
                                display: 'none'
                            }
                        }}
                    >
                        <Calendar date={date} onChange={handleDateChange} minDate={minDate} maxDate={maxDate} />

                    </DataRangeBox>
                </Box>
            </Box>
        </CalenderSection>
    )
}

export default DatePicker;
