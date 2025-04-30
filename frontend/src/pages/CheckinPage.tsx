import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const CheckinPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("book_id");
  const encodedRoomName = searchParams.get("room_name");

  if (!bookingId && !encodedRoomName) {
    return <div className="text-center mt-10 text-red-500">No booking info.</div>;
  }

  console.log("Booking ID:", bookingId);
  const roomName = decodeURIComponent(encodedRoomName || "");
  const [message, setMessage] = useState("");

  const handleCheckin = async () => {
    try {
      // Gọi API thực tế để xử lý check-in ở đây
      await axios.post(`http://localhost:5000/api/bookings/${bookingId}/checkin`);
      setMessage("✅ Check-in successful!");
    } catch (error: any) {
      setMessage("❌ Check-in failed. Booking not found or already checked in.");
    }
  };

  useEffect(() => {
    if (!bookingId) {
      setMessage("❌ Invalid or missing booking ID.");
    }
  }, [bookingId]);

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
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/70 backdrop-blur-sm z-0" />

      {/* Logo */}
      <img
        src="/images/logohcmut.png"
        alt="HCMUT Logo"
        className="absolute top-5 left-5 w-14 h-14 z-10 drop-shadow-lg"
      />

      {/* Check-in Form */}
      <div className="relative z-10 bg-white text-black p-8 rounded-xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Check-in</h1>
        {message ? (
          <p className="text-lg">{message}</p>
        ) : (
          <>
            <p className="mb-4">Booking ID: {bookingId}</p>
            <p className="mb-4">Room Name: {roomName}</p>
            <button
              onClick={handleCheckin}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
              Check In
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckinPage;
