import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [showReservation, setShowReservation] = useState(false);

  const userInfo = {
    name: "John Doe",
    email: "johndoe@example.com",
  };

  const reservations = [
    { date: "2024-03-10", time: "10:00 - 12:00", room: "A101" },
    { date: "2024-03-12", time: "14:00 - 16:00", room: "B203" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden text-white"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=1740&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay + blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/70 backdrop-blur-sm z-0" />

      {/* Logo */}
      <img
        src="/public/images/logohcmut.png"
        alt="Logo"
        className="absolute top-5 left-5 w-14 h-14 z-10 drop-shadow-lg"
      />

      {/* Nội dung chính */}
      <div className="z-10 text-center space-y-10">
        <h1 className="text-5xl font-extrabold drop-shadow-xl tracking-wide">
          Smart Study Space @ HCMUT
        </h1>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <button
            onClick={() => navigate("/booking")}
            className="px-10 py-4 rounded-xl border border-white/40 bg-white/10 backdrop-blur-md text-white text-xl font-semibold shadow-lg hover:scale-105 hover:bg-white/20 hover:border-white transition-all duration-300"
            style={{
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
            }}
          >
            📅 Book a Room
          </button>

          <button
            onClick={() => navigate("/cancel")}
            className="px-10 py-4 rounded-xl border border-red-300 bg-red-500/20 backdrop-blur-md text-white text-xl font-semibold shadow-lg hover:scale-105 hover:bg-red-500/40 hover:border-white transition-all duration-300"
            style={{
              boxShadow: '0 0 25px rgba(255, 80, 80, 0.3)',
            }}
          >
            ❌ Cancel Booking
          </button>
        </div>
      </div>

      {/* Sidebar bên phải */}
      <div className="absolute top-0 right-0 w-[300px] h-full bg-white/90 text-gray-900 shadow-2xl p-6 backdrop-blur-md z-10">
        <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
          👤 My Info
        </h2>
        <p><strong>Username:</strong> {userInfo.name}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>

        <button
          onClick={() => setShowReservation(!showReservation)}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {showReservation ? "Hide Reservations" : "My Reservations"}
        </button>

        {showReservation && (
          <div className="mt-4 space-y-3 max-h-40 overflow-y-auto">
            {reservations.map((res, idx) => (
              <div key={idx} className="bg-gray-100 p-3 rounded-md text-sm shadow">
                <p><strong>Date:</strong> {res.date}</p>
                <p><strong>Time:</strong> {res.time}</p>
                <p><strong>Room:</strong> {res.room}</p>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default HomePage;
