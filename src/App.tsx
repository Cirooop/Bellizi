import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RoleProvider } from './context/RoleContext';
import AppRoutes from './router/AppRoutes';
import RoleSelection from './views/RoleSelection';

function App() {
  return (
    <Router>
      <RoleProvider>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </RoleProvider>
    </Router>
  );
}

export default App;