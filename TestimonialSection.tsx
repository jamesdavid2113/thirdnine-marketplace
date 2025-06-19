
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const TestimonialSection = () => {
  const { t } = useLanguage();
  
  const testimonials = [
    {
      id: 1,
      name: "Michael R.",
      role: t('testimonials.role.runner'),
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5",
      text: t('testimonials.michael.text'),
    },
    {
      id: 2,
      name: "Sarah T.",
      role: t('testimonials.role.golf'),
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      text: t('testimonials.sarah.text'),
    },
    {
      id: 3,
      name: "David K.",
      role: t('testimonials.role.coach'),
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      text: t('testimonials.david.text'),
    },
    {
      id: 4,
      name: "Jessica M.",
      role: t('testimonials.role.trail'),
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      text: t('testimonials.jessica.text'),
    },
  ];

  return (
    <section className="bg-sidebar py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">{t('testimonials.title')}</h2>

        <Carousel className="w-full">
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="border-none bg-white h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex flex-col items-center text-center flex-grow">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="mb-4 h-16 w-16 rounded-full object-cover"
                      />
                      <div className="mb-4 text-yellow-500">★★★★★</div>
                      <p className="mb-4 italic text-muted-foreground flex-grow flex items-center">"{testimonial.text}"</p>
                      <div className="mt-auto">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex justify-center gap-2">
            <CarouselPrevious className="relative inset-auto" />
            <CarouselNext className="relative inset-auto" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialSection;
