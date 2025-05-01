import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type Reservation = {
  book_id: string;
  checkin: string;
  checkout: string;
  room_name: string;
  status: string;
};

const MyReservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get<Reservation[]>(
          `http://localhost:5000/api/bookings`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setReservations(response.data);
        if (response.status === 401) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        if (response.status !== 200) {
          setError("Failed to fetch reservations");
          return;
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [navigate]);

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

      {/* Main Content */}
      <div className="relative z-10 bg-white text-black p-8 rounded-xl shadow-xl w-full max-w-lg text-center mt-20 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">My Reservations</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : reservations.length === 0 ? (
          <p className="text-center text-gray-600">No reservations found.</p>
        ) : (
          <div className="grid gap-4 w-full overflow-y-auto max-h-[500px]">
            {expandedId ? (
              reservations
                .filter((res) => res.book_id === expandedId)
                .map((res) => (
                  <div
                    key={res.book_id}
                    className="bg-white p-4 rounded-lg shadow-md border border-gray-200 text-left"
                  >
                    <p><strong>Room:</strong> {res.room_name}</p>
                    <p><strong>Status:</strong> {res.status}</p>
                    <p><strong>Check-in:</strong> {new Date(res.checkin).toLocaleString()}</p>
                    <p><strong>Check-out:</strong> {new Date(res.checkout).toLocaleString()}</p>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-3 mt-4">
                      <button 
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                        onClick={() => navigate(`/checkin?book_id=${res.book_id}&room_name=${encodeURIComponent(res.room_name)}&checkin=${res.checkin}&checkout=${res.checkout}`)}
                      >
                        Check in/out
                      </button>
                      <button 
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                        onClick={() => navigate(`/cancelling?book_id=${res.book_id}&room_name=${encodeURIComponent(res.room_name)}&checkin=${res.checkin}&checkout=${res.checkout}`)}
                      >
                        Cancelled
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              reservations.map((res) => (
                <div
                  key={res.book_id}
                  className="bg-white p-4 rounded-lg shadow-md border border-gray-200 cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => setExpandedId(res.book_id)}
                >
                  <p className="font-semibold">{res.room_name}</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Footer Buttons */}
        <div className="mt-6">
          {expandedId ? (
            <button
              className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded"
              onClick={() => setExpandedId(null)}
            >
              Back
            </button>
          ) : (
            <button
              className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded"
              onClick={() => navigate("/home")}
            >
              Back to Home
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReservations;
