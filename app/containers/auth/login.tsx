'use client'
import { getHuddleBoardConfig } from '@/app/redux/actions/auth';
import { AppDispatch } from '@/app/redux/store';
import { getAndSetAccessToken } from '@/app/utils/auth';
import { deleteLocalStorage } from '@/app/utils/helper';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Logino from "../../images/Logino.svg"
import doted from "../../images/doted.svg"
import Leftbg from "../../images/loginleftbg.svg"
import rightbg from "../../images/rightbg.svg"
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';

import {
  MainLogin, MainLoginleft, MainLoginright, HeadingLeft, ParaLeft,
  LoginForm, LoginLabel,
  LoginTitle,
  LoginActions,
  LoginPolicy,
  LoginContent, LoginId,
  VcCode,
  VerficationPolicy,
  Logincode
} from "@/app/styles/customStyle";
import { Box, Button } from '@mui/material';
import OTP from '@/app/components/otpInpuBox';
import { toast } from 'react-toastify';

const Login = () => {
  const searchParam = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()
  const [otp, setOtp] = React.useState('');
  const [email, setEmail] = useState("")
  const [otpSent, setOtpSent] = useState(false);

  const handleEmail = (event: any) => {

    if (!email) {
      toast.error("Enter Email Address");
      return
    }
    setOtpSent(true)
  }

  // useEffect(() => {

  //   sessionStorage.clear();

  //   let decodedString = "";

  //   // if (!searchParam.has("ref" || "slug")) {
  //   //   window.location.href = "/";
  //   //   return 
  //   // }

  //   if (searchParam.has("ref")) {
  //     const refParam: string | null = searchParam.get("ref");
  //     decodedString = atob(refParam || "");
  //     const isValidBase64 = /^[A-Za-z0-9+/=]+$/i.test(decodedString);
  //     if (!isValidBase64) {
  //       window.location.href = "/unauthorized";
  //     }
  //   }

  //   const slug = searchParam.get("slug") || decodedString;

  //   try {
  //     if (slug) {
  //       getAndSetAccessToken(slug)
  //         .then(() => {
  //           dispatch(getHuddleBoardConfig()).then((res: any) => {
  //             localStorage.setItem('huddleBoardConfig', JSON.stringify(res.payload));
  //             router.push('/appointment');
  //           });
  //         })
  //         .catch(() => {
  //           deleteLocalStorage();
  //           window.location.href = '/pageNotFound';
  //         });
  //     } else {
  //       deleteLocalStorage();
  //       window.location.href = '/unauthorized';
  //     }
  //   } catch (error) {
  //     deleteLocalStorage();
  //     window.location.href = '/pageNotFound';
  //   }

  // }, [searchParam]);




  return (
    <div className='main_sec'>
      <MainLogin>
        <MainLoginleft sx={{ backgroundImage: `url(${Leftbg.src})`, }}>
          <img src={Logino.src} />
          <HeadingLeft> We Make HCC Coding Education Easy.</HeadingLeft>
          <ParaLeft>DoctusTech App is the best way for clinicians to learn HCC<br /> Coding. 8 out of 10 doctors prefer DoctusTech to any other<br /> method of HCC Training.</ParaLeft>
          {/* <img src={doted.src} /> */}
        </MainLoginleft>

        {
          otpSent ?

            <MainLoginright sx={{ backgroundImage: `url(${rightbg.src})`, textAlign: 'center' }}>
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

                  <Button variant="contained">SIGN IN</Button>
                </LoginActions>

                <VcCode>Didn't receive the verification code?</VcCode>
                <VerficationPolicy>Receive code via phone call</VerficationPolicy>
              </LoginForm>


            </MainLoginright>

            :
            <MainLoginright sx={{ backgroundImage: `url(${rightbg.src})`, }}>
              <LoginForm>
                <LoginTitle>Welcome to DT Huddleboard</LoginTitle>
                <LoginContent >
                  <LoginLabel>Please sign-in to your account</LoginLabel>
                  <TextField onChange={(event) => setEmail(event.target.value)} id="outlined-basic" label="Enter your email address" variant="outlined" />
                </LoginContent>
                <LoginActions>

                  <Button variant="contained" onClick={handleEmail}>Next</Button>
                </LoginActions>

                <LoginPolicy>I agree that I have read and accepted the <a href="#">Terms of Use</a> and <a href="#">Privacy Policy.</a></LoginPolicy>
              </LoginForm>
            </MainLoginright>
        }






      </MainLogin>







    </div>
  );
};

export default Login;
