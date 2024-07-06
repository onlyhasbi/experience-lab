import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import '../globals.css';
import { routeTree } from './routeTree.gen.ts';
import { CustomProvider } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const client = new QueryClient();
const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <CustomProvider theme="light">
        <RouterProvider router={router} />
      </CustomProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
