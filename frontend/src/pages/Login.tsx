import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { BACKEND_URL } from "../api/config";

interface JwtPayload {
  exp: number; 
}
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const now = Date.now() / 1000;
  
        if (decoded.exp && decoded.exp > now) {
          navigate("/home");
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");  // Nếu lỗi decode cũng quay lại login
      }
    }
  }, [navigate]);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${BACKEND_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password!");
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/home");
    } catch (err: any) {
      setError(err.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative text-white"
      style={{
        backgroundImage:
          "url('/images/background_hcmut.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      <img
        src="/images/logohcmut.png"
        alt="Logo"
        className="absolute top-5 left-5 w-14 h-14 z-10 drop-shadow-lg"
      />

      <div className="z-10 w-full max-w-md bg-white/10 backdrop-blur-2xl p-10 rounded-3xl shadow-xl border border-white/20 space-y-6">
        <h2 className="text-4xl font-bold text-center text-white drop-shadow">
          🔐 Sign In
        </h2>

        {error && (
          <p className="text-center text-red-400 font-semibold">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-blue-400 to-blue-600 py-3 rounded-xl text-lg font-bold hover:scale-105 transition-all duration-300 shadow-lg"
          >
            {loading ? "Checking..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-white/80 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-300 underline hover:text-white">
            Sign up
          </Link>
        </p>
      </div>

      <style>
        {`
        .glass-input {
          @apply px-5 py-3 text-base rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/70 transition-all duration-200;
        }
        `}
      </style>
    </div>
  );
};

export default Login;
