import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { standardSizes, generateComponents } from '../../data/sizes';
import { addOrder } from '../../data/orders';
import { Component } from '../../types';

const CrearVenta = () => {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState('');
  const [address, setAddress] = useState('');
  const [selectedSizeId, setSelectedSizeId] = useState('');
  const [components, setComponents] = useState<Component[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle size selection
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clientName || !address || !selectedSizeId) {
      alert('Por favor complete todos los campos');
      return;
    }
    
    setIsSubmitting(true);
    
    // Get the selected size name
    const size = standardSizes.find(s => s.id === selectedSizeId)?.name || '';
    
    // Create new order
    addOrder({
      clientName,
      address,
      size,
      components,
      status: 'pending',
    });
    
    // Show success message and redirect
    setTimeout(() => {
      alert('Venta creada con éxito');
      navigate('/vendedor');
    }, 500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Crear Nueva Venta</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
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
              Dirección
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
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/vendedor')}
              className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !components.length}
              className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
                isSubmitting || !components.length 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Creando...' : 'Confirmar Venta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearVenta;