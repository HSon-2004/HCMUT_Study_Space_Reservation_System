import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const ConfirmPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  if (!state) {
    navigate("/booking");
    return null;
  }

  const { timeFrom, timeTo, date, slot, demands } = state;

  const handleFinalConfirm = () => {
    console.log("Booking Confirmed:", state);
    navigate("/qr-code", { state });
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=1740&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      {/* Logo */}
      <img
        src="/public/images/logohcmut.png"
        alt="Logo"
        className="absolute top-5 left-5 w-14 h-14 z-10 drop-shadow-lg"
      />

      {/* Card xác nhận */}
      <div className="z-10 w-full max-w-3xl bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20">
        <h2 className="text-3xl font-bold text-center mb-6 text-white drop-shadow">
          📋 Booking Summary
        </h2>

        <div className="bg-white/20 p-6 rounded-xl border border-white/30 shadow-lg space-y-4">
          <p>
            <strong>🕒 Time:</strong> {timeFrom} - {timeTo}
          </p>
          <p>
            <strong>📅 Date:</strong> {date}
          </p>
          <p>
            <strong>📌 Slot:</strong> {slot}
          </p>
          <p>
            <strong>🛠️ Demands:</strong>{" "}
            {demands.length > 0 ? demands.join(", ") : "None"}
          </p>
        </div>

        {/* Nút confirm */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowConfirmDialog(true)}
            className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black text-lg px-8 py-3 rounded-xl font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all"
            style={{
              boxShadow: "0 8px 20px rgba(255, 230, 0, 0.3)",
            }}
          >
            ✅ Confirm Reservation
          </button>
        </div>
      </div>

      {/* Hộp thoại xác nhận */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-20 bg-black/60 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center text-gray-900">
            <h2 className="text-xl font-bold mb-4">Confirm?</h2>
            <p className="mb-6">Do you want to finalize your reservation?</p>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                ❌ No
              </button>
              <button
                onClick={handleFinalConfirm}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                ✅ Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmPage;
