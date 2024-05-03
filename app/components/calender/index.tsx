'use client'
import React from 'react'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
import { PickersShortcutsItem } from "@mui/x-date-pickers/PickersShortcuts";
import { DateRange } from "@mui/x-date-pickers-pro/models";
import dayjs  from 'dayjs';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box , Button} from '@mui/material';
import { Dayjs } from 'dayjs';
import { useState } from 'react';

const Calender = () => {
    const shortcutsItems: PickersShortcutsItem<DateRange<Dayjs>>[] = [
        {
          label: "Today",
          getValue: () => {
            const today = dayjs();
            return [today.startOf("week"), today.endOf("week")];
          },
        },
        {
          label: "Yesterday",
          getValue: () => {
            const today = dayjs();
            return [today.startOf("week"), today.endOf("week")];
          },
        },
        {
          label: "This Week",
          getValue: () => {
            const today = dayjs();
            return [today.startOf("week"), today.endOf("week")];
          },
        },
        {
          label: "Last Week",
          getValue: () => {
            const today = dayjs();
            const prevWeek = today.subtract(7, "day");
            return [prevWeek.startOf("week"), prevWeek.endOf("week")];
          },
        },
    
        {
          label: "This Month",
          getValue: () => {
            const today = dayjs();
            return [today.startOf("month"), today.endOf("month")];
          },
        },
        {
          label: "Next Month",
          getValue: () => {
            const today = dayjs();
            const startOfNextMonth = today.endOf("month").add(1, "day");
            return [startOfNextMonth, startOfNextMonth.endOf("month")];
          },
        },
        { label: "Reset", getValue: () => [null, null] },
      ];
    
      const [anchorEl, setAnchorEl] = useState(null);
      const handleClick = (event:any) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
  return (
    <>
       <Button
        className=""
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        >
        Calender
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
      <MenuItem > 
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <StaticDateRangePicker
              slotProps={{
                shortcuts: {
                  items: shortcutsItems,
                },
                actionBar: { actions: [] },
              }}
            />
          </LocalizationProvider>
        </Box>
      </MenuItem>
      </Menu>
    </>
  )
}

export default Calender
