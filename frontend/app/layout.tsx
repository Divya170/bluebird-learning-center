import type { Metadata, Viewport } from 'next';
import './globals.css';
import { StoreProvider } from '@/lib/store';
import { fetchSite } from '@/lib/server';
import SiteShell from '@/components/SiteShell';

export const metadata: Metadata = {
  title: { default: 'Bluebird Learning Center — Newark, DE', template: '%s · Bluebird Learning Center' },
  description: 'Programs and courses at Bluebird Learning Center in Newark, Delaware. Browse courses, meet the teachers and send a registration request.',
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#FBFAF7' };

// content changes from the admin, so always render with fresh data
export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await fetchSite();
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap" />
      </head>
      <body>
        <StoreProvider initialSite={site}>
          <SiteShell>{children}</SiteShell>
        </StoreProvider>
      </body>
    </html>
  );
}
