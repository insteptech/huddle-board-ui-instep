'use client'
import React from 'react';

import {
  BoxSec,
  BoxContent,
  BoldContent
} from '../../styles/customStyle';

const PageNotFound = () => {

  return (
    <BoxSec className='page-not-found'>
        <BoxContent>
            <BoldContent>404</BoldContent>
            Page Not Found
          </BoxContent>
      </BoxSec>  
  );
};

export default PageNotFound;
