import React from 'react';
import { GooeyCircleLoader } from 'react-loaders-kit';

const Loader = ({
  className = '',
  size = 60,
  duration = 1,
  colors = ['#4f46e5', '#9333ea', '#06b6d4'],
  center = true,
}) => {
  const wrapperClass = center
    ? `flex justify-center items-center min-h-[60vh] ${className}`
    : className;

  return (
    <div className={wrapperClass}>
      <GooeyCircleLoader
        loading={true}
        size={size}
        duration={duration}
        colors={colors}
      />
    </div>
  );
};

export default Loader;
