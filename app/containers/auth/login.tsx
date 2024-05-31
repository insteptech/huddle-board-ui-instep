'use client'
import { getAndSetAccessToken } from '@/app/utils/auth';
import {  useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import Logino from "../../images/Logino.svg"
import doted from "../../images/doted.svg"
import Leftbg from "../../images/loginleftbg.svg"
import rightbg from "../../images/rightbg.svg"
import TextField from '@mui/material/TextField';
import {
  MainLogin,MainLoginleft,MainLoginright,HeadingLeft,ParaLeft,
  LoginForm,LoginLabel,
  LoginTitle,
  LoginActions,
  LoginPolicy,
  LoginContent,LoginId,
  VcCode,
  VerficationPolicy,
  Logincode
} from "@/app/styles/customStyle";
import { Box, Button } from '@mui/material';
import OTP from '@/app/components/otpInpuBox';

const Login = () => {
  const searchParam   = useSearchParams();
  const [otp, setOtp] = React.useState('');
  useEffect(() => {
    // let slug = searchParam.get("slug");
    // if(slug){
    //   getAndSetAccessToken(slug).then((response:any) => {        
    //     window.location.href= '/appointment';
    //   })
    // }else{
    //   window.location.href= '/pageNotFound';
    // }
  }, [searchParam]);

  

  return (
      <div className='main_sec'>
         <MainLogin> 
         <MainLoginleft sx={{ backgroundImage: `url(${Leftbg.src})`, }}> 
         <img src={Logino.src}/> 
         <HeadingLeft> We Make HCC Coding Education Easy.</HeadingLeft>
         <ParaLeft>DoctusTech App is the best way for clinicians to learn HCC<br/> Coding. 8 out of 10 doctors prefer DoctusTech to any other<br/> method of HCC Training.</ParaLeft>
         <img src={doted.src}/> 
         </MainLoginleft>


         <MainLoginright sx={{ backgroundImage: `url(${rightbg.src})`, }}>
         <LoginForm>
        <LoginTitle>Welcome to DT Huddleboard</LoginTitle>    
        <LoginContent >
        <LoginLabel>Please sign-in to your account</LoginLabel>
        <TextField  id="outlined-basic" label="Enter your email address" variant="outlined" />
        </LoginContent>  
        <LoginActions>
          
          <Button  variant="contained">Next</Button>
        </LoginActions>

        <LoginPolicy>I agree that I have read and accepted the <a href="#">Terms of Use</a> and <a href="#">Privacy Policy.</a></LoginPolicy> 
      </LoginForm>
     

        </MainLoginright>




        <MainLoginright sx={{ backgroundImage: `url(${rightbg.src})`, textAlign:'center'}}>
         <LoginForm>
        <LoginTitle>Verify Code</LoginTitle>    
        <LoginContent >
        <Logincode>The code has been sent to the email address you provided.</Logincode>
        <LoginId>t****d@d***********h.com</LoginId>

        <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <OTP separator={<span></span>} value={otp} onChange={setOtp} length={6} />
      
    </Box>



        </LoginContent>  
        <LoginActions>
          
          <Button  variant="contained">SIGN IN</Button>
        </LoginActions>

        <VcCode>Didn't receive the verification code?</VcCode>
        <VerficationPolicy>Receive code via phone call</VerficationPolicy>
      </LoginForm>
     

        </MainLoginright>
         </MainLogin>




         
  

      </div>
  );
};

export default Login;
