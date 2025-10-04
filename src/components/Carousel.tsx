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
      <CarouselContent className="-ml-2 sm:-ml-3 md:-ml-4">
        {items.map((item, idx) => {
          // Inside your map for each slide, ensure the card has a stronger style and gradient caption
          const Slide = (
            <Card className="group overflow-hidden h-full rounded-xl shadow-lg hover:shadow-xl transition-shadow">
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

          // Make slides responsive and spaced
          return (
            <CarouselItem
              key={idx}
              className="pl-2 sm:pl-3 md:pl-4 min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3"
            >
              {item.link ? (
                <a
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.link.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="block focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-xl"
                  aria-label={item.title ?? "Open slide link"}
                >
                  {Slide}
                </a>
              ) : (
                Slide
              )}
            </CarouselItem>
          );
        })}
      </CarouselContent>

      {/* Improve arrow styles and hide on mobile */}
      <CarouselPrevious className="hidden group-hover:sm:flex absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full " />
      <CarouselNext className="hidden group-hover:sm:flex absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full " />
    </ShadCarousel>
  );
};

export default Carousel;
