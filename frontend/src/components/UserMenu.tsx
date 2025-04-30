import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Reservation = {
  date: string;
  time: string;
  room: string;
};

type UserInfo = {
  name: string;
  email: string;
};

interface UserMenuProps {
  userInfo: UserInfo;
  reservations: Reservation[];
}

const UserMenu: React.FC<UserMenuProps> = ({ userInfo, reservations }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showReservation, setShowReservation] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
        setShowReservation(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="absolute top-5 right-5 z-20" ref={menuRef}>
      <div
        onClick={() => setShowMenu(!showMenu)}
        className="w-12 h-12 bg-white text-cyan-700 rounded-full flex items-center justify-center font-bold text-lg cursor-pointer shadow-lg hover:scale-105 transition"
      >
        {userInfo.name.charAt(0)}
      </div>

      {showMenu && (
        <div className="mt-2 right-0 w-72 bg-white text-gray-800 absolute rounded-xl shadow-xl p-4 space-y-4 z-50">
          <div>
            <p className="font-semibold text-lg">{userInfo.name}</p>
            <p className="text-sm text-gray-500">{userInfo.email}</p>
          </div>

          <button
            onClick={() => setShowReservation(!showReservation)}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {showReservation ? "Hide Reservations" : "My Reservations"}
          </button>

          {showReservation && (
            <div className="max-h-40 overflow-y-auto space-y-2 text-sm">
              {reservations.map((res, idx) => (
                <div key={idx} className="bg-gray-100 rounded-md p-2 shadow">
                  <p><strong>Date:</strong> {res.date}</p>
                  <p><strong>Time:</strong> {res.time}</p>
                  <p><strong>Room:</strong> {res.room}</p>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
