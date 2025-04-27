
import React from 'react';
import { cn } from '@/lib/utils';
import Person from './Person';

interface BankProps {
  side: 'left' | 'right';
  missionaries: Array<string>;
  cannibals: Array<string>;
  onSelectPerson: (id: string, type: 'missionary' | 'cannibal') => void;
  selectedPerson: { id: string; type: 'missionary' | 'cannibal' } | null;
}

const Bank = ({ side, missionaries, cannibals, onSelectPerson, selectedPerson }: BankProps) => {
  return (
    <div className={cn('bank', side === 'left' ? 'rounded-r-3xl' : 'rounded-l-3xl')}>
      <div className="flex gap-3">
        {missionaries.map((id) => (
          <Person 
            key={id} 
            id={id} 
            type="missionary" 
            onSelect={onSelectPerson} 
            isSelected={selectedPerson?.id === id}
            isInBoat={false}
          />
        ))}
      </div>
      <div className="flex gap-3">
        {cannibals.map((id) => (
          <Person 
            key={id} 
            id={id} 
            type="cannibal" 
            onSelect={onSelectPerson} 
            isSelected={selectedPerson?.id === id}
            isInBoat={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Bank;
