
import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface WhatsappButtonProps {
  config: any;
}

const WhatsappButton: React.FC<WhatsappButtonProps> = ({ config }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!config?.whatsapp?.number) return null;

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(config.whatsapp.message || "Hello! I'm interested in your services.");
    const phoneNumber = config.whatsapp.number.replace(/[^\d]/g, '');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        
        .whatsapp-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .whatsapp-pulse::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #25D366;
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
      
      <div className="fixed bottom-6 right-6 z-50">
        {/* Expanded Chat Preview */}
        {isExpanded && (
          <div className="mb-4 bg-white rounded-2xl shadow-2xl p-4 max-w-xs animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-800">{config.company?.name}</p>
                  <p className="text-xs text-green-500">Typically replies instantly</p>
                </div>
              </div>
              <button 
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              {config.whatsapp.message}
            </p>
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg py-2 px-4 text-sm font-medium transition-colors"
            >
              Start Chat
            </button>
          </div>
        )}

        {/* Main WhatsApp Button */}
        <div className="relative">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            onDoubleClick={handleWhatsAppClick}
            className="whatsapp-float whatsapp-pulse relative w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          >
            <MessageCircle className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
          </button>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat with us on WhatsApp
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatsappButton;
