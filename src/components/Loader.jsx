import React from 'react';
import { GooeyCircleLoader } from 'react-loaders-kit';

const Loader = ({
  className = '',
  size = 60,
  duration = 1,
  colors = ['#6b7280', '#9ca3af', '#d1d5db'],
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
