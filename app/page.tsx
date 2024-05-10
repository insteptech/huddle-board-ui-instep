import type { Metadata, NextPage } from 'next';
import Container from "@mui/material/Container";
import dynamic from 'next/dynamic';
import 'react-toastify/dist/ReactToastify.css';


const ListingTable = dynamic(() => import('./containers/appointment/page').then((mod) => mod), {
  ssr: false,
});
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
          {/* <ListingTable initialAppointments={[]}/> */}
          <Login />
      </Container>
    </div>
  );
};

export default Home;
