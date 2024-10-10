
import 'moment-timezone';
import moment from 'moment-timezone';
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
  const time = moment(timestamp);
  const formattedTime = time.utc().format('hh:mm A');
  return formattedTime;
};

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

export const formatDates = (startDate: any, endDate: any) => {
  const formatDateToUTC = (date: any, isEndOfDay: boolean) => {
    const localDate = moment(date); 
    if (isEndOfDay) {
      localDate.endOf('day'); 
    } else {
      localDate.startOf('day').add(1, 'seconds'); 
    }
    return localDate.format("YYYY-MM-DDTHH:mm:ss");
  };

  console.log(startDate, "startDate")
  const startFormatted = formatDateToUTC(startDate, false); 
  const endFormatted = formatDateToUTC(endDate, true); 

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
