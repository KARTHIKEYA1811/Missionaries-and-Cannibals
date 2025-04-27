
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { toast } from '@/components/ui/sonner';

type Person = {
  id: string;
  type: 'missionary' | 'cannibal';
};

type GameState = {
  leftBank: {
    missionaries: string[];
    cannibals: string[];
  };
  rightBank: {
    missionaries: string[];
    cannibals: string[];
  };
  boat: {
    position: 'left' | 'right';
    passengers: Person[];
  };
  selectedPerson: Person | null;
  gameStatus: 'playing' | 'won' | 'lost';
  moves: number;
};

interface GameContextType {
  state: GameState;
  selectPerson: (id: string, type: 'missionary' | 'cannibal') => void;
  moveBoat: () => void;
  resetGame: () => void;
}

const initialState: GameState = {
  leftBank: {
    missionaries: ['m1', 'm2', 'm3'],
    cannibals: ['c1', 'c2', 'c3'],
  },
  rightBank: {
    missionaries: [],
    cannibals: [],
  },
  boat: {
    position: 'left',
    passengers: [],
  },
  selectedPerson: null,
  gameStatus: 'playing',
  moves: 0,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<GameState>(initialState);

  const checkGameStatus = (newState: GameState): 'playing' | 'won' | 'lost' => {
    // Check win condition - all missionaries and cannibals on right bank
    if (
      newState.rightBank.missionaries.length === 3 &&
      newState.rightBank.cannibals.length === 3
    ) {
      toast("🎉 Victory!", {
        description: `Congratulations! You've successfully crossed everyone in ${newState.moves} moves!`,
        duration: 5000,
      });
      return 'won';
    }

    // Check if cannibals outnumber missionaries on either bank (lose condition)
    const leftMissionaries = newState.leftBank.missionaries.length;
    const leftCannibals = newState.leftBank.cannibals.length;
    const rightMissionaries = newState.rightBank.missionaries.length;
    const rightCannibals = newState.rightBank.cannibals.length;

    if (
      (leftMissionaries > 0 && leftCannibals > leftMissionaries) ||
      (rightMissionaries > 0 && rightCannibals > rightMissionaries)
    ) {
      return 'lost';
    }

    return 'playing';
  };

  const selectPerson = (id: string, type: 'missionary' | 'cannibal') => {
    if (state.gameStatus !== 'playing') return;

    const newState = { ...state };
    const boatPosition = newState.boat.position;
    const currentBank = boatPosition === 'left' ? newState.leftBank : newState.rightBank;
    const boatPassengers = newState.boat.passengers;

    // Check if person is already in the boat
    const personInBoat = boatPassengers.find(p => p.id === id);
    if (personInBoat) {
      // Remove from boat and put back to the current bank
      newState.boat.passengers = boatPassengers.filter(p => p.id !== id);
      
      if (type === 'missionary') {
        currentBank.missionaries.push(id);
      } else {
        currentBank.cannibals.push(id);
      }
      
      setState({
        ...newState,
        selectedPerson: null
      });
      return;
    }

    // Check if person is on the current bank
    const isOnCurrentBank = 
      (type === 'missionary' && currentBank.missionaries.includes(id)) ||
      (type === 'cannibal' && currentBank.cannibals.includes(id));

    if (isOnCurrentBank) {
      // Only allow boarding if there's space in the boat
      if (boatPassengers.length < 2) {
        // Remove from bank
        if (type === 'missionary') {
          currentBank.missionaries = currentBank.missionaries.filter(m => m !== id);
        } else {
          currentBank.cannibals = currentBank.cannibals.filter(c => c !== id);
        }
        
        // Add to boat
        boatPassengers.push({ id, type });
        
        setState({
          ...newState,
          selectedPerson: { id, type }
        });

        // Show feedback toast
        toast(`${type === 'missionary' ? 'Missionary' : 'Cannibal'} boarded the boat!`);
      } else {
        toast("The boat is full! (Max 2 people)", {
          description: "Remove someone from the boat first."
        });
      }
    }
  };

  const moveBoat = () => {
    if (state.gameStatus !== 'playing') return;
    
    // Only allow the boat to move if it has at least one passenger
    if (state.boat.passengers.length === 0) {
      toast("Cannot move an empty boat!", {
        description: "Add at least one person to the boat."
      });
      return;
    }

    const newState = { ...state };
    // Toggle boat position
    newState.boat.position = newState.boat.position === 'left' ? 'right' : 'left';
    newState.moves += 1;
    
    // Check game status after the move
    const status = checkGameStatus(newState);
    newState.gameStatus = status;

    setState(newState);

    // Show appropriate toast based on game status
    if (status === 'won') {
      toast("Congratulations! You've won!", {
        description: `You solved the puzzle in ${newState.moves} moves.`,
      });
    } else if (status === 'lost') {
      toast("Game Over!", {
        description: "Cannibals outnumber missionaries on one bank.",
      });
    } else {
      toast("Boat moved to the other side.");
    }
  };

  const resetGame = () => {
    // Create a fresh copy of initialState instead of using the reference
    const freshState: GameState = {
      leftBank: {
        missionaries: ['m1', 'm2', 'm3'],
        cannibals: ['c1', 'c2', 'c3'],
      },
      rightBank: {
        missionaries: [],
        cannibals: [],
      },
      boat: {
        position: 'left' as const,
        passengers: [],
      },
      selectedPerson: null,
      gameStatus: 'playing',
      moves: 0,
    };
    
    setState(freshState);
    toast("Game reset. Good luck!");
  };

  return (
    <GameContext.Provider
      value={{
        state,
        selectPerson,
        moveBoat,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
