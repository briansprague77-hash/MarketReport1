import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AudienceBar from '@/components/layout/AudienceBar';
import { AudienceProvider } from '@/lib/audience';
import ScrollProgressBar from '@/components/ui/ScrollProgressBar';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AudienceProvider>
      <ScrollProgressBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <AudienceBar />
    </AudienceProvider>
  );
}
