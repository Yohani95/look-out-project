import './globals.css'
import { Inter } from 'next/font/google'
import { useLocale } from 'next-intl';
import Header from '@/app/[locale]/components/header/Header'
import Footer from '@/app/[locale]/components/Footer'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Look Out',
  description: 'Admin',
}
export default function RootLayout({ children }) {
  const locale = useLocale();
  return (
    <html lang={locale}>
      <body>
        <>
        <Header />
        {children}
        </>
        <Footer/>
        </body>
    </html>
  )
}

