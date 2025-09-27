import { FadeIn } from "@/components/animations/FadeIn";
import PageTransition from "@/components/animations/PageTransition";
import OnboardingLayout from "@/components/layout/OnboardingLayout";
;

export default function StartupApplicationPage() {



  return (
    <OnboardingLayout
      pageTitle="Apply for Startup Funding"
      pageDescription="Join Finance Teque's startup funding program and turn your vision into reality with our expert support and resources."
    >
      <PageTransition>
        <FadeIn>
          <section className="max-w-7xl mx-auto px-6 py-10">
            coming soon
          </section>
        </FadeIn>
      </PageTransition>
    </OnboardingLayout>
  );
}
