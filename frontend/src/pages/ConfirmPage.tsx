import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserMenu from "../components/UserMenu";
import axios from "axios";
import BACKEND_URL from "../api/config";

const ConfirmPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.slots) {
    return <div className="text-center mt-10 text-red-500">No booking info available.</div>;
  }

  const { room_id, checkin, checkout, roomName, slots } = state;

  const handleConfirmBooking = async () => {
    try {
      interface BookingResponse {
        book_id: string;
      }
      console.log("Sending booking payload:", {
        room_id,
        checkin,
        checkout,
        book_slot: slots.map((s: any) => s.time).join(", ")
      });
      const response = await axios.post<BookingResponse>(
        `${BACKEND_URL}/api/bookings/create`,
        {
          room_id,
          checkin,
          checkout,
          book_slot: slots.map((s: any) => s.time).join(", ") 
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // check error response
      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      if (response.status !== 201) {
        throw new Error(`Failed to confirm booking. Status code: ${response.status}`);
      }

      if (response.data && response.data.book_id) {
        // Navigate to QR code page with book_id from the response
        navigate("/qr-code", {
          state: {
            roomName,
            book_id: response.data.book_id,
            checkin,
            checkout,
          },
        });
        alert("Booking confirmed successfully!");
      } else {
        throw new Error("Failed to confirm booking1.");
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert("Failed to confirm booking2.");
    }
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
        className="absolute top-5 left-5 w-14 h-14 z-10 drop-shadow-lg cursor-pointer"
        onClick={() => navigate('/home')}
        title="Go to Home"
      />

      {/* User Menu */}
      <UserMenu />

      {/* Main Content */}
      <div className="relative z-10 bg-white text-black p-8 rounded-xl shadow-xl w-full max-w-lg text-center mt-20">
        <h1 className="text-2xl font-bold mb-4">Confirm Your Booking</h1>
        <p className="mb-2">
          <strong>Room:</strong> {roomName}
        </p>

        <div className="mt-4 mb-6 text-left">
          <h2 className="font-semibold mb-2">Selected Slots:</h2>
          <ul className="list-disc list-inside">
            {slots && slots.length > 0 ? (
              slots.map((slot: any, idx: number) => (
                <li key={idx}>
                  {slot.date} - {slot.time}
                </li>
              ))
            ) : (
              <li>No slots selected</li>
            )}
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
