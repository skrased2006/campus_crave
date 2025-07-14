import { useState, useEffect } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from '../assets/animations/Material wave loading.json';

const LoadingSpinner = ({ delay = 0, size = 200, height = '50vh' }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) return null;

  return (
    <div className="flex justify-center items-center" style={{ height }}>
      <Player
        autoplay
        loop
        src={loadingAnimation}
        style={{ height: `${size}px`, width: `${size}px` }}
      />
    </div>
  );
};

export default LoadingSpinner;

