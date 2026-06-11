import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Services } from "@/components/services";
import { Approach } from "@/components/approach";
import { Studio } from "@/components/studio";
import { Cta } from "@/components/cta";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <div id="top" className="relative z-10">
      <SiteHeader />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Approach />
        <Studio />
        <Cta />
      </main>
      <SiteFooter />
    </div>
  );
}
