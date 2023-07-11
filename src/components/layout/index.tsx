import React, { type PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

import { Box, Container, LinearProgress, styled } from '@mui/material';

import { Header } from '~/components/header';
import { useProgress } from '~/providers/progress-provider';
import { MEASURES } from '~/styles/measures';

import 'react-toastify/dist/ReactToastify.css';

const boxStyles = {};

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
      <ToastContainer />
      {progressIsShown && <LinearProgress color="primary" />}
      <Header />

      <Box component="main" sx={boxStyles}>
        <Container sx={containerStyles}>{children}</Container>
      </Box>
    </Wrapper>
  );
};
