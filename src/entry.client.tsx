import React from 'react';
import ReactDOM from 'react-dom/client';
import { HydratedRouter } from 'react-router/dom';
import { SWRConfig } from 'swr';

ReactDOM.hydrateRoot(
  document,
  <React.StrictMode>
    <SWRConfig value={{ revalidateOnFocus: false }}>
      <HydratedRouter />
    </SWRConfig>
  </React.StrictMode>
);
