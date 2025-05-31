import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { standardSizes, generateComponents } from '../../data/sizes';
import { addOrder } from '../../data/orders';
import { Component } from '../../types';

const CrearVenta = () => {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [address, setAddress] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [selectedSizeId, setSelectedSizeId] = useState('');
  const [components, setComponents] = useState<Component[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sizeId = e.target.value;
    setSelectedSizeId(sizeId);

    if (sizeId) {
      const generatedComponents = generateComponents(sizeId);
      setComponents(generatedComponents);
    } else {
      setComponents([]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentStep === 1) {
      if (!clientName || !address || !selectedSizeId) {
        alert('Por favor complete todos los campos del Paso 1');
        return;
      }

      if (components.length === 0) {
        alert('Debe seleccionar una medida válida para generar los componentes.');
        return;
      }

      setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      if (!width || !height || isNaN(parseFloat(width)) || isNaN(parseFloat(height))) {
        alert('Por favor ingrese correctamente el ancho y alto en metros.');
        return;
      }

      setIsSubmitting(true);

      const size = standardSizes.find(s => s.id === selectedSizeId)?.name || '';

      addOrder({
        clientName,
        address,
        size,
        width: parseFloat(width),
        height: parseFloat(height),
        components,
        status: 'pending',
        clientPhone: '',
        clientEmail: ''
      });

      setTimeout(() => {
        alert('Venta creada con éxito');
        navigate('/vendedor');
      }, 500);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Crear Nueva Venta</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Paso 1: Información del Cliente y Producto</h2>
              
              <div className="mb-4">
                <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Cliente
                </label>
                <input
                  type="text"
                  id="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingrese el nombre del cliente"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección de Instalación
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingrese la dirección de instalación"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                  Medida Estándar
                </label>
                <select
                  id="size"
                  value={selectedSizeId}
                  onChange={handleSizeChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Seleccione una medida</option>
                  {standardSizes.map((size) => (
                    <option key={size.id} value={size.id}>
                      {size.name}
                    </option>
                  ))}
                </select>
              </div>

              {components.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Componentes Generados</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <ul className="divide-y divide-gray-200">
                      {components.map((component) => (
                        <li key={component.id} className="py-3 flex justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{component.type}</p>
                            <p className="text-xs text-gray-500">{component.description}</p>
                          </div>
                          <span className="text-sm text-gray-600">x{component.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </>
          )}

          {currentStep === 2 && (
            <>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Paso 2: Medidas Personalizadas</h2>

              <div className="mb-4">
                <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">
                  Metros de Ancho
                </label>
                <input
                  type="number"
                  id="width"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingrese los metros de ancho"
                  step="0.1"
                  min="0"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                  Metros de Alto
                </label>
                <input
                  type="number"
                  id="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingrese los metros de alto"
                  step="0.1"
                  min="0"
                  required
                />
              </div>

              {components.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Componentes Generados</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <ul className="divide-y divide-gray-200">
                      {components.map((component) => (
                        <li key={component.id} className="py-3 flex justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{component.type}</p>
                            <p className="text-xs text-gray-500">{component.description}</p>
                          </div>
                          <span className="text-sm text-gray-600">x{component.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                if (currentStep === 2) {
                  setCurrentStep(1);
                } else {
                  navigate('/vendedor');
                }
              }}
              className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {currentStep === 1 ? 'Cancelar' : 'Volver'}
            </button>

            <button
              type="submit"
              disabled={
                (currentStep === 1 && (!clientName || !address || !selectedSizeId || components.length === 0)) ||
                (currentStep === 2 && (isSubmitting || !width || !height))
              }
              className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
                (currentStep === 1 && (!clientName || !address || !selectedSizeId || components.length === 0)) ||
                (currentStep === 2 && (isSubmitting || !width || !height))
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {currentStep === 2 ? (isSubmitting ? 'Creando...' : 'Confirmar Venta') : 'Siguiente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearVenta;