import { useState } from 'react';
import axios from 'axios';

export function useDocumentValidation() {
  const [validationResult, setValidationResult] = useState(null);

  const validateDocument = async (file) => {
    try {
      const formData = new FormData();
      formData.append('document', file);

      // Simular la llamada al webhook (en producción, esto sería la URL real)
      const response = await axios.post('www.webhook.com', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Procesar la respuesta
      setValidationResult({
        isValid: response.data.isValid,
        message: response.data.message,
        details: response.data.details,
      });

      return response.data;
    } catch (error) {
      console.error('Error validating document:', error);
      setValidationResult({
        isValid: false,
        message: 'Error al validar el documento',
        details: ['No se pudo conectar con el servicio de validación'],
      });
      throw error;
    }
  };

  return { validateDocument, validationResult };
}