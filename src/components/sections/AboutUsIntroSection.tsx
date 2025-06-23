
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface AboutUsIntroSectionProps {
  section: any;
}

const AboutUsIntroSection: React.FC<AboutUsIntroSectionProps> = ({ section }) => {
  if (!section) return null;

  const highlights = section.highlights || [];

  return (
    <>
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .slide-in-left {
          animation: slideInLeft 0.8s ease-out;
        }
        
        .slide-in-right {
          animation: slideInRight 0.8s ease-out;
        }
        
        .fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .stagger-1 {
          animation-delay: 0.1s;
          opacity: 0;
          animation-fill-mode: both;
        }
        
        .stagger-2 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: both;
        }
        
        .stagger-3 {
          animation-delay: 0.3s;
          opacity: 0;
          animation-fill-mode: both;
        }
        
        .stagger-4 {
          animation-delay: 0.4s;
          opacity: 0;
          animation-fill-mode: both;
        }
      `}</style>
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
            {/* Content */}
            <div className="space-y-8 slide-in-left">
              <div className="fade-in-up">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                  {section.title || 'About Us'}
                </h2>
                {section.subtitle && (
                  <p className="text-xl text-amber-600 font-semibold mb-6">
                    {section.subtitle}
                  </p>
                )}
              </div>
              
              {section.description && (
                <p className="text-lg text-gray-600 leading-relaxed fade-in-up stagger-1">
                  {section.description}
                </p>
              )}

              {highlights.length > 0 && (
                <div className="space-y-4 fade-in-up stagger-2">
                  {highlights.map((highlight: string, index: number) => (
                    <div key={index} className="flex items-center space-x-3 group">
                      <div className="flex-shrink-0 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors duration-300">
                        <CheckCircle className="w-4 h-4 text-amber-600" />
                      </div>
                      <span className="text-gray-700 font-medium group-hover:text-amber-700 transition-colors duration-300">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Image */}
            {section.image && (
              <div className="slide-in-right">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                  <img
                    src={section.image}
                    alt={section.title || 'About Us'}
                    className="relative w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUsIntroSection;
