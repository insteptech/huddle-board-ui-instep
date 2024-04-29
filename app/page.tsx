import type { Metadata, NextPage } from 'next';
import Container from "@mui/material/Container";
import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ListingTable = dynamic(() => import('./containers/appointment/page').then((mod) => mod), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Home Page',
};

const Home: NextPage = () => {
  return (
    <div>
      <Container maxWidth="xl">
          <ListingTable initialAppointments={[]}/>
          <ToastContainer />
      </Container>
    </div>
  );
};

export default Home;
