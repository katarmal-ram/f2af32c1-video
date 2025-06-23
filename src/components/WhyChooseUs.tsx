
import React from 'react';
import { 
  Award, Clock, Cog, Wrench, Truck, Headphones, Shield, Star, 
  Zap, Settings, CheckCircle, Trophy, Users, Globe, Target,
  TrendingUp, ThumbsUp, Lightbulb, Heart, Cpu, Gauge,
  ShieldCheck, Calendar, Package, Phone, Mail, MapPin
} from 'lucide-react';

interface WhyChooseUsProps {
  config: any;
}

const iconMap = {
  award: Award,
  clock: Clock,
  cog: Cog,
  wrench: Wrench,
  truck: Truck,
  headphones: Headphones,
  shield: Shield,
  'shield-check': ShieldCheck,
  star: Star,
  zap: Zap,
  settings: Settings,
  'check-circle': CheckCircle,
  trophy: Trophy,
  users: Users,
  globe: Globe,
  target: Target,
  'trending-up': TrendingUp,
  'thumbs-up': ThumbsUp,
  lightbulb: Lightbulb,
  heart: Heart,
  cpu: Cpu,
  gauge: Gauge,
  calendar: Calendar,
  package: Package,
  phone: Phone,
  mail: Mail,
  'map-pin': MapPin,
};

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ config }) => {
  if (!config) return null;

  const { whyChooseUs } = config;

  // Handle both old structure (reasons) and new structure (items)
  const items = whyChooseUs?.items || whyChooseUs?.reasons || [];

  if (!items || items.length === 0) {
    console.warn('WhyChooseUs: No items provided');
    return null;
  }

  return (
    <>
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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
            transform: translateY(-10px);
          }
        }
        
        .slide-in-up {
          animation: slideInUp 0.6s ease-out;
        }
        
        .slide-in-up-delay-1 {
          animation: slideInUp 0.6s ease-out 0.2s both;
        }
        
        .slide-in-up-delay-2 {
          animation: slideInUp 0.6s ease-out 0.4s both;
        }
        
        .slide-in-up-delay-3 {
          animation: slideInUp 0.6s ease-out 0.6s both;
        }
        
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
      `}</style>
      
      <section className="py-20 bg-gradient-to-br from-gray-50 to-amber-50/30 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 slide-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {whyChooseUs?.title || 'Why Choose Us'}
            </h2>
            {whyChooseUs?.subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {whyChooseUs.subtitle}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {items.map((reason: any, index: number) => {
              // Icon failsafe - use Award as fallback if icon not found
              const IconComponent = iconMap[reason.icon as keyof typeof iconMap] || Award;
              const delayClass = index % 3 === 0 ? 'slide-in-up-delay-1' : 
                               index % 3 === 1 ? 'slide-in-up-delay-2' : 'slide-in-up-delay-3';
              
              return (
                <div
                  key={reason.id || index}
                  className={`bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover-lift group relative overflow-hidden ${delayClass}`}
                >
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:from-amber-200 group-hover:to-orange-200 transition-all duration-300 float-animation">
                      <IconComponent className="w-10 h-10 text-amber-600 group-hover:text-amber-700 transition-colors duration-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-amber-700 transition-colors duration-300">
                      {reason.title || 'Feature'}
                    </h3>
                    {reason.description && (
                      <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors duration-300">
                        {reason.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;
