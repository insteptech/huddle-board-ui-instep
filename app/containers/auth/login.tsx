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
  VerificationMaximum,
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
  const [maskedEmail, setMaskedEmail] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  const handleEmail = (event: any) => {

    if (!email) {
      toast.error("Enter Email Address");
      return
    }

    if (!emailRegex.test(email)) {
      toast.error("Enter a valid Email Address");
      return;
    }
    let [username, domain] = email.split('@');
    let maskedUsername = username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1);
    let maskedDomain = domain.charAt(0) + '*'.repeat(domain.length - 2) + domain.charAt(domain.length - 1);
    let maskedEmail = maskedUsername + '@' + maskedDomain;
    setMaskedEmail(maskedEmail)

    setOtpSent(true)
  }

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
                  <LoginId>{maskedEmail}</LoginId>

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

                <VerificationMaximum>
                  You have exceeded the maximum number of OTP resend attempts. Please try again after some time</VerificationMaximum>
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
