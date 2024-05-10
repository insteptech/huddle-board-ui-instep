import type { Metadata, NextPage } from 'next';
import Container from "@mui/material/Container";
import dynamic from 'next/dynamic';

const Login = dynamic(() => import('./containers/auth/login').then((mod) => mod), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Home Page',
};

const Home: NextPage = () => {
  return (
    <div>
      <Container maxWidth="xl">
          <Login />
      </Container>
    </div>
  );
};

export default Home;
