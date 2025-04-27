
import React from 'react';
import { cn } from '@/lib/utils';

interface PersonProps {
  type: 'missionary' | 'cannibal';
  id: string;
  onSelect: (id: string, type: 'missionary' | 'cannibal') => void;
  isSelected: boolean;
  isInBoat: boolean;
}

const Person = ({ type, id, onSelect, isSelected, isInBoat }: PersonProps) => {
  const handleClick = () => {
    onSelect(id, type);
  };

  return (
    <div 
      onClick={handleClick} 
      className={cn(
        'person w-12 h-16 flex items-center justify-center text-white font-bold rounded-md transition-transform duration-300',
        type === 'missionary' ? 'bg-missionary' : 'bg-cannibal',
        isSelected && 'ring-4 ring-white scale-110',
        isInBoat && 'scale-90'
      )}
    >
      <div className="flex flex-col items-center">
        <div className="text-2xl">
          {type === 'missionary' ? '😇' : '😈'}
        </div>
        <div className="text-xs mt-1">
          {type === 'missionary' ? 'M' : 'C'}
        </div>
      </div>
    </div>
  );
};

export default Person;
