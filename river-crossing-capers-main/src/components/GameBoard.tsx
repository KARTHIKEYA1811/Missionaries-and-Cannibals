import React, { useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import Bank from './Bank';
import Boat from './Boat';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

const GameBoard = () => {
  const { state, selectPerson, moveBoat, resetGame } = useGame();

  useEffect(() => {
    const river = document.querySelector('.river');
    if (!river) return;

    const createRipple = () => {
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      
      const x = Math.random() * river.clientWidth;
      const y = Math.random() * river.clientHeight;
      
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      river.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 1500);
    };
    
    const intervalId = setInterval(createRipple, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    toast("Welcome to Missionaries & Cannibals!", {
      description: "Move all missionaries and cannibals to the other side safely. Don't let cannibals outnumber missionaries on either bank!",
      duration: 5000,
    });
  }, []);

  useEffect(() => {
    if (state.gameStatus === 'won') {
      toast("🎉 Victory!", {
        description: `Amazing! You solved the puzzle in ${state.moves} moves!`,
        duration: 5000,
      });
    }
  }, [state.gameStatus, state.moves]);

  return (
    <div className="flex flex-col min-h-screen w-full max-w-4xl mx-auto p-4">
      <Card className={cn(
        "mb-4 transition-all duration-500",
        state.gameStatus === 'won' && "animate-bounce"
      )}>
        <CardHeader>
          <CardTitle className="text-center">Missionaries & Cannibals</CardTitle>
          <CardDescription className="text-center">
            A classic river crossing puzzle
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-2">
            <div>Moves: {state.moves}</div>
            <div>Status: 
              {state.gameStatus === 'playing' && <span className="text-blue-500"> Playing</span>}
              {state.gameStatus === 'won' && (
                <span className="text-green-500 animate-bounce inline-block"> 
                  You Won! 🎉
                </span>
              )}
              {state.gameStatus === 'lost' && <span className="text-red-500"> You Lost! 😢</span>}
            </div>
            <Button onClick={resetGame}>Reset Game</Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col flex-grow">
        <div className="flex-grow">
          <Bank 
            side="left"
            missionaries={state.leftBank.missionaries} 
            cannibals={state.leftBank.cannibals}
            onSelectPerson={selectPerson}
            selectedPerson={state.selectedPerson}
          />
        </div>

        <div className="river">
          <Boat 
            position={state.boat.position}
            passengers={state.boat.passengers}
            onMove={moveBoat}
            canMove={state.boat.passengers.length > 0 && state.gameStatus === 'playing'}
          />
        </div>

        <div className="flex-grow">
          <Bank 
            side="right"
            missionaries={state.rightBank.missionaries} 
            cannibals={state.rightBank.cannibals}
            onSelectPerson={selectPerson}
            selectedPerson={state.selectedPerson}
          />
        </div>
      </div>

      {state.gameStatus !== 'playing' && (
        <Card className={cn(
          "mt-4 transition-all duration-500",
          state.gameStatus === 'won' ? 'animate-fade-in scale-100' : 'scale-95 opacity-0'
        )}>
          <CardContent className="pt-4">
            <h2 className={`text-xl font-bold ${state.gameStatus === 'won' ? 'text-green-500' : 'text-red-500'}`}>
              {state.gameStatus === 'won' ? 'Congratulations! 🎉' : 'Game Over! 😢'}
            </h2>
            <p className="mt-2">
              {state.gameStatus === 'won' 
                ? `You successfully crossed everyone in ${state.moves} moves!` 
                : 'The cannibals outnumbered the missionaries on one bank.'}
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={resetGame} className="w-full">Play Again</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default GameBoard;
