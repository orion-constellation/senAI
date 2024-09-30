import React from 'react';
import { Card as UICard, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { Button } from "@components/ui/button";

interface CardProps {
  selectedFunction: string;
  onFunctionChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  result: string;
}

const Card: React.FC<CardProps> = ({
  selectedFunction,
  onFunctionChange,
  onSubmit,
  isLoading,
  result
}) => {
  return (
    <UICard className="w-96 bg-black text-white border-2 border-green-500 shadow-lg relative">
      <CardHeader>
        <CardTitle className="text-right text-sm text-white">Orion Analysis Tool</CardTitle>
      </CardHeader>
      <CardContent>
        <select
          className="bg-white text-black border-2 border-green-500 rounded-lg h-10 px-3 py-2 w-full"
          value={selectedFunction}
          onChange={(e) => onFunctionChange(e.target.value)}
        >
          <option value="" disabled>
            Select a function
          </option>
          <option value="get_cyber_info">get_cyber_info</option>
          <option value="run analysis">run analysis</option>
        </select>

        <Button onClick={onSubmit} className="w-full bg-white text-black mt-4">
          {isLoading ? "Processing..." : "Submit"}
        </Button>

        {result && (
          <div className="mt-4 bg-white text-black p-3 border-2 border-green-500 rounded-lg">
            {result}
          </div>
        )}
      </CardContent>
    </UICard>
  );
};

export default Card;