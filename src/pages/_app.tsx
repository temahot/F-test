import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';

import '~/styles/globals.css';
import { Layout } from '~/components/layout';
import { ProgressProvider } from '~/providers/progress-provider';

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#56B4F9',
        light: '#42a5f5',
        dark: '#1565c0',
        contrastText: '#fff',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ProgressProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProgressProvider>
    </ThemeProvider>
  );
}
