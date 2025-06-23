
import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialsSectionProps {
  section: any;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ section }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  if (!section) return null;

  const testimonials = section.items || [];

  if (testimonials.length === 0) return null;

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <>
      <style>{`
        @keyframes testimonialFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        .testimonial-enter {
          animation: testimonialFadeIn 0.5s ease-out;
        }
        
        .quote-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .star-sparkle {
          animation: float 2s ease-in-out infinite;
        }
        
        .star-sparkle:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .star-sparkle:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        .star-sparkle:nth-child(4) {
          animation-delay: 0.6s;
        }
        
        .star-sparkle:nth-child(5) {
          animation-delay: 0.8s;
        }
        
        .testimonial-card {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.9);
        }
      `}</style>
      
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-amber-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {section.title || 'What Our Clients Say'}
            </h2>
            {section.subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {section.subtitle}
              </p>
            )}
          </div>

          {/* Testimonials Carousel */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Main Testimonial */}
              <div className="testimonial-card rounded-3xl p-8 md:p-12 shadow-xl testimonial-enter">
                {/* Quote Icon */}
                <div className="flex justify-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center quote-float">
                    <Quote className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Rating */}
                {testimonials[currentIndex]?.rating && (
                  <div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 star-sparkle ${
                          i < testimonials[currentIndex].rating
                            ? 'text-amber-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Content */}
                <blockquote className="text-xl md:text-2xl text-gray-700 text-center mb-8 leading-relaxed font-medium">
                  "{testimonials[currentIndex]?.content || 'Great service and quality products.'}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center space-x-4">
                  {testimonials[currentIndex]?.image && (
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex]?.name || 'Client'}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  )}
                  <div className="text-center">
                    <div className="font-bold text-gray-800 text-lg">
                      {testimonials[currentIndex]?.name || 'Anonymous'}
                    </div>
                    {testimonials[currentIndex]?.designation && (
                      <div className="text-amber-600 font-medium">
                        {testimonials[currentIndex].designation}
                      </div>
                    )}
                    {testimonials[currentIndex]?.company && (
                      <div className="text-gray-600 text-sm">
                        {testimonials[currentIndex].company}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              {testimonials.length > 1 && (
                <>
                  <button
                    onClick={prevTestimonial}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-amber-50 transition-colors duration-300 group"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-amber-600" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-amber-50 transition-colors duration-300 group"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-amber-600" />
                  </button>
                </>
              )}
            </div>

            {/* Dots Indicator */}
            {testimonials.length > 1 && (
              <div className="flex justify-center space-x-2 mt-8">
                {testimonials.map((_: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-amber-500 w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* All Testimonials Grid (for larger screens) */}
          {testimonials.length > 1 && (
            <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto">
              {testimonials.map((testimonial: any, index: number) => (
                <div
                  key={testimonial.id || index}
                  className={`testimonial-card rounded-2xl p-6 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                    index === currentIndex ? 'ring-2 ring-amber-400' : ''
                  }`}
                  onClick={() => goToTestimonial(index)}
                >
                  {/* Mini Rating */}
                  {testimonial.rating && (
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? 'text-amber-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Mini Content */}
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    "{testimonial.content || 'Great service and quality products.'}"
                  </p>

                  {/* Mini Author */}
                  <div className="flex items-center space-x-3">
                    {testimonial.image && (
                      <img
                        src={testimonial.image}
                        alt={testimonial.name || 'Client'}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <div className="font-semibold text-gray-800 text-sm">
                        {testimonial.name || 'Anonymous'}
                      </div>
                      {testimonial.company && (
                        <div className="text-gray-600 text-xs">
                          {testimonial.company}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;
