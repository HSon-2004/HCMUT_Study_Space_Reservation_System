import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative text-white text-center overflow-hidden"
      style={{
        backgroundImage:
          "url('/images/background_hcmut.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay + animation gradient */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>

      {/* Logo */}
      <img
        src="/images/logohcmut.png"
        alt="Logo"
        className="absolute top-5 left-5 w-14 h-14 z-10 drop-shadow-lg"
      />

      {/* Main Content */}
      <div className="z-10 space-y-12 px-4">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-xl tracking-wide leading-snug animate-fade-in">
          Welcome to <br />
          Smart Study Space Reservation System
        </h1>

        {/* Action buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-slide-up">
          <button
            onClick={() => navigate("/login")}
            className="px-10 py-4 text-xl font-semibold border border-white/40 rounded-2xl bg-white/10 backdrop-blur-md hover:bg-white/20 hover:scale-105 transition-all shadow-lg glow-button"
          >
            🔐 Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-10 py-4 text-xl font-semibold border border-white/40 rounded-2xl bg-white/10 backdrop-blur-md hover:bg-white/20 hover:scale-105 transition-all shadow-lg glow-button"
          >
            📝 Register
          </button>
        </div>
      </div>

      {/* Animation & custom style */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideUp {
            from { transform: translateY(40px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-fade-in {
            animation: fadeIn 1s ease-out forwards;
          }
          .animate-slide-up {
            animation: slideUp 1.2s ease-out forwards;
          }
          .glow-button {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.15);
          }
          .glow-button:hover {
            box-shadow: 0 0 35px rgba(255, 255, 255, 0.25);
          }
        `}
      </style>
    </div>
  );
};

export default Welcome;
