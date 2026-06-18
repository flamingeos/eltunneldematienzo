import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import ServicesPreview from "@/components/home/ServicesPreview";
import MembershipsPreview from "@/components/home/MembershipsPreview";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesPreview />
      <MembershipsPreview />
      <Testimonials />
      <CTASection />
    </>
  );
}
