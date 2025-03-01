import '@/app/globals.css';
import '@/app/css/TooltipTable.css';
// En tu layout o componente
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Inter } from 'next/font/google';
import { useLocale } from 'next-intl';
import Header from '@/app/[locale]/components/header/Header';
import Footer from '@/app/[locale]/components/Footer';
import AuthContext from '@/app/[locale]/context/AuthContext';
import LayoutWithSession from './components/common/LayoutWithSession';
import { Toaster } from '@/components/ui/sonner';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Look Out',
  description: 'Admin',
};
export default function RootLayout({ children }) {
  const locale = useLocale();
  return (
    <html lang={locale}>
      <body>
        <AuthContext>
          <div className="page-container">
            {/* <Header />
            <div className="main-content">{children}</div>
            <Footer /> */}
            <LayoutWithSession>{children}</LayoutWithSession>
          </div>
        </AuthContext>
        <Toaster theme="light" closeButton className="sonner-toast" />
      </body>
    </html>
  );
}
