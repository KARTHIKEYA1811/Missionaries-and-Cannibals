
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface InstructionsProps {
  onClose: () => void;
}

const Instructions = ({ onClose }: InstructionsProps) => {
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>How to Play</CardTitle>
        <CardDescription>Missionaries and Cannibals Puzzle</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-bold">Objective:</h3>
          <p>Move all three missionaries and all three cannibals from the left bank to the right bank of the river.</p>
        </div>
        
        <div>
          <h3 className="font-bold">Rules:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>The boat can carry at most two people at a time.</li>
            <li>The boat cannot cross the river by itself; at least one person must be in it.</li>
            <li>If cannibals outnumber missionaries on either bank, the missionaries will be eaten.</li>
            <li>The goal is to get everyone safely to the other side.</li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold">Controls:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Click on a person to put them in the boat (if it's not full).</li>
            <li>Click on a person in the boat to return them to the bank.</li>
            <li>Click the "Row" button to move the boat to the opposite bank.</li>
          </ul>
        </div>
        
        <Button onClick={onClose} className="w-full mt-4">Start Playing</Button>
      </CardContent>
    </Card>
  );
};

export default Instructions;
