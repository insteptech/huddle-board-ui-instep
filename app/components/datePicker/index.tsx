'use client'
import React from 'react'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { getCurrentDateFormatted } from '@/app/utils/helper';
import { Calendar } from '@iroomit/react-date-range';
import { CalenderSection, DataRangeBox } from '@/app/styles/customStyle';

const DatePicker = (props: any) => {

    const { dateRangeHandleChange } = props;
    const [anchorEl, setAnchorEl] = useState(false);


    const [date, setDate] = React.useState(new Date());

    const handleDateChange = (newDate: Date) => {
        console.log("New date selected:", newDate);
        dateRangeHandleChange(newDate)
        setDate(newDate);
    };

    const handleClick = () => {
        setAnchorEl(!anchorEl);
    };

    return (
        <CalenderSection>
            <Button
                className=""
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                variant="contained"
            >
                <CalendarMonthOutlinedIcon sx={{ marginRight: '10px' }} />{ }{getCurrentDateFormatted(date)}
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
                        <Calendar date={date} onChange={handleDateChange} />

                    </DataRangeBox>
                </Box>
            </Box>
        </CalenderSection>
    )
}

export default DatePicker
