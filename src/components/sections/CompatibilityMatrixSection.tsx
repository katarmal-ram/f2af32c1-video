
import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface CompatibilityMatrixSectionProps {
  section: {
    title: string;
    subtitle: string;
    matrix: {
      applications: string[];
      products: Array<{
        name: string;
        compatibility: boolean[];
      }>;
      legend: {
        compatible: string;
        limited: string;
        notCompatible: string;
      };
    };
  };
}

const CompatibilityMatrixSection: React.FC<CompatibilityMatrixSectionProps> = ({ section }) => {
  if (!section?.matrix) {
    console.warn('CompatibilityMatrixSection: No matrix data provided');
    return null;
  }

  const { applications, products, legend } = section.matrix;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {section.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {section.subtitle}
          </p>
        </div>

        {/* Legend */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-50 rounded-lg p-4 inline-flex space-x-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">{legend.compatible}</span>
            </div>
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-gray-700">{legend.notCompatible}</span>
            </div>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <div className="bg-white rounded-lg shadow-lg border overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-amber-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 border-r">
                      Products / Applications
                    </th>
                    {applications.map((app, index) => (
                      <th key={index} className="px-4 py-4 text-center text-sm font-semibold text-gray-800 border-r last:border-r-0 min-w-[120px]">
                        {app}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, productIndex) => (
                    <tr key={productIndex} className={productIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 border-r">
                        {product.name}
                      </td>
                      {product.compatibility.map((isCompatible, appIndex) => (
                        <td key={appIndex} className="px-4 py-4 text-center border-r last:border-r-0">
                          <div className="flex justify-center">
                            {isCompatible ? (
                              <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              </div>
                            ) : (
                              <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                                <XCircle className="w-5 h-5 text-red-500" />
                              </div>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            For specific application requirements or custom compatibility solutions, 
            <a href="/contact" className="text-amber-600 hover:text-amber-700 font-medium ml-1">
              contact our technical team
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CompatibilityMatrixSection;
