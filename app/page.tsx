import HeroSection from "@/src/components/heroSection";
import FAQSection from "@/src/features/landing/faq";
import FeatureHighlights from "@/src/features/landing/featuresHighlight";
import HowItWorks from "@/src/features/landing/howitworks";

export default function Home() {
  return (
   <div>
<HeroSection/>
<FeatureHighlights/>
<HowItWorks/>
<FAQSection/>
   </div>
  );
}
