import { useState } from 'react';
import { useComponents } from '../hooks/useComponents';
import { useOcrConfig } from '../hooks/useOcrConfig';
import DocumentValidation from '../components/DocumentValidation';

function OcrConfig() {
  const { components } = useComponents();
  const { configs, addConfig } = useOcrConfig();
  const [formData, setFormData] = useState({
    documentComponent: '',
    criteria: '',
    webhookUrl: 'www.webhook.com'
  });

  const documentComponents = components.filter(c => c.type === 'document');

  const handleSubmit = (e) => {
    e.preventDefault();
    addConfig(formData);
    setFormData({ documentComponent: '', criteria: '', webhookUrl: 'www.webhook.com' });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Configuración OCR y Validación</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Configuración de Documento</h3>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Componente de Documento</label>
            <select
              value={formData.documentComponent}
              onChange={(e) => setFormData({ ...formData, documentComponent: e.target.value })}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Selecciona un componente de documento</option>
              {documentComponents.map((component, index) => (
                <option key={index} value={component.name}>
                  {component.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Criterios de Validación</label>
            <textarea
              value={formData.criteria}
              onChange={(e) => setFormData({ ...formData, criteria: e.target.value })}
              className="w-full p-2 border rounded-md"
              rows="4"
              required
              placeholder="Ingresa los criterios de validación..."
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">URL del Webhook</label>
            <input
              type="text"
              value={formData.webhookUrl}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-50"
            />
          </div>
          
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Guardar Configuración
          </button>
        </form>

        <DocumentValidation configs={configs} />
      </div>
    </div>
  );
}

export default OcrConfig;