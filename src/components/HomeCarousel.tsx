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
      <div className="my-8 h-48 sm:h-64 rounded-lg bg-muted animate-pulse" />
    );
  }

  if (isError || items.length === 0) {
    return null;
  }

  return <Carousel items={items} className="my-8" />;
};

export default HomeCarousel;
