import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home      from './pages/Home';
import HomeAdmin from './pages/HomeAdmin';

import Login    from './pages/Login';
import Register from './pages/Register';

import Dashboard      from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminTransactions from "./pages/AdminTransactions";

import PrivateRoute from './routes/PrivateRoute';
import AdminRoute   from './routes/AdminRoute';

import EditUserPage     from './pages/EditUserPage';
import { AuthProvider } from './contexts/AuthContext';

import VideoWall  from './pages/VideoWall'
import Purchase   from './pages/Purchase';
import CreatePlan from './pages/CreatePlan';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users/:id" element={<EditUserPage />} />
          <Route path="/admin/create-plan" element={<AdminRoute><CreatePlan /></AdminRoute>} />
          <Route path="/admin/transactions" element={<AdminTransactions />} />
          <Route 
            path="/admin/home" 
            element={
              <AdminRoute>
                <HomeAdmin />
              </AdminRoute>
            } 
          />
          <Route 
            path="/comprar" 
            element={
              <PrivateRoute>
                <Purchase />
              </PrivateRoute>
            } 
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/video-wall"
            element={
              <PrivateRoute>
                <VideoWall />
              </PrivateRoute>  
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
