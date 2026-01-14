import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HealthCheckPage } from '@/features/health-check';
import { useAuth } from '@/features/auth';
import { ProtectedLayout } from '@/components/layout/ProtectedLayout';
import { HomePageAdvisor, HomePageClient } from '@/features/home';
import LoginPage from '@/features/login-register/pages/LoginPage';
import RegisterPage from '@/features/login-register/pages/RegisterPage';
import ClientsPage from '@/features/clients-page/pages/ClientsPage';

function RoleBasedRedirect() {
  const { user } = useAuth();
  if (user?.role === 'CLIENT') {
    return <Navigate to="/client/home" replace />;
  }
  return <Navigate to="/advisor/home" replace />;
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/healthcheck" element={<HealthCheckPage />} />

        {/* Advisor layout - persists across child route changes */}
        <Route element={<ProtectedLayout allowedRoles={['ADVISOR', 'ADMIN']} />}>
          <Route path="/advisor/home" element={<HomePageAdvisor />} />
          <Route path="/clients" element={<ClientsPage />} />
        </Route>

        {/* Client layout */}
        <Route element={<ProtectedLayout allowedRoles={['CLIENT']} />}>
          <Route path="/client/home" element={<HomePageClient />} />
        </Route>

        {/* Protected redirects */}
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<RoleBasedRedirect />} />
          <Route path="/home" element={<RoleBasedRedirect />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
