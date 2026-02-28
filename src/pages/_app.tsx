import '@mantine/core/styles.css';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProps } from 'next/app';
import { Cabin } from 'next/font/google';
import { MantineProvider, PasswordInput } from '@mantine/core';

const cabin = Cabin({
  subsets: ['latin']
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <MantineProvider
      defaultColorScheme="light"
      theme={{
        components: {
          TextInput: {
            styles: {
              input: { fontSize: "16px" },
            },
          },
          PasswordInput: {
            styles: {
              innerInput: { fontSize: "16px" },
            },
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <div className={cabin.className}>
          <Component {...pageProps} />
        </div>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </MantineProvider>
  );
}
