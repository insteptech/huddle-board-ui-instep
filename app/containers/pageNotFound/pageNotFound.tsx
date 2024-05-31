'use client'
import React from 'react';
import FourBg from "../../images/Fourbg.svg"
import FourLogo from "../../images/Fourlogo.svg"
import toppng from "../../images/toppng.svg"
import { Button } from '@mui/material';


import {
  BoxSec,
  BoxContent,
  BoldContent, 
  BoxTopContent, 
  BoxImg,
  ListloginItem,
  MidcontentSec,
  MidcontentRight,
  ContentonTop,
  MidcontentLeft,
  ListLogin,
  ContentBottom,
  ContentBottomBold,
  BoxContentLogin,
  ButtonLogin,
  BoxSecin,
  BoxImglog,
} from '../../styles/customStyle';

const PageNotFound = () => {

  const slugStatus = sessionStorage.getItem('slugStatus');

  const closeCurrentTab = () => {
    window.close();
  }

  return (

    <BoxSecin sx={{ backgroundImage: `url(${FourBg.src})`, }} className='page-not-found'>
      {
        slugStatus == "notFound" || slugStatus == "unauthorized" ? (
          <BoxContentLogin>
            <BoxImglog> <img src={FourLogo.src} /> </BoxImglog>
            <ContentonTop>Unfortunately, your current subscription doesn’t<br/> include our Huddle Board feature. </ContentonTop>

            <MidcontentSec>

            <MidcontentLeft>
            <img src={toppng.src} /> 
            </MidcontentLeft>

            <MidcontentRight>

            <ListLogin>
            <ListloginItem >
            The Huddle Board provides scribes, MAs, chart preppers and other clinical users with a comprehensive view of clinical action items for past, current, and future patient appointments.
            </ListloginItem >

            <ListloginItem >
            Users can view appointment times, patient names, visit types, and screening tests or conditions for each patient – as well as any actions to be taken.
            </ListloginItem >

            <ListloginItem >
            This feature optimizes clinical workflows and improves healthcare delivery by helping users prepare and document more efficiently .
            </ListloginItem >
            </ListLogin>
            </MidcontentRight>
              
              
            </MidcontentSec>

           <ContentBottom>The huddle board is a powerful tool to help clinical and non-clinical staff more effectively<br/> manage their time and deliver exceptional patient care.</ContentBottom>

           <ContentBottomBold>Contact DoctusTech support to add it to your subscription today.</ContentBottomBold>

           <ButtonLogin>Show Interest in Huddle Board</ButtonLogin>
            
          </BoxContentLogin>
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
    </BoxSecin>
  );
};

export default PageNotFound;