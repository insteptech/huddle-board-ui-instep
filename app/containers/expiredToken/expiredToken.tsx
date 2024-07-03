'use client'
import React from 'react';
import FourBackground from "../../images/FourBackground.svg"
import Logo from "../../images/Logo.svg"

import {
    BoxContent,
    BoldContent,
    BoxTopContent,
    BoxContimg,
    BoxSection,
} from '../../styles/customStyle';

const ExpiredToken = () => {
    return (
        <BoxSection sx={{ backgroundImage: `url(${FourBackground.src})`, }} className='page-not-found'>
            <BoxContent>
                <BoxContimg> <img src={Logo.src} /> </BoxContimg>
                <BoldContent>Token Is Expired</BoldContent>
                <BoxTopContent> Back to Login</BoxTopContent>
            </BoxContent>
        </BoxSection>
    );
};

export default ExpiredToken;