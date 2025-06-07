import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { Analytics } from '@vercel/analytics/react';
import { SWRConfig } from 'swr';
import Footer from './components/Footer';
import './app.css';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='icon' href='favicon.svg' type='image/svg+xml' />
        <title>Package Commits</title>
        <Meta />
        <Links />
      </head>
      <body className='h-svh flex flex-col bg-linear-to-t from-body-gradient-b to-body-gradient-t text-xs sm:text-base tracking-tight sm:tracking-normal'>
        <SWRConfig value={{ revalidateOnFocus: false }}>
          <div className='flex-1'>{children}</div>
          <Footer />
        </SWRConfig>
        <ScrollRestoration />
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}
