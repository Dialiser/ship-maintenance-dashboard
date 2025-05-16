import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages and Components
import LoginForm from "./components/Authentication/LoginForm";
import DashboardPage from "./pages/DashboardPage";
import ShipsPage from "./pages/ShipsPage";
import ShipDetailPage from "./pages/ShipDetailPage";
import ShipForm from "./components/Ships/ShipForm"; // Import ShipForm for add/edit

// Contexts
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import { ShipsProvider } from "./contexts/ShipsContext";
import { ComponentsProvider } from "./contexts/ComponentsContext";
import { JobsProvider } from "./contexts/JobsContext";

// Protected route wrapper
function ProtectedRoute({ children }) {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <ShipsProvider>
        <ComponentsProvider>
          <JobsProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Route */}
                <Route path="/login" element={<LoginForm />} />

                {/* Redirect root to dashboard if logged in */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Navigate to="/dashboard" />
                    </ProtectedRoute>
                  }
                />

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ships"
                  element={
                    <ProtectedRoute>
                      <ShipsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ships/new"
                  element={
                    <ProtectedRoute>
                      <ShipForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ships/edit/:id"
                  element={
                    <ProtectedRoute>
                      <ShipForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ships/:id"
                  element={
                    <ProtectedRoute>
                      <ShipDetailPage />
                    </ProtectedRoute>
                  }
                />

                {/* Future Routes for Jobs, Components, Notifications could be added here */}

                {/* Fallback Route for unknown paths */}
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </BrowserRouter>
          </JobsProvider>
        </ComponentsProvider>
      </ShipsProvider>
    </AuthProvider>
  );
}

export default App;
