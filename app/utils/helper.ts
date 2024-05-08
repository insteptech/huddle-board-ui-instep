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

export const getTime = (timestamp:string) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
  return formattedTime;
}

export const urlParams = (params:any) =>{
  const query = Object.entries(params)
    .filter(([key, value]:any) => {
        return Array.isArray(value) ? value.length > 0 : value !== '';
    })
    .map(([key, value]:any) => `${encodeURIComponent(key)}=${Array.isArray(value) ? JSON.stringify(value) : encodeURIComponent(value)}`)
    .join('&');    
    return query;
}