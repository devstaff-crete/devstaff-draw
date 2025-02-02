import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProps } from 'next/app';
import { Cabin } from '@next/font/google';
import { useState } from 'react';
import { MantineProvider, PasswordInput, ColorSchemeProvider, ColorScheme } from '@mantine/core';

const cabin = Cabin({
  subsets: ['latin']
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme,
          components: {
            TextInput: {
              styles: {
                input: { fontSize: '16px' }
              }
            },
            PasswordInput: {
              styles: {
                innerInput: { fontSize: '16px' }
              }
            }
          }
        }}
      >
        <QueryClientProvider client={queryClient}>
          <div className={cabin.className}>
            <Component {...pageProps} />
          </div>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
