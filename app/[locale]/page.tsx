import Hero from './components/common/Hero';
import { getLocale } from 'next-intl/server';
export default async function Home({ params }) {
  const locale = await getLocale();
  return (
    <main>
      <Hero locale={locale} />
    </main>
  );
}
