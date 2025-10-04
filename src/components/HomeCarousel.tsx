import Carousel, { type CarouselEntry } from "@/components/Carousel";
import { useCarouselItems } from "@/features/admin/carousel/api/carouselQueries";

const HomeCarousel = () => {
  const { data, isLoading, isError } = useCarouselItems();

  const items: CarouselEntry[] = (data || []).map((i) => ({
    image: i.image,
    title: i.title || undefined,
    description: i.description || undefined,
    link: i.link || undefined,
  }));

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="">
          <div className="h-48 sm:h-64 rounded-xl bg-muted animate-pulse" />
        </div>
      </div>
    );
  }

  if (isError || items.length === 0) {
    return null;
  }

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <Carousel items={items} className="my-2" />
      </div>
  );
};

export default HomeCarousel;
