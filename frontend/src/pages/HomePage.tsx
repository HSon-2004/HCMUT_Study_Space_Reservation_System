import { useNavigate } from "react-router-dom";
import UserMenu from "../components/UserMenu";

const HomePage = () => {
  const navigate = useNavigate();

  // load user info from local storage


  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden text-white"
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
        className="absolute top-5 left-5 w-14 h-14 z-10 drop-shadow-lg"
      />

      {/* Main Content */}
      <div className="z-10 text-center space-y-10">
        <h1 className="text-5xl font-extrabold drop-shadow-xl tracking-wide">
          Smart Study Space @ HCMUT
        </h1>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <button
            onClick={() => navigate("/booking")}
            className="px-10 py-4 rounded-xl border border-white/40 bg-white/10 backdrop-blur-md text-white text-xl font-semibold shadow-lg hover:scale-105 hover:bg-white/20 hover:border-white transition-all duration-300"
          >
            📅 Book a Room
          </button>

          <button
            onClick={() => navigate("/myreservations")}
            className="px-10 py-4 rounded-xl border border-red-300 bg-red-500/20 backdrop-blur-md text-white text-xl font-semibold shadow-lg hover:scale-105 hover:bg-red-500/40 hover:border-white transition-all duration-300"
          >
            ❌ Cancel Booking
          </button>
        </div>
      </div>

      {/* User Menu */}
      <UserMenu />
    </div>
  );
};

export default HomePage;
