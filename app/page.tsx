import type { Metadata, NextPage } from 'next';
import Container from "@mui/material/Container";
import { Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { loadEnvConfig } from '@next/env'


const ListingTable = dynamic(() => import('./containers/auth/listing_table').then((mod) => mod), {
  ssr: false,
});
export const metadata: Metadata = {
  title: 'Home Page',
};


const Home: NextPage = () => {
  

// const projectDir = process.cwd()
// loadEnvConfig(projectDir)

const apiKey = process.env.REACT_APP_STATIC_SLUG;
const apiUrl = process.env.NEXT_APP_API_URL;

console.log(`API Key: ${apiKey}`);
console.log(`API URL: ${apiUrl}`);
  return (
    <div>
      <Container maxWidth="xl">
      <Typography variant="h2" textAlign="center">
        fdrgfd
       <ListingTable/>
      </Typography>
      </Container>
    </div>
  );
};

export default Home;
