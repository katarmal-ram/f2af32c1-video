
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { usePageConfig } from '@/hooks/usePageConfig';
import { useConfig } from '@/hooks/useConfig';
import { ArrowRight } from 'lucide-react';

const FeaturedProductsAutoSection: React.FC = () => {
  const { config: productsConfig } = usePageConfig('products');
  const { config: globalConfig } = useConfig();
  const navigate = useNavigate();

  if (!productsConfig?.products?.categories?.length || !globalConfig?.featuredProducts) {
    return null;
  }

  // Get first 4 products from all categories
  const featuredProducts = [];
  let count = 0;
  const maxProducts = 4;

  for (const category of productsConfig.products.categories) {
    if (count >= maxProducts) break;
    for (const product of category.products) {
      if (count >= maxProducts) break;
      featuredProducts.push({
        ...product,
        categoryName: category.name,
        categoryId: category.id
      });
      count++;
    }
  }

  const handleViewAllProducts = () => {
    navigate('/products');
  };

  const handleRequestQuote = () => {
    navigate('/contact');
  };

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
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .product-card {
          animation: slideInUp 0.6s ease-out;
        }
        
        .product-card:nth-child(1) { animation-delay: 0.1s; opacity: 0; animation-fill-mode: both; }
        .product-card:nth-child(2) { animation-delay: 0.2s; opacity: 0; animation-fill-mode: both; }
        .product-card:nth-child(3) { animation-delay: 0.3s; opacity: 0; animation-fill-mode: both; }
        .product-card:nth-child(4) { animation-delay: 0.4s; opacity: 0; animation-fill-mode: both; }
        
        .section-header {
          animation: slideInLeft 0.8s ease-out;
        }
      `}</style>
      
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="section-header text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {globalConfig.featuredProducts.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              {globalConfig.featuredProducts.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredProducts.map((product: any, index: number) => (
              <Card 
                key={product.id} 
                className="product-card hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-2"
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-4">
                    <Badge className="mb-2 bg-amber-100 text-amber-800 hover:bg-amber-200">
                      {product.categoryName}
                    </Badge>
                    <CardTitle className="text-lg text-gray-800 group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {product.specifications?.slice(0, 2).map((spec: string, specIndex: number) => (
                        <Badge key={specIndex} variant="outline" className="text-xs">
                          {spec.length > 15 ? `${spec.substring(0, 15)}...` : spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={handleRequestQuote}
                    size="sm"
                    className="w-full bg-amber-600 hover:bg-amber-700 group-hover:shadow-lg transition-all"
                  >
                    Get Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={handleViewAllProducts}
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 group"
            >
              View All Products
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedProductsAutoSection;
