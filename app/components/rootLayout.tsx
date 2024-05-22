import dynamic from 'next/dynamic';

const Header = dynamic(() => import('./header').then((mod) => mod), {
  ssr: false,
});
const Footer = dynamic(() => import('./footer').then((mod) => mod), {
  ssr: false,
});

export interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props;
  return (
    <>
      <Header />
      <main>{children}</main>
      
    </>
  );
};

export default RootLayout;
