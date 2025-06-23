
import React from 'react';
interface ManufacturingProcessSectionProps {
  section: {
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      step: number;
      title: string;
      description: string;
    }>;
  };
}
const ManufacturingProcessSection: React.FC<ManufacturingProcessSectionProps> = ({
  section
}) => {
  if (!section?.items?.length) {
    console.warn('ManufacturingProcessSection: No items provided');
    return null;
  }
  return <>
      <style>{`
        @keyframes flowDown {
          0% { transform: translateY(-20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes processGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
        }
        
        .process-card {
          animation: flowDown 0.8s ease-out;
        }
        
        .process-step {
          animation: processGlow 3s ease-in-out infinite;
        }
        
        .process-connector {
          background: linear-gradient(to bottom, #3b82f6, #1d4ed8);
          position: relative;
        }
        
        .process-connector::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          width: 6px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, #3b82f6, transparent);
          transform: translateX(-50%);
          animation: flowDown 2s ease-in-out infinite;
        }
      `}</style>
      
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              {section.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {section.subtitle}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-0">
              {section.items.map((step, index) => <div key={step.id} className="relative">
                  {/* Process Step */}
                  <div className="flex items-center">
                    {/* Step Number Circle */}
                    <div className="flex-shrink-0 w-20 h-20 process-step bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-2xl border-4 border-white z-10 relative">
                      {step.step}
                    </div>

                    {/* Process Card */}
                    <div className={`process-card ml-8 flex-1 bg-white rounded-2xl shadow-xl p-6 border-l-4 border-blue-500 hover:shadow-2xl transition-all duration-300 ${index % 2 === 0 ? 'hover:translate-x-2' : 'hover:-translate-x-2'}`}>
                      <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                      
                      {/* Progress Indicator */}
                      <div className="mt-4 flex items-center">
                        <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000"
                            style={{ width: `${((index + 1) / section.items.length) * 100}%` }}
                          ></div>
                        </div>
                        <span className="ml-3 text-sm font-medium text-blue-600">
                          Step {step.step} of {section.items.length}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Connector Line */}
                  {index < section.items.length - 1 && <div className="flex justify-start ml-10">
                      <div className="process-connector w-1 h-16 rounded-full"></div>
                    </div>}
                </div>)}
            </div>
          </div>

          {/* Completion Indicator */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full shadow-lg">
              <div className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse"></div>
              <span className="font-semibold">Precision Manufacturing Process Complete</span>
            </div>
          </div>
        </div>
      </section>
    </>;
};
export default ManufacturingProcessSection;
