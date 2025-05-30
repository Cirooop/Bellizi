// Mock data for standard sizes of roller blinds
export const standardSizes = [
  { id: '1', name: '1.0m x 1.0m', width: 1.0, height: 1.0 },
  { id: '2', name: '1.0m x 1.5m', width: 1.0, height: 1.5 },
  { id: '3', name: '1.0m x 2.0m', width: 1.0, height: 2.0 },
  { id: '4', name: '1.5m x 1.0m', width: 1.5, height: 1.0 },
  { id: '5', name: '1.5m x 1.5m', width: 1.5, height: 1.5 },
  { id: '6', name: '1.5m x 2.0m', width: 1.5, height: 2.0 },
  { id: '7', name: '2.0m x 1.0m', width: 2.0, height: 1.0 },
  { id: '8', name: '2.0m x 1.5m', width: 2.0, height: 1.5 },
  { id: '9', name: '2.0m x 2.0m', width: 2.0, height: 2.0 },
  { id: '10', name: '2.5m x 2.0m', width: 2.5, height: 2.0 },
];

// Generate components based on size
export const generateComponents = (sizeId: string) => {
  const size = standardSizes.find(s => s.id === sizeId);
  
  if (!size) return [];
  
  const { width, height } = size;
  const area = width * height;
  
  return [
    { 
      id: `tube-${sizeId}`, 
      type: 'Tubo', 
      description: `Tubo de aluminio ${width}m`, 
      quantity: 1 
    },
    { 
      id: `fabric-${sizeId}`, 
      type: 'Tela', 
      description: `Tela blackout ${area}m²`, 
      quantity: 1 
    },
    { 
      id: `chain-${sizeId}`, 
      type: 'Cadena', 
      description: `Cadena de metal ${height}m`, 
      quantity: 1 
    },
    { 
      id: `supports-${sizeId}`, 
      type: 'Soportes', 
      description: 'Soportes laterales', 
      quantity: 2 
    },
  ];
};