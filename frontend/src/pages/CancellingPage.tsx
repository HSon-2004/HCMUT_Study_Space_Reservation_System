import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CancellingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("book_id");
  const encodedRoomName = searchParams.get("room_name");
  const checkinTime = searchParams.get("checkin");
  const checkoutTime = searchParams.get("checkout");

  const [message, setMessage] = useState("");
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserBookings = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("You are not logged in. Please log in first.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }
        if (response.status !== 200) {
          setMessage("Failed to fetch bookings.");
          return;
        }

        const bookings = response.data as { book_id: string; status: string }[];
        const booking = bookings.find((b) => b.book_id === bookingId);

        if (!booking) {
          setMessage("Booking not found.");
          return;
        }

        setBookingDetails(booking);

        if (booking.status === "confirmed") {
          setMessage("You can cancel this booking.");
        } else {
          setMessage("This booking cannot be cancelled.");
        }
      } catch (error) {
        setMessage("Error fetching bookings.");
        console.error(error);
      }
    };

    fetchUserBookings();
  }, [bookingId]);

  const handleCancel = async () => {
    if (!bookingDetails) return;

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/bookings/${bookingDetails.book_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      if (response.status !== 200) {
        setMessage("Failed to cancel booking.");
        return;
      }

      setMessage("Booking cancelled successfully.");
    } catch (error) {
      setMessage("Failed to cancel booking.");
      console.error(error);
    }
  };

  if (!bookingId || !encodedRoomName) {
    return <div className="text-center mt-10 text-red-500">No booking info available.</div>;
  }

  const roomName = decodeURIComponent(encodedRoomName || "");
  const checkinFormatted = checkinTime ? new Date(checkinTime).toLocaleString() : "N/A";
  const checkoutFormatted = checkoutTime ? new Date(checkoutTime).toLocaleString() : "N/A";

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage: "url('/images/background_hcmut.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/70 backdrop-blur-sm z-0" />
      <img
        src="/images/logohcmut.png"
        alt="HCMUT Logo"
        className="absolute top-5 left-5 w-14 h-14 z-10 drop-shadow-lg"
      />

      <div className="relative z-10 bg-white text-black p-8 rounded-xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Cancel Booking</h1>
        {message && <p className="text-lg mb-4">{message}</p>}
        <p className="mb-4">Room Name: {roomName}</p>
        <p className="mb-4">Check-in: {checkinFormatted}</p>
        <p className="mb-4">Check-out: {checkoutFormatted}</p>

        {bookingDetails?.status === "confirmed" && (
          <button
            onClick={handleCancel}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded mt-4"
          >
            Cancel Booking
          </button>
        )}
      </div>
    </div>
  );
};

export default CancellingPage;
