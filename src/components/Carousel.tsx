import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel as ShadCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export type CarouselEntry = {
  image: string; // image URL (required)
  title?: string; // optional
  description?: string; // optional
  link?: string; // optional
};

type Props = {
  items: CarouselEntry[];
  autoPlayDelay?: number; // ms
  className?: string;
};

const Carousel: React.FC<Props> = ({
  items,
  autoPlayDelay = 2000,
  className = "",
}) => {
  return (
    <ShadCarousel
      className={`w-full group  ${className}`}
      opts={{ loop: true, align: "start" }}
      plugins={[
        Autoplay({
          delay: autoPlayDelay,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent >
        {items.map((item, idx) => {
          const ImgAndCaption = (
            <Card className="group overflow-hidden h-full rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="relative w-full aspect-[16/9] bg-muted overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title ?? "Carousel image"}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {(item.title || item.description) && (
                  <CardContent className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                    {item.title && (
                      <h3 className="text-base sm:text-lg font-semibold leading-snug">
                        {item.title}
                      </h3>
                    )}
                    {item.description && (
                      <p className="mt-1 text-xs sm:text-sm text-white/90 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </CardContent>
                )}
              </div>
            </Card>
          );

          const Slide = item.link ? (
            <a
              href={item.link}
              target={item.link.startsWith("http") ? "_blank" : undefined}
              rel={
                item.link.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="block focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-xl"
              aria-label={item.title ?? "Open slide link"}
            >
              {ImgAndCaption}
            </a>
          ) : (
            ImgAndCaption
          );

          return (
            <CarouselItem
              key={idx}
              className="pl-2 sm:pl-3 md:pl-4 basis-full sm:basis-5/6 md:basis-2/3 lg:basis-1/2 xl:basis-2/5"
            >
              {Slide}
            </CarouselItem>
          );
        })}
      </CarouselContent>

      <CarouselPrevious className="hidden group-hover:sm:flex absolute top-1/2 left-3 " />
      <CarouselNext className="hidden group-hover:sm:flex  absolute top-1/2 right-3  " />
    </ShadCarousel>
  );
};

export default Carousel;
