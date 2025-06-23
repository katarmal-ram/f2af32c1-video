
import React from 'react';
import { usePageConfig } from '@/hooks/usePageConfig';
import { useConfig } from '@/hooks/useConfig';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SectionRenderer from '@/components/SectionRenderer';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import FeaturedProductsAutoSection from '@/components/sections/FeaturedProductsAutoSection';
import WhatsappButton from '@/components/WhatsappButton';

const Home = () => {
  const { config: pageConfig, loading: pageLoading, error: pageError } = usePageConfig('home');
  const { config: globalConfig, loading: globalLoading } = useConfig();
  const { config: productsPageConfig } = usePageConfig('products');

  if (pageLoading || globalLoading) {
    return <LoadingScreen title={pageConfig?.meta?.title} />;
  }

  if (pageError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Page</h1>
          <p className="text-gray-600">{pageError}</p>
        </div>
      </div>
    );
  }

  // Define fixed section order for home page - stats first, then featured products
  const beforeFeaturedSections = ['whyChooseUs', 'aboutusintro', 'stats'];
  const afterFeaturedSections = ['expertise', 'testimonials', 'faqs', 'cta'];

  return (
    <>
      <style>{`
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
        
        html {
          scroll-behavior: smooth;
        }
        
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
      
      <div className="min-h-screen">
        <Header config={globalConfig} />
        {pageConfig?.hero && <Hero config={{ hero: pageConfig.hero }} />}
        
        {/* Sections before featured products */}
        {pageConfig?.sections && beforeFeaturedSections.map((sectionKey) => {
          const section = pageConfig.sections[sectionKey];
          if (!section) return null;
          
          return (
            <div key={sectionKey} className="fade-in-up">
              <SectionRenderer 
                sectionKey={sectionKey} 
                section={section} 
                products={productsPageConfig?.products}
              />
            </div>
          );
        })}
        
        {/* Auto-generated Featured Products Section - positioned after stats */}
        <FeaturedProductsAutoSection />
        
        {/* Remaining sections after featured products */}
        {pageConfig?.sections && afterFeaturedSections.map((sectionKey) => {
          const section = pageConfig.sections[sectionKey];
          if (!section) return null;
          
          return (
            <div key={sectionKey} className="fade-in-up">
              <SectionRenderer 
                sectionKey={sectionKey} 
                section={section} 
                products={productsPageConfig?.products}
              />
            </div>
          );
        })}
        
        <Footer config={globalConfig} />
        <WhatsappButton config={globalConfig} />
      </div>
    </>
  );
};

export default Home;
