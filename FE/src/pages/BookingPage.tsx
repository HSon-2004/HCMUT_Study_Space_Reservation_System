import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";

const BookingPage = () => {
  const navigate = useNavigate();
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [demands, setDemands] = useState<string[]>([]);

  const handleDemandChange = (demand: string) => {
    setDemands((prev) =>
      prev.includes(demand)
        ? prev.filter((d) => d !== demand)
        : [...prev, demand]
    );
  };

  const handleConfirmClick = () => {
    navigate("/confirm", {
      state: { timeFrom, timeTo, date, slot, demands },
    });
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

      <div className="z-10 w-full max-w-4xl bg-white/10 backdrop-blur-2xl p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/30 transition-all duration-300">
        <h2 className="text-4xl font-bold text-center mb-10 text-white drop-shadow">
          📚 Book Your Smart Study Slot
        </h2>

        <div className="space-y-8">
          {/* TIME & DATE */}
          <div>
            <p className="text-white font-semibold mb-2">Choose time</p>
            <div className="flex flex-wrap gap-4">
              <input
                type="time"
                value={timeFrom}
                onChange={(e) => setTimeFrom(e.target.value)}
                className="glass-input"
              />
              <input
                type="time"
                value={timeTo}
                onChange={(e) => setTimeTo(e.target.value)}
                className="glass-input"
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="glass-input"
              />
              <FaCalendarAlt className="text-white text-xl self-center" />
            </div>
          </div>

          {/* SLOT */}
          <div>
            <p className="text-white font-semibold mb-2">Slot Number</p>
            <input
              type="text"
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
              placeholder="e.g. A101"
              className="glass-input w-full"
            />
          </div>

          {/* DEMAND CHECKBOX */}
          <div>
            <p className="text-white font-semibold mb-2">Extra Facilities</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["Fan", "Socket", "Television", "Whiteboards", "Air-conditioner"].map((item) => (
                <label
                  key={item}
                  className="flex items-center space-x-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/30 transition-all cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={demands.includes(item)}
                    onChange={() => handleDemandChange(item)}
                    className="accent-blue-500 scale-125"
                  />
                  <span className="text-white">{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* CONFIRM BUTTON */}
          <button
            onClick={handleConfirmClick}
            className="w-full mt-8 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white text-lg py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl"
            style={{
              boxShadow: "0 8px 30px rgba(0, 191, 255, 0.3)",
            }}
          >
            ✅ Confirm Booking
          </button>
        </div>
      </div>

      {/* CUSTOM TAILWIND OVERRIDE CLASSES */}
      <style>
        {`
        .glass-input {
          @apply px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/50 transition-all;
        }
        `}
      </style>
    </div>
  );
};

export default BookingPage;
