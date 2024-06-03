'use client'
import React from 'react';
import FourBg from "../../images/FourBg.svg"
import FourLogo from "../../images/FourLogo.svg"

import {
  BoxContent,
  BoldContent, 
  BoxTopContent, 
  BoxImg,
  BoxSection,
} from '../../styles/customStyle';

const PageNotFound = () => {
  return (
    <BoxSection sx={{ backgroundImage: `url(${FourBg.src})`, }} className='page-not-found'>
      <BoxContent>
        <BoxImg> <img src={FourLogo.src} /> </BoxImg>
        <BoldContent>404</BoldContent>
        <BoxTopContent>Not Found</BoxTopContent>
      </BoxContent>
    </BoxSection>
  );
};

export default PageNotFound;