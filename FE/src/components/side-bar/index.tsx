import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const [showReservation, setShowReservation] = useState(false);

  // Dữ liệu user giả lập
  const userInfo = {
    name: "John Doe",
    email: "johndoe@example.com",
  };

  // Dữ liệu lịch đặt phòng giả lập
  const reservations = [
    { date: "2024-03-10", time: "10:00 - 12:00", room: "A101" },
    { date: "2024-03-12", time: "14:00 - 16:00", room: "B203" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user"); // Xóa thông tin đăng nhập
    navigate("/login"); // Điều hướng về trang login
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Nội dung chính */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-cyan-500 text-white flex justify-between items-center px-6 py-3 shadow-md">
          {/* Logo + Tiêu đề */}
          <div className="flex items-center space-x-4">
            <img src="/logo.png" alt="Logo" className="h-10 w-10" />
            <h1 className="text-lg font-bold">
              Smart Study Space Management and Reservation System at HCMUT
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center mt-10">
          <button
            onClick={() => navigate("/booking")}
            className="w-60 text-xl border-2 border-black py-3 rounded-lg mb-4 hover:bg-gray-200"
          >
            Booking
          </button>
          <button
            onClick={() => navigate("/cancel")}
            className="w-60 text-xl border-2 border-black py-3 rounded-lg hover:bg-gray-200"
          >
            Cancel booking
          </button>
        </div>
      </div>

      {/* Sidebar bên phải */}
      <div className="w-60 bg-white shadow-md border border-gray-300">
        {/* My Info */}
        <div className="bg-blue-500 text-white px-4 py-2 font-bold">
          My info
        </div>
        <div className="p-4 border-b border-gray-300">
          <p className="text-gray-700"><strong>Username:</strong> {userInfo.name}</p>
          <p className="text-gray-700"><strong>Email:</strong> {userInfo.email}</p>
        </div>

        {/* My Reservation */}
        <button
          onClick={() => setShowReservation(!showReservation)}
          className="w-full text-left px-4 py-2 border-b border-gray-300 hover:bg-gray-200"
        >
          My reservation
        </button>

        {showReservation && (
          <div className="p-4 border-b border-gray-300">
            <h2 className="text-gray-800 font-bold">Reservations</h2>
            {reservations.length > 0 ? (
              reservations.map((res, index) => (
                <div key={index} className="mt-2 p-2 bg-gray-100 rounded-lg">
                  <p className="text-gray-700"><strong>Date:</strong> {res.date}</p>
                  <p className="text-gray-700"><strong>Time:</strong> {res.time}</p>
                  <p className="text-gray-700"><strong>Room:</strong> {res.room}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-700 mt-2">No reservations found.</p>
            )}
          </div>
        )}

        {/* Log Out */}
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
