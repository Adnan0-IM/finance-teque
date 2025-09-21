import { FadeIn } from "@/components/animations/FadeIn";
import PageTransition from "@/components/animations/PageTransition";
import DashboardNavigation from "@/components/DashboardNavigation";

export default function StartupApplicationPage() {
  return (
    <DashboardNavigation>
      <PageTransition>
        <FadeIn>
          <section className="max-w-7xl mx-auto px-6 py-10">
            comming soon
          </section>
        </FadeIn>
      </PageTransition>
    </DashboardNavigation>
  );
}
