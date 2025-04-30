import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserMenu from "../components/UserMenu";

const ConfirmPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.slots) {
    return <div className="text-center mt-10 text-red-500">No booking info.</div>;
  }

  const { roomName, slots } = state;
  const book_id = 1;
  const userInfo = {
    name: "John Doe",
    email: "johndoe@example.com",
  };

  const reservations = [
    { date: "2024-03-10", time: "10:00 - 12:00", room: "A101" },
    { date: "2024-03-12", time: "14:00 - 16:00", room: "B203" },
  ];

  const handleConfirmBooking = () => {
    // Điều hướng đến trang QRPage với thông tin booking
    navigate("/qr-code", {
      state: {
        roomName,
        book_id,
      },
    });
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage: "url('/images/background_hcmut.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      {/* Logo */}
      <img
        src="/images/logohcmut.png"
        alt="Logo"
        className="absolute top-5 left-5 w-14 h-14 z-10 drop-shadow-lg"
      />

      {/* User Menu */}
      <UserMenu userInfo={userInfo} reservations={reservations} />

      {/* Main Content */}
      <div className="relative z-10 bg-white text-black p-8 rounded-xl shadow-xl w-full max-w-lg text-center mt-20">
        <h1 className="text-2xl font-bold mb-4">Confirm Your Booking</h1>
        <p className="mb-2">
          <strong>Room:</strong> {roomName}
        </p>

        <div className="mt-4 mb-6 text-left">
          <h2 className="font-semibold mb-2">Selected Slots:</h2>
          <ul className="list-disc list-inside">
            {slots.map((slot: any, idx: number) => (
              <li key={idx}>
                {slot.date} - {slot.time}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center gap-4">
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
            onClick={handleConfirmBooking}
          >
            Confirm
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPage;
