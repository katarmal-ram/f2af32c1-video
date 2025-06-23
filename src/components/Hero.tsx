import React from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  config: any;
}

const Hero: React.FC<HeroProps> = ({ config }) => {
  const navigate = useNavigate();

  if (!config) return null;

  const { hero } = config;

  const handlePrimaryClick = () => {
    const action = hero.cta?.primaryAction || '/products';
    navigate(action);
  };

  const handleSecondaryClick = () => {
    const action = hero.cta?.secondaryAction || '/contact';
    navigate(action);
  };

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .slide-up-animation {
          animation: slideUp 1s ease-out;
        }
        
        .slide-up-delay-1 {
          animation: slideUp 1s ease-out 0.2s both;
        }
        
        .slide-up-delay-2 {
          animation: slideUp 1s ease-out 0.4s both;
        }
        
        .fade-in-animation {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
      
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        {hero.type === 'video' ? <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src={hero.backgroundVideo} type="video/mp4" />
          </video> : <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{
        backgroundImage: `url(${hero.backgroundImage})`
      }} />}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="fade-in-animation">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight slide-up-animation">
              {hero.title}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl mb-12 font-medium text-amber-400 slide-up-delay-1">
              {hero.subtitle}
            </p>

            {/* CTA buttons */}
            {hero.cta && (
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center slide-up-delay-2">
                <Button
                  size="lg"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 w-full sm:w-auto text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  onClick={handlePrimaryClick}
                >
                  {hero.cta.primary}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleSecondaryClick}
                  className="border-2 border-white text-white hover:text-gray-900 px-8 py-4 w-full sm:w-auto text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent"
                >
                  <Play className="w-5 h-5 mr-2" />
                  {hero.cta.secondary}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          
        </div>
      </section>
    </>
  );
};

export default Hero;
