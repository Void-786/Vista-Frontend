import React from 'react';
import WhoWeAre from '../components/WhoWeAre';

const WhoWeArePage: React.FC = () => {
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <WhoWeAre />;
};

export default WhoWeArePage;