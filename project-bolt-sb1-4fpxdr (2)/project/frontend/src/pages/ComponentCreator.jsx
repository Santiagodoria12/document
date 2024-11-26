import { useState } from 'react';
import { useComponents } from '../hooks/useComponents';

function ComponentCreator() {
  const { components, addComponent } = useComponents();
  const [formData, setFormData] = useState({ type: 'text', name: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addComponent(formData);
    setFormData({ ...formData, name: '' });
  };

  const componentTypes = {
    text: 'Texto',
    number: 'Número',
    email: 'Correo',
    document: 'Documento',
    identity: 'Validación de Identidad'
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Creador de Componentes</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Tipo de Componente</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full p-2 border rounded-md"
          >
            {Object.entries(componentTypes).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nombre</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded-md"
            placeholder="Ingrese el nombre del componente"
            required
          />
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Crear Componente
        </button>
      </form>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Componentes Creados</h3>
        <div className="space-y-2">
          {components.map((component, index) => (
            <div
              key={index}
              className="p-3 bg-gray-50 rounded-md border flex justify-between items-center"
            >
              <span>{component.name} ({componentTypes[component.type]})</span>
            </div>
          ))}
          {components.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No hay componentes creados aún
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ComponentCreator;