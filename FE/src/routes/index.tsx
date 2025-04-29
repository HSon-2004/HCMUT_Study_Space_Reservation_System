import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "../pages/Welcome";
import Login from "../pages/Login";
import Register from "../pages/Register";
import HomePage from "../pages/HomePage";
import BookingPage from "../pages/BookingPage";
import ConfirmPage from "../pages/ConfirmPage";
import QRCodePage from "../pages/QRcode";


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} /> {/* Trang Welcome */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/confirm" element={<ConfirmPage />} />
        <Route path="/qr-code" element={<QRCodePage />} />


      </Routes>
    </Router>
  );
};

export default AppRoutes;
