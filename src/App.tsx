import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './store/authStore';
import { useUIStore } from './store/uiStore';
import { LandingPage } from './components/landing/LandingPage';
import { LoginForm } from './components/auth/LoginForm';
import { Layout } from './components/layout/Layout';
import { StudentDashboard } from './components/student/Dashboard';
import { ResumeUpload } from './components/student/ResumeUpload';
import { JobsList } from './components/student/JobsList';
import { JobDetail } from './components/student/JobDetail';
import { ApplicationsList } from './components/student/ApplicationsList';
import { ProtectedRoute } from './components/ProtectedRoute';
import { NotificationsPage } from './components/student/NotificationsPage';
import { SettingsPage } from './components/student/SettingsPage';
import { ProfilePage } from './components/student/ProfilePage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { isAuthenticated, user } = useAuthStore();
  const { theme } = useUIStore();

  useEffect(() => {
    // Apply theme on app load
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            
            {/* Student Routes */}
            <Route
              path="dashboard"
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute requiredRole="student">
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="resume"
              element={
                <ProtectedRoute requiredRole="student">
                  <ResumeUpload />
                </ProtectedRoute>
              }
            />
            <Route
              path="jobs"
              element={
                <ProtectedRoute requiredRole="student">
                  <JobsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="jobs/:id"
              element={
                <ProtectedRoute requiredRole="student">
                  <JobDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="applications"
              element={
                <ProtectedRoute requiredRole="student">
                  <ApplicationsList />
                </ProtectedRoute>
              }
            />
            
            {/* Placeholder routes for other features */}
            <Route
              path="notifications"
              element={
                <ProtectedRoute requiredRole="student">
                  <NotificationsPage />
                </ProtectedRoute>
              }
            />
            <Route 
              path="settings" 
              element={
                <ProtectedRoute requiredRole="student">
                  <SettingsPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Recruiter Routes */}
            <Route path="jobs/new" element={<div className="p-8 text-center text-gray-500">Post job page coming soon...</div>} />
            <Route path="jobs/manage" element={<div className="p-8 text-center text-gray-500">Manage jobs page coming soon...</div>} />
            <Route path="candidates" element={<div className="p-8 text-center text-gray-500">Candidates page coming soon...</div>} />
            <Route path="analytics" element={<div className="p-8 text-center text-gray-500">Analytics page coming soon...</div>} />
            
            {/* Admin Routes */}
            <Route path="admin/dashboard" element={<div className="p-8 text-center text-gray-500">Admin dashboard coming soon...</div>} />
            <Route path="admin/users" element={<div className="p-8 text-center text-gray-500">User management coming soon...</div>} />
            <Route path="admin/jobs" element={<div className="p-8 text-center text-gray-500">Job management coming soon...</div>} />
            <Route path="admin/analytics" element={<div className="p-8 text-center text-gray-500">Admin analytics coming soon...</div>} />
            <Route path="admin/security" element={<div className="p-8 text-center text-gray-500">Security settings coming soon...</div>} />
            <Route path="admin/settings" element={<div className="p-8 text-center text-gray-500">Admin settings coming soon...</div>} />
          </Route>
          
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;