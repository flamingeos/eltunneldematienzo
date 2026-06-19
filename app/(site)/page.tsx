import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import ServicesPreview from "@/components/home/ServicesPreview";
import MembershipsPreview from "@/components/home/MembershipsPreview";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <ServicesPreview />
      <MembershipsPreview />
      <CTASection />
    </>
  );
}
