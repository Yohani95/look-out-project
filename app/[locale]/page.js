
import Hero from "./components/common/Hero";
import { useLocale } from "next-intl";
export default async function Home() {
  const locale = useLocale();
    return (
      <main>
        <Hero locale={locale}/>
      </main>
    )
}
