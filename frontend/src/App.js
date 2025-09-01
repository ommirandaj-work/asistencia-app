// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import DashboardTecnico from './pages/DashboardTecnico';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardSupervisor from './pages/DashboardSupervisor';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/tecnico/dashboard" element={<DashboardTecnico />} />
                <Route path="/admin/dashboard" element={<DashboardAdmin />} />
                <Route path="/supervisor/dashboard" element={<DashboardSupervisor />} />
            </Routes>
        </Router>
    );
}

export default App;