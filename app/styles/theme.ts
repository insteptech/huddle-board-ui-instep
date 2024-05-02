'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import localFont from 'next/font/local'
const myFont = localFont({
  src: [
    {
      path: '../font/ProximaNova-Light.woff2',
      weight: '300',
      style: 'normal',
    
    },

    {
      path: '../font/ProximaNova-Black.woff2',
      weight: '900',
      style: 'normal',
    
    },

    {
      path: '../font/ProximaNova-Regular.woff2',
      weight: '400',
      style: 'normal',
    
    },

    {
      path: '../font/ProximaNova-Bold.woff2',
      weight: '700',
      style: 'normal',
    
    }
     
  ],
})

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: myFont.style.fontFamily,
  },
  
},
{customArgs:{
  hearderBgColor: "#fff",
}});

export default theme;
