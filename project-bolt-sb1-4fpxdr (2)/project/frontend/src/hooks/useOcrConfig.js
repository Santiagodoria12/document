import { useState } from 'react';

export function useOcrConfig() {
  const [configs, setConfigs] = useState([]);

  const addConfig = (config) => {
    setConfigs([...configs, {
      ...config,
      id: Date.now(),
      status: 'active'
    }]);
  };

  const updateConfig = (id, newConfig) => {
    setConfigs(configs.map(config => 
      config.id === id ? { ...config, ...newConfig } : config
    ));
  };

  const deleteConfig = (id) => {
    setConfigs(configs.filter(config => config.id !== id));
  };

  return { configs, addConfig, updateConfig, deleteConfig };
}