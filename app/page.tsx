import type { Metadata, NextPage } from 'next';
import Container from "@mui/material/Container";
import { Typography } from '@mui/material';
import dynamic from 'next/dynamic';

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
      <Typography variant="h2" textAlign="center">
       <ListingTable/>
      </Typography>
      </Container>
    </div>
  );
};

export default Home;
