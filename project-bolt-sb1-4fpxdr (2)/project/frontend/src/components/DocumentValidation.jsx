import { useState } from 'react';
import { DocumentIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { useDocumentValidation } from '../hooks/useDocumentValidation';

function DocumentValidation({ configs }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const { validateDocument, validationResult } = useDocumentValidation();
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      handleValidation(file);
    }
  };

  const handleValidation = async (file) => {
    try {
      await validateDocument(file);
      toast.success('Documento validado correctamente');
    } catch (error) {
      toast.error('Error al validar el documento');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Validación de Documentos</h3>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subir Documento para Validación
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                <span>Subir archivo</span>
                <input
                  type="file"
                  className="sr-only"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {validationResult && (
        <div className="mt-4 p-4 rounded-md bg-gray-50">
          <div className="flex items-center mb-2">
            {validationResult.isValid ? (
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
            ) : (
              <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
            )}
            <span className="font-medium">
              {validationResult.isValid ? 'Documento Válido' : 'Documento Inválido'}
            </span>
          </div>
          <p className="text-sm text-gray-600">{validationResult.message}</p>
          {validationResult.details && (
            <ul className="mt-2 text-sm text-gray-600">
              {validationResult.details.map((detail, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">•</span>
                  {detail}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default DocumentValidation;