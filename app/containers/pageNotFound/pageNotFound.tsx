'use client'
import React from 'react';
import FourBg from "../../images/Fourbg.svg"
import FourLogo from "../../images/Fourlogo.svg"
import IconLock from "../../images/IconLock.svg"
import { Button } from '@mui/material';
import { useSearchParams } from 'next/navigation';

import {
  BoxSec,
  BoxContent,
  BoldContent, 
  BoxTopContent, 
  BoxImg,
  AccessBox,
  AccessBoxHeading,
  AccessBoxContent,
  AccessActions
} from '../../styles/customStyle';

const PageNotFound = () => {

  const slugStatus = sessionStorage.getItem('slugStatus');
  return (

    <BoxSec sx={{ backgroundImage: `url(${FourBg.src})`, }} className='page-not-found'>
      {
        slugStatus == "notFound" || slugStatus == "unauthorized" ? (
          <BoxContent>
            <BoxImg> <img src={FourLogo.src} /> </BoxImg>
            <AccessBox>
              <img src={IconLock.src} />
              <AccessBoxHeading>You don’t have access to this app.</AccessBoxHeading>
              <AccessBoxContent>Please contact the owner to request access.</AccessBoxContent>
              <AccessActions><Button variant="contained">Close</Button></AccessActions>
            </AccessBox>
          </BoxContent>
        )
          :
          (
          <BoxContent>
            <BoxImg> <img src={FourLogo.src} /> </BoxImg>
            <BoldContent>404</BoldContent>
            <BoxTopContent>Not Found</BoxTopContent>
          </BoxContent>
          )
        }
    </BoxSec>
  );
};

export default PageNotFound;