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
  BoldContent, BoxtopContent, BoxContimg,
  AccessBox,
  AccessBoxheading,
  AccessBoxcontent,
  AccessActions
} from '../../styles/customStyle';

const PageNotFound = () => {

  const slugStatus = sessionStorage.getItem('sessionStorageStatus');
  console.log(slugStatus)
  return (

    <BoxSec sx={{ backgroundImage: `url(${FourBg.src})`, }} className='page-not-found'>

      {
        slugStatus == "notFound"  ? (
          <BoxContent>
            <BoxContimg> <img src={FourLogo.src} /> </BoxContimg>
            <AccessBox>
              <img src={IconLock.src} />
              <AccessBoxheading>You don’t have access to this app.</AccessBoxheading>
              <AccessBoxcontent>Please contact the owner to request access.</AccessBoxcontent>
              <AccessActions><Button variant="contained">Close</Button></AccessActions>
            </AccessBox>
          </BoxContent>
        )

          :

          (<BoxContent>
            <BoxContimg> <img src={FourLogo.src} /> </BoxContimg>
            <BoldContent>404</BoldContent>
            <BoxtopContent>Not Found</BoxtopContent>
          </BoxContent>)

      }


    </BoxSec>
  );
};

export default PageNotFound;