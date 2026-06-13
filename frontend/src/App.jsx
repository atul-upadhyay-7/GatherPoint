import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import CustomerLoginPage from './components/CustomerLoginPage';
import PosTerminal from './components/PosTerminal';
import Orders from './components/Orders';
import Customers from './components/Customers';
import Tables from './components/Tables';
import Kitchen from './components/Kitchen';
import Admin from './components/Admin';
import Reports from './components/Reports';
import SessionManager from './components/SessionManager';
import AccessDenied from './components/AccessDenied';

// Hooks
import useAuth from './hooks/useAuth';

// Utils
import { constants } from './utils/constants';

// Query client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <AccessDenied />;
  }

  return children;
};

// Main App component
function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={!user ? <CustomerLoginPage /> : <Navigate to="/" replace />}
        />
        <Route path="/" element={<LandingPage />} />

        {/* Protected routes */}
        <Route
          path="/pos"
          element={
            <ProtectedRoute allowedRoles={[constants.ROLES.EMPLOYEE, constants.ROLES.ADMIN]}>
              <Layout>
                <PosTerminal />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute allowedRoles={[constants.ROLES.EMPLOYEE, constants.ROLES.ADMIN]}>
              <Layout>
                <Orders />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers"
          element={
            <ProtectedRoute allowedRoles={[constants.ROLES.EMPLOYEE, constants.ROLES.ADMIN]}>
              <Layout>
                <Customers />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/tables"
          element={
            <ProtectedRoute allowedRoles={[constants.ROLES.EMPLOYEE, constants.ROLES.ADMIN]}>
              <Layout>
                <Tables />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/kitchen"
          element={
            <ProtectedRoute allowedRoles={[constants.ROLES.KITCHEN_STAFF, constants.ROLES.ADMIN]}>
              <Layout>
                <Kitchen />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={[constants.ROLES.ADMIN]}>
              <Layout>
                <Admin />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={[constants.ROLES.EMPLOYEE, constants.ROLES.ADMIN]}>
              <Layout>
                <Reports />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/session"
          element={
            <ProtectedRoute allowedRoles={[constants.ROLES.EMPLOYEE, constants.ROLES.ADMIN]}>
              <Layout>
                <SessionManager />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;