import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import MissionForm from './components/MissionForm';
import ExitAuthorizationForm from './components/ExitAuthorizationForm';
import DechargeArgentForm from './components/DechargeArgentForm';
import EmployeesPage from './pages/EmployeesPage';
import DashboardPage from './pages/DashboardPage';
import TransportsPage from './pages/TransportsPage';
import ProfessionPage from './pages/ProfessionPage';
import MissionOrdersPage from './pages/MissionOrdersPage';
import NotFoundPage from './pages/NotFoundPage'; // Page 404
import MainLayout from './components/MainLayout'; // Layout commun
import ChangePassword from './components/ChangePassword';
import ExitAuthorizationsPage from './pages/ExitAuthorizationsPage';
import DocumentLegalsPage from './pages/DocumentsPage';
import DechargeArgentsPage from './pages/DechargeArgentsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirection vers /login */}

        {/* Private Routes (Groupées sous MainLayout) */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="transports" element={<TransportsPage />} />
          <Route path="professions" element={<ProfessionPage />} />
          <Route path="create-mission" element={<MissionForm />} />
          <Route path="create-exit-auth" element={<ExitAuthorizationForm />} />
          <Route path="/mission-orders" element={<MissionOrdersPage />} />
          <Route path="create-decharge-argent" element={<DechargeArgentForm />} />
          <Route path="/decharge-argents" element={<DechargeArgentsPage />} />
          <Route path="/exit-authorizations" element={<ExitAuthorizationsPage />} />
          <Route path="/documents-legaux" element={<DocumentLegalsPage />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>

        {/* 404 Page Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;