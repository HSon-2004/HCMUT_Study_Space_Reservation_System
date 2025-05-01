import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Welcome from "../pages/Welcome";
import Login from "../pages/Login";
import Register from "../pages/Register";
import HomePage from "../pages/HomePage";
import BookingPage from "../pages/BookingPage";
import ConfirmPage from "../pages/ConfirmPage";
import QRCodePage from "../pages/QRcode";
import CheckinoutPage from "../pages/CheckinoutPage";
import MyReservations from "../pages/MyReservations";
import CancellingPage from "../pages/CancellingPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes */}
        <Route 
          path="/home" 
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/booking" 
          element={
            <PrivateRoute>
              <BookingPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/confirm" 
          element={
            <PrivateRoute>
              <ConfirmPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/qr-code" 
          element={
            <PrivateRoute>
              <QRCodePage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/checkin" 
          element={
            <PrivateRoute>
              <CheckinoutPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/myreservations" 
          element={
            <PrivateRoute>
              <MyReservations />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/cancelling" 
          element={
            <PrivateRoute>
              <CancellingPage />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;