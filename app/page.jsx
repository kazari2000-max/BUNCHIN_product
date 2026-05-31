import { TopBar, Hero } from "../components/Hero";
import { NameMeaning, Problem, RitualLoop, IsIsnt } from "../components/Product";
import { DeviceDemo } from "../components/Demo";
import { Phase, WhyPhysical, FoundersBeta } from "../components/Business";
import { KPIs, Discipline, Roadmap, Closing } from "../components/Plan";

export default function Page() {
  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", borderLeft: "1px solid #1a1a1a", borderRight: "1px solid #1a1a1a", minHeight: "100vh" }}>
      <TopBar />
      <Hero />
      <NameMeaning />
      <Problem />
      <RitualLoop />
      <DeviceDemo />
      <IsIsnt />
      <Phase />
      <WhyPhysical />
      <FoundersBeta />
      <KPIs />
      <Discipline />
      <Roadmap />
      <Closing />
    </main>
  );
}
