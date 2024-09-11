import type { Metadata, NextPage } from 'next';
import Container from "@mui/material/Container";
import dynamic from 'next/dynamic';
import { Helmet } from "react-helmet";

const SignUp = dynamic(() => import('./containers/auth/signUp').then((mod) => mod), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Home Page',
};

const Home: NextPage = () => {
  return (
    <div>
      <Container maxWidth="xxl">

        <Helmet>
          <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
          <meta httpEquiv="X-Frame-Options" content="DENY" />
          <meta name="referrer" content="no-referrer" />
          <meta name="server" content="Custom Server" />
          <meta
            httpEquiv="Strict-Transport-Security"
            content="max-age=31536000; includeSubDomains"
          />
          <meta
            httpEquiv="Content-Security-Policy"
            content={`
            default-src 'self';
            connect-src 
              'self' 
              ${process.env.REACT_APP_API_URL} 
              https://dev-api.pdap.doctustech.com/api/
              wss://*.api.pdap.doctustech.com 
              https://*.api.pdap.doctustech.com 
              wss://dev-app-v2.pdap.doctustech.com:3000; 
            script-src 'self' 'unsafe-inline';
            style-src 'self' 'unsafe-inline';
            img-src 
              'self' 
              data: 
              ${process.env.REACT_APP_IMG_URL} 
              wss://*.api.pdap.doctustech.com 
              https://*.api.pdap.doctustech.com;
            font-src 
              'self' 
              ${process.env.REACT_APP_FONT_URL} 
              wss://*.pdap.doctustech.com 
              https://*.api.pdap.doctustech.com;
            frame-src 'self';
            object-src 'none';
            media-src 'self';
            child-src 'self';
            base-uri 'self';
            form-action 'self';
            upgrade-insecure-requests;
          `}
          />
        </Helmet>

        <SignUp />
      </Container>
    </div>
  );
};

export default Home;
