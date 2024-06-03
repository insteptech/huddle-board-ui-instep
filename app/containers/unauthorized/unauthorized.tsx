'use client'
import React from 'react';
import FourBg from "../../images/FourBg.svg";
import FourLogo from "../../images/FourLogo.svg";
import topPng from "../../images/topPng.svg";
import {
  ListLoginItem,
  MidContentSection,
  MidContentRight,
  ContentOnTop,
  MidContentLeft,
  ListLogin,
  ContentBottom,
  ContentBottomBold,
  BoxContentLogin,
  ButtonLogin,
  BoxSection,
  BoxImgLog,
} from '../../styles/customStyle';

const Unauthorized = () => {
  return (
    <BoxSection sx={{ backgroundImage: `url(${FourBg.src})`, }} className='page-not-found'>
      <BoxContentLogin>
        <BoxImgLog> <img src={FourLogo.src} /> </BoxImgLog>
        <ContentOnTop>Unfortunately, your current subscription doesn’t<br/> include our Huddle Board feature. </ContentOnTop>
        <MidContentSection>
            <MidContentLeft>
              <img src={topPng.src} /> 
            </MidContentLeft>
            <MidContentRight>
              <ListLogin>
                  <ListLoginItem >
                    The Huddle Board provides scribes, MAs, chart preppers and other clinical users with a comprehensive view of clinical action items for past, current, and future patient appointments.
                  </ListLoginItem >
                  <ListLoginItem >
                    Users can view appointment times, patient names, visit types, and screening tests or conditions for each patient – as well as any actions to be taken.
                  </ListLoginItem >
                  <ListLoginItem >
                    This feature optimizes clinical workflows and improves healthcare delivery by helping users prepare and document more efficiently .
                  </ListLoginItem >
              </ListLogin>
            </MidContentRight>
        </MidContentSection>
        <ContentBottom>The huddle board is a powerful tool to help clinical and non-clinical staff more effectively<br/> manage their time and deliver exceptional patient care.</ContentBottom>
        <ContentBottomBold>Contact DoctusTech support to add it to your subscription today.</ContentBottomBold>
        <ButtonLogin>Show Interest in Huddle Board</ButtonLogin>
      </BoxContentLogin>
    </BoxSection>
  );
};

export default Unauthorized;