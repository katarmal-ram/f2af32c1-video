
import React, { useState } from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';

interface ExpertiseSectionProps {
  section: any;
}

const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({ section }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  if (!section) return null;

  const sectors = section.sectors || [];

  if (sectors.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .slide-in-bottom {
          animation: slideInFromBottom 0.8s ease-out;
        }
        
        .scale-in {
          animation: scaleIn 0.5s ease-out;
        }
        
        .sector-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .sector-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }
        
        .applications-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        
        @media (max-width: 768px) {
          .applications-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }
        }
      `}</style>
      
      <section className="py-20 bg-gradient-to-br from-gray-50 to-amber-50/30">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 slide-in-bottom">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {section.title || 'Our Expertise'}
            </h2>
            {section.subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
                {section.subtitle}
              </p>
            )}
            {section.description && (
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {section.description}
              </p>
            )}
          </div>

          {/* Sectors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {sectors.map((sector: any, index: number) => (
              <div
                key={sector.id || index}
                className={`sector-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer group scale-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {/* Image */}
                {sector.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={sector.image}
                      alt={sector.name || 'Industry'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors duration-300">
                        {sector.name || 'Industry'}
                      </h3>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6 space-y-4">
                  {!sector.image && (
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                      {sector.name || 'Industry'}
                    </h3>
                  )}
                  
                  {sector.description && (
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {sector.description}
                    </p>
                  )}

                  {/* Applications */}
                  {sector.applications && sector.applications.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-gray-800 flex items-center">
                        <ChevronRight className="w-4 h-4 mr-1 text-amber-600" />
                        Key Applications
                      </h4>
                      <div className="applications-grid">
                        {sector.applications.slice(0, 4).map((app: string, appIndex: number) => (
                          <div
                            key={appIndex}
                            className="text-xs bg-amber-50 text-amber-700 px-3 py-2 rounded-lg border border-amber-200 hover:bg-amber-100 transition-colors duration-300 text-center"
                          >
                            {app}
                          </div>
                        ))}
                      </div>
                      {sector.applications.length > 4 && (
                        <div className="text-xs text-gray-500 text-center">
                          +{sector.applications.length - 4} more applications
                        </div>
                      )}
                    </div>
                  )}

                  {/* Hover Effect */}
                  <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm text-amber-600 font-medium">Learn More</span>
                    <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ExpertiseSection;
