import { getLocale } from 'next-intl/server';
import Hero from './components/common/Hero';
export default async function Home({ params }) {
  const locale = await getLocale();
  return <Hero locale={locale} />;
}
