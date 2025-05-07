import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../api/config";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
          role: "student", 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed!");
      }
      setMessage("Registration successful! Please log in.");
      // Add delay before navigation to show the success message
      setTimeout(() => {
        navigate("/login");
      }, 2000); // 2 second delay
    } catch (err: any) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative text-white"
      style={{
        backgroundImage:
          "url('images/background_hcmut.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      <img
        src="/images/logohcmut.png"
        alt="Logo"
        className="absolute top-5 left-5 w-14 h-14 z-10 drop-shadow-lg cursor-pointer"
        onClick={() => navigate('/home')}
        title="Go to Home"
      />

      <div className="z-10 w-full max-w-md bg-white/10 backdrop-blur-2xl p-10 rounded-3xl shadow-xl border border-white/20 space-y-6">
        <h2 className="text-4xl font-bold text-center text-white drop-shadow">
          📝 Create Account
        </h2>
        {error && (
          <p className="text-center text-red-400 font-semibold">{error}</p>
        )}
        {message && (
          <p className="text-center text-green-400 font-semibold">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-white/80 text-sm">Username</label>
            <input
              type="text"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              className="glass-input text-black/80 w-full"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block mb-1 text-white/80 text-sm">Email</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="glass-input text-black/80 w-full"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block mb-1 text-white/80 text-sm">Password</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input text-black/80 w-full"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label className="block mb-1 text-white/80 text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`glass-input text-black/80 w-full ${
                confirmPassword && password !== confirmPassword
                  ? "border-red-400 focus:ring-red-400"
                  : ""
              }`}
              placeholder="Re-enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-green-400 to-green-600 py-3 rounded-xl text-lg font-bold hover:scale-105 transition-all duration-300 shadow-lg"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-white/80 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-300 underline hover:text-white">
            Sign in
          </Link>
        </p>
      </div>

      <style>
        {`
        .glass-input {
          @apply px-5 py-3 text-base rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/70 transition-all duration-200;
        }
        `}
      </style>
    </div>
  );
};

export default Register;
