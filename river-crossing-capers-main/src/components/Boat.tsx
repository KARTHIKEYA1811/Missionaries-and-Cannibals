
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/context/GameContext';

interface BoatProps {
  position: 'left' | 'right';
  passengers: Array<{ id: string; type: 'missionary' | 'cannibal' }>;
  onMove: () => void;
  canMove: boolean;
}

const Boat = ({ position, passengers, onMove, canMove }: BoatProps) => {
  const { selectPerson } = useGame();
  
  return (
    <div 
      className={cn(
        'boat absolute flex flex-col items-center bottom-0 transition-all duration-1000',
        position === 'left' ? 'left-4' : 'right-4',
        'transform hover:translate-y-[-2px]'
      )}
    >
      <Button 
        variant="outline" 
        size="sm" 
        className="mb-1 bg-white/80 z-10" 
        onClick={onMove} 
        disabled={!canMove}
      >
        {position === 'left' ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
        {position === 'left' ? 'Row Right' : 'Row Left'}
      </Button>

      {/* Boat shape with waves effect */}
      <div className="relative">
        {/* Main boat body */}
        <div className="flex flex-col">
          {/* Passengers area */}
          <div className="flex items-center justify-center gap-2 p-2 bg-boat rounded-t-[2rem] w-32 sm:w-36 h-14 relative z-10">
            {passengers.map(passenger => (
              <div 
                key={passenger.id} 
                className="cursor-pointer hover:scale-110 transition-all duration-200"
                onClick={() => selectPerson(passenger.id, passenger.type)}
                title={`Click to remove ${passenger.type} from boat`}
              >
                <div className={cn(
                  'w-8 h-10 flex items-center justify-center text-white font-bold rounded-md',
                  passenger.type === 'missionary' ? 'bg-missionary' : 'bg-cannibal'
                )}>
                  {passenger.type === 'missionary' ? '😇' : '😈'}
                </div>
              </div>
            ))}
            {passengers.length === 0 && (
              <div className="text-white text-xs">Empty</div>
            )}
          </div>
          {/* Boat bottom */}
          <div className="h-4 bg-boat rounded-b-[100%] w-32 sm:w-36 relative z-10" />
        </div>
        
        {/* Water ripples effect */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-blue-400/30 rounded-full blur-sm animate-pulse" />
      </div>
    </div>
  );
};

export default Boat;
