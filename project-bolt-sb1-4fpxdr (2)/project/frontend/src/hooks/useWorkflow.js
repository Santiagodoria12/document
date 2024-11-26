import { useState } from 'react';

export function useWorkflow() {
  const [workflow, setWorkflow] = useState([]);

  const updateWorkflow = (newWorkflow) => {
    setWorkflow(newWorkflow);
  };

  return { workflow, updateWorkflow };
}