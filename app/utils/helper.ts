import * as moment from 'moment';
import 'moment-timezone';

import { sessionKeys } from "./auth";

export const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

export const cookieName = { jwtToken: 'jwt-token' };

export const setCookie = (cname: any, cvalue: any, exdays: any) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + d;
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
};

export const getCookie = (cname: any) => {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export const deleteCookie = (name: string) => {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export const getTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
  return formattedTime;
}

export const urlParams = (params: any) => {
  const query = Object.entries(params)
    .filter(([key, value]: any) => {
      return Array.isArray(value) ? value.length > 0 : value !== '';
    })
    .map(([key, value]: any) => `${encodeURIComponent(key)}=${Array.isArray(value) ? JSON.stringify(value) : encodeURIComponent(value)}`)
    .join('&');
  return query;
}

export const getCurrentDateFormatted = (date?: any) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentDate = new Date(date);
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  return `${day} ${month} ${year}`;
}

// export const formatDates = (startDate: any, endDate: any) => {
//   // Helper function to format date
//   const formatDate = (date: any, isEndOfDay: any) => {
//     let incomingDate = new Date(date);
//     const year = incomingDate?.getFullYear();
//     const month = String(incomingDate?.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
//     const day = String(incomingDate?.getDate()).padStart(2, '0');
//     const hours = isEndOfDay ? '23' : '00';
//     const minutes = isEndOfDay ? '59' : '00';
//     const seconds = isEndOfDay ? '59' : '00';

//     return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
//   }

//   const startFormatted = formatDate(startDate, false);
//   const endFormatted = formatDate(endDate, true);

//   return {
//     start: startFormatted,
//     end: endFormatted
//   };
// }

// export const formatDates = (startDate: any, endDate: any) => {
//   // const timezone: string = I ntl.DateTimeFormat().resolvedOptions().timeZone;
//   const timezone: string = "US/Pacific";

//   // Define the start of the day in IST
//   const startDateTimeIST = moment.tz(startDate, timezone).startOf('day');

//   // Define the end of the day in IST
//   const endDateTimeIST = moment.tz(startDate, timezone).endOf('day');

//   // Convert IST dateTimes to UTC
//   const startDateTimeUTC = startDateTimeIST.clone().tz("UTC");
//   const endDateTimeUTC = endDateTimeIST.clone().tz("UTC");

//   return {
//     start: startDateTimeUTC.format(),
//     end: endDateTimeUTC.format()
//   };
// }


// export const formatDates = (startDate: any, endDate: any) => {
//   // Helper function to format date
//   const formatDate = (date: any, isEndOfDay: boolean) => {
//     // Parse the incoming date in US/Pacific timezone
//     const incomingDate = moment.tz(new Date(date), "US/Pacific");

//     // Adjust the date for formatting
//     const adjustedDate = isEndOfDay ? incomingDate.endOf('day') : incomingDate.startOf('day').add(1, 'seconds');

//     const year = adjustedDate.year();
//     const month = String(adjustedDate.month() + 1).padStart(2, '0'); // Months are 0-indexed
//     const day = String(adjustedDate.date()).padStart(2, '0');
//     const hours = isEndOfDay ? '23' : '00';
//     const minutes = isEndOfDay ? '59' : '00';
//     const seconds = isEndOfDay ? '59' : '00';

//     return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
//   };

//   const startFormatted = formatDate(startDate, false);
//   const endFormatted = formatDate(endDate, true);

//   return {
//     start: startFormatted,
//     end: endFormatted
//   };
// };

export const formatDates = (startDate: any, endDate: any) => {
  // Helper function to format date
  const formatDate = (date: any, isEndOfDay: boolean) => {
    // Parse the incoming date in US/Pacific timezone
    const incomingDate = moment.tz(new Date(date), "US/Pacific");

    // Debugging output
    console.log(`Original Incoming Date: ${incomingDate.format()}`);

    // Adjust the date for formatting
    let adjustedDate;
    if (isEndOfDay) {
      adjustedDate = incomingDate.endOf('day'); // Set to 23:59:59
    } else {
      adjustedDate = incomingDate.startOf('day').add(1, 'seconds'); // Set to 00:00:01
    }

    // Debugging output for adjusted date
    console.log(`Adjusted Date: ${adjustedDate.format()}`);

    const year = adjustedDate.year();
    const month = String(adjustedDate.month() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(adjustedDate.date()).padStart(2, '0');
    const hours = isEndOfDay ? '23' : '00';
    const minutes = isEndOfDay ? '59' : '00';
    const seconds = isEndOfDay ? '59' : '00';

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const startFormatted = formatDate(startDate, false);
  const endFormatted = formatDate(endDate, true);

  return {
    start: startFormatted,
    end: endFormatted
  };
};

export const deleteLocalStorage = () => {
  const { accessToken, slugKey, refreshToken, huddleBoardConfig } = sessionKeys;
  localStorage.removeItem(accessToken);
  localStorage.removeItem(refreshToken);
  localStorage.removeItem(slugKey);
  localStorage.removeItem(huddleBoardConfig);
}

export const parseDate = (dd: any) => {
  let day = parseInt(dd, 10); // convert dd to number
  const month = day > 28 ? (day > 30 ? 12 : 11) : (day > 21 ? 10 : (day > 14 ? 9 : (day > 7 ? 8 : 7)));
  const year = new Date().getFullYear();
  return new Date(`${month}/${day}/${year}`);
}
