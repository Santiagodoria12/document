import { useState } from 'react';

export function useComponents() {
  const [components, setComponents] = useState([]);

  const addComponent = (component) => {
    setComponents([...components, component]);
  };

  return { components, addComponent };
}