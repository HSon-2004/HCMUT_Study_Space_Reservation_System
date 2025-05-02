import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface UserMenuProps {
  reservations: Reservation[];
}

type Reservation = {
  date: string;
  time: string;
  room: string;
};

const UserMenu: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUsername(parsed.username || parsed.name || "U");
        setEmail(parsed.email || "");
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleGoToReservations = () => {
    navigate("/myreservations");
  };

  const checkAdmin = () => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser.role === "admin";
    }
    return false;
  }

  if (!username || !email) return null;

  return (
    <div className="absolute top-5 right-5 z-20" ref={menuRef}>
      {/* Avatar */}
      <div
        onClick={() => setShowMenu(!showMenu)}
        className="w-12 h-12 bg-white text-cyan-700 rounded-full flex items-center justify-center font-bold text-lg cursor-pointer shadow-lg hover:scale-105 transition"
      >
        {username.charAt(0).toUpperCase()}
      </div>

      {showMenu && (
        <div className="mt-2 right-0 w-72 bg-white text-gray-800 absolute rounded-xl shadow-xl p-4 space-y-4 z-50">
          {/* User Info */}
          <div>
            <p className="font-semibold text-lg">{username}</p>
            <p className="text-sm text-gray-500">{email}</p>
          </div>

          {/* My Reservations Page */}
          <button
            onClick={handleGoToReservations}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            My Reservations
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Log out
          </button>

          {/* Admin */}
          {checkAdmin() && (
            <button
              onClick={() => navigate("/admin")}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Admin Panel
            </button>
          )}
          
        </div>
      )}
    </div>
  );
};

export default UserMenu;
