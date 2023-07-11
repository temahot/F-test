import React from 'react';

import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

import useEffectOnce from '~/hooks/common/useEffectOnce';
import { ROUTES } from '~/routes';

const ErrorPage: React.FC = () => {
  const router = useRouter();

  useEffectOnce(() => {
    void router.replace('/404');
  });

  return (
    <Box>
      <Link href={ROUTES.PEOPLE}>
        <Button>
          <Typography variant={'h3'}> 404, back</Typography>
        </Button>
      </Link>
    </Box>
  );
};

export default ErrorPage;
