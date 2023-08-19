
import Hero from "./components/common/Hero";
import { useSession } from "next-auth/react";
export default async function Home() {
    return (
      <main>
        <Hero/>
      </main>
    )
}
