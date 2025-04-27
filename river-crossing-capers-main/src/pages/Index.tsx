
import React, { useState } from 'react';
import { GameProvider } from '@/context/GameContext';
import GameBoard from '@/components/GameBoard';
import Instructions from '@/components/Instructions';

const Index = () => {
  const [showInstructions, setShowInstructions] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-100 p-4">
      <GameProvider>
        {showInstructions ? (
          <div className="flex items-center justify-center min-h-[80vh]">
            <Instructions onClose={() => setShowInstructions(false)} />
          </div>
        ) : (
          <GameBoard />
        )}
      </GameProvider>
    </div>
  );
};

export default Index;
