import React, { type PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

import { Box, Container, LinearProgress, styled } from '@mui/material';
import Head from 'next/head';

import { Header } from '~/components/header';
import { useProgress } from '~/providers/progress-provider';
import { MEASURES } from '~/styles/measures';

import 'react-toastify/dist/ReactToastify.css';

const containerStyles = {
  p: 2,
};

const Wrapper = styled(Box)({
  minHeight: '100vh',
  minWidth: '100%',
  overflowY: 'scroll',
  paddingTop: MEASURES.HEADER_HEIGHT,
});

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { progressIsShown } = useProgress();

  return (
    <Wrapper>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta name="robots" content="noindex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer />
      {progressIsShown && <LinearProgress color="primary" />}
      <Header />

      <Box component="main">
        <Container sx={containerStyles}>{children}</Container>
      </Box>
    </Wrapper>
  );
};
