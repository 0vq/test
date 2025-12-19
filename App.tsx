
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Ruta Maestra para acceso directo sin pasarela */}
        <Route path="/gate/override" element={<DashboardPage adminBypass={true} />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
