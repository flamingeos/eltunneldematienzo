import Hero from "@/components/home/Hero";
import VideoShowcase from "@/components/home/VideoShowcase";
import ServicesPreview from "@/components/home/ServicesPreview";
import MembershipsPreview from "@/components/home/MembershipsPreview";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <VideoShowcase />
      <ServicesPreview />
      <MembershipsPreview />
      <CTASection />
    </>
  );
}
