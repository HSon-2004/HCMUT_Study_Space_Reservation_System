import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate} from "react-router-dom";
import axios from "axios";
import UserMenu from "../components/UserMenu";

const CheckinoutPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("book_id");
  const encodedRoomName = searchParams.get("room_name");
  const checkinTime = searchParams.get("checkin");
  const checkoutTime = searchParams.get("checkout");
  const [message, setMessage] = useState("");
  const [bookingDetails, setBookingDetails] = useState<any>(null); // To store the booking details
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserBookings = async () => {
      const token = localStorage.getItem("token");

      try {
        // Fetch all bookings for the user
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
          setMessage("Failed to fetch bookings. Please try again.");
          return;
        }

        // Find the booking that matches the `book_id` from the URL
        const bookings = response.data as { book_id: string; status: string }[];
        const booking = bookings.find((booking) => booking.book_id === bookingId);

        if (!booking) {
          setMessage("Booking not found.");
          return;
        }

        setBookingDetails(booking);

        
      } catch (error: any) {
        setMessage("Error fetching bookings. Please try again.");
        console.error(error);
      }
    };

    fetchUserBookings();
  }, [bookingId]);

  const handleCheckin = async () => {
    if (!bookingDetails) return;
    
    try {
      // Make API call to check-in
      const response = await axios.post(`http://localhost:5000/api/bookings/${bookingDetails.book_id}/checkin`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      if (response.status !== 200) {
        setMessage("Check-in failed. Please try again.");
        return;
      }

      setMessage("Check-in successful!");
    } catch (error: any) {
      setMessage("Check-in failed.");
    }
  };

  const handleCheckout = async () => {
    if (!bookingDetails) return;
    
    try {
      const response = await axios.delete(`http://localhost:5000/api/bookings/${bookingDetails.book_id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      if (response.status !== 200) {
        setMessage("Checkout failed. Please try again.");
        return;
      }
      
      setMessage("Checkout successful!");
    } catch (error: any) {
      setMessage("Checkout failed.");
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
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/70 backdrop-blur-sm z-0" />

      {/* Logo */}
      <img
        src="/images/logohcmut.png"
        alt="Logo"
        className="absolute top-5 left-5 w-14 h-14 z-10 drop-shadow-lg cursor-pointer"
        onClick={() => navigate('/home')}
        title="Go to Home"
      />

      {/* Check-in/Check-out Form */}
      <div className="relative z-10 bg-white text-black p-8 rounded-xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">{bookingDetails ? bookingDetails.status === "checked_in" ? "Check-out" : "Check-in" : "Loading..."}</h1>

        {message ? (
          <p className="text-lg">{message}</p>
        ) : (
          <>
            <p className="mb-4">Room Name: {roomName}</p>
            <p className="mb-4">Check-in: {checkinFormatted}</p>
            <p className="mb-4">Check-out: {checkoutFormatted}</p>
            {bookingDetails?.status === "confirmed" && (
              <button
                onClick={handleCheckin}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
              >
                Check-in
              </button>
            )}
            {bookingDetails?.status === "checked_in" && (
              <button
                onClick={handleCheckout}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded mt-4"
              >
                Check-out
              </button>
            )}
            {bookingDetails?.status !== "checked_in" && bookingDetails?.status !== "confirmed" && (
              <p className="text-red-500 mt-4">You cannot check in/out at this time.</p>
            )}
          </>
        )}
      </div>
      <UserMenu/>
    </div>
  );
};

export default CheckinoutPage;
