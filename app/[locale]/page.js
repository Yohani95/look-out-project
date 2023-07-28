
import { useTranslations } from 'next-intl';
import { Hero_content } from './components/Hero_content';
export default function Home() {
  const t = useTranslations('Common');
  return (
    <main>
      <Hero_content/>
    </main>
  )
}
