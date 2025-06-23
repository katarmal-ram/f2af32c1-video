
import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  title?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ title }) => {
  const [siteName, setSiteName] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchSiteName = async () => {
      try {
        const response = await fetch('/pages/config.json');
        if (response.ok) {
          const configData = await response.json();
          const name = configData.site?.name || 'Website';
          setSiteName(name);
          setIsLoaded(true);
          
          // Update document title
          document.title = `${name} - ${configData.site?.tagline || 'Loading...'}`;
          
          // Update favicon if available
          if (configData.site?.favicon) {
            const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
            if (favicon) {
              favicon.href = configData.site.favicon;
            } else {
              // Create favicon link if it doesn't exist
              const newFavicon = document.createElement('link');
              newFavicon.rel = 'icon';
              newFavicon.href = configData.site.favicon;
              newFavicon.type = 'image/png';
              document.head.appendChild(newFavicon);
            }
          }
        }
      } catch (error) {
        console.log('Could not load config, using fallback');
        setSiteName('Website');
        setIsLoaded(true);
        document.title = 'Loading Website...';
      }
    };

    fetchSiteName();
  }, []);

  const displayTitle = title && title !== 'Loading our site...' 
    ? title 
    : isLoaded && siteName 
      ? `Loading ${siteName}...`
      : 'Loading Website...';

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{displayTitle}</h1>
          <p className="text-gray-600">Loading excellence...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
