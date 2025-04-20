'use client';

import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  editable?: boolean;
  size?: 'small' | 'medium' | 'large';
  count?: number;
  showValue?: boolean;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({
  value,
  onChange,
  editable = false,
  size = 'medium',
  count = 5,
  showValue = false,
  className = '',
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  
  const sizeStyles = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-2xl',
  };
  
  const handleMouseOver = (newValue: number) => {
    if (editable) {
      setHoverValue(newValue);
    }
  };
  
  const handleMouseLeave = () => {
    if (editable) {
      setHoverValue(null);
    }
  };
  
  const handleClick = (newValue: number) => {
    if (editable && onChange) {
      onChange(newValue);
    }
  };
  
  const renderStars = () => {
    const stars = [];
    const displayValue = hoverValue !== null ? hoverValue : value;
    
    for (let i = 1; i <= count; i++) {
      const isFilled = i <= displayValue;
      
      stars.push(
        <span
          key={i}
          className={twMerge(
            'inline-block',
            isFilled ? 'text-primary' : 'text-background-hover',
            editable ? 'cursor-pointer' : '',
            sizeStyles[size]
          )}
          onMouseOver={() => handleMouseOver(i)}
          onClick={() => handleClick(i)}
        >
          ★
        </span>
      );
    }
    
    return stars;
  };
  
  return (
    <div 
      className={twMerge('inline-flex items-center', className)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex">{renderStars()}</div>
      
      {showValue && (
        <span className="ml-2 text-text-secondary">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;