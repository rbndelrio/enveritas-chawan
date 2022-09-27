import React from 'react';
import ReactDOM from 'react-dom/client';

import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppProviders } from './AppProviders';
import { ErrorFallback } from './common/ErrorFallback';
import './index.css';

import { Editor } from './routes/Editor';
import { Projects } from './routes/Projects';
import { Root } from './routes/Root';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '',
        element: <Projects />,
      },
      {
        path: '/projects/',
        element: <Projects />,
      },
      {
        path: '/projects/:projectId',
        element: <Editor />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </ErrorBoundary>
  </React.StrictMode>
)
