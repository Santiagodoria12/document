import { useState } from 'react';
import { useComponents } from '../hooks/useComponents';

function WorkflowDesigner() {
  const { components } = useComponents();
  const [workflow, setWorkflow] = useState([]);

  const handleDragStart = (e, component) => {
    e.dataTransfer.setData('application/json', JSON.stringify(component));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    try {
      const component = JSON.parse(e.dataTransfer.getData('application/json'));
      setWorkflow([...workflow, component]);
    } catch (error) {
      console.error('Error al añadir componente al flujo:', error);
    }
  };

  const handleWorkflowDragStart = (e, index) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ index }));
  };

  const handleWorkflowDrop = (e, targetIndex) => {
    e.preventDefault();
    try {
      const { index: sourceIndex } = JSON.parse(e.dataTransfer.getData('application/json'));
      const newWorkflow = [...workflow];
      const [movedItem] = newWorkflow.splice(sourceIndex, 1);
      newWorkflow.splice(targetIndex, 0, movedItem);
      setWorkflow(newWorkflow);
    } catch (error) {
      console.error('Error al reordenar el flujo:', error);
    }
  };

  return (
    <div className="flex gap-6">
      <div className="w-1/3">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Componentes Disponibles</h3>
          <div className="space-y-2">
            {components.map((component, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, component)}
                className="p-3 bg-gray-50 rounded-md border cursor-move hover:bg-gray-100 transition-colors"
              >
                {component.name}
              </div>
            ))}
            {components.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No hay componentes disponibles
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="w-2/3">
        <div 
          className="bg-white p-6 rounded-lg shadow-md min-h-[500px]"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <h3 className="text-lg font-semibold mb-4">Diseño del Flujo</h3>
          <div className="space-y-2">
            {workflow.map((item, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleWorkflowDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleWorkflowDrop(e, index)}
                className="p-3 bg-gray-50 rounded-md border cursor-move hover:bg-gray-100 transition-colors"
              >
                {item.name}
              </div>
            ))}
            {workflow.length === 0 && (
              <div className="text-gray-400 text-center py-8">
                Arrastra componentes aquí para crear tu flujo de trabajo
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkflowDesigner;