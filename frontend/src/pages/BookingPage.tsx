import React, { useEffect, useState } from "react";
import axios from "axios";
import UserMenu from "../components/UserMenu";
import RoomCard, { Room } from "../components/RoomCard";
import RoomModal from "../components/RoomModal";
import { useNavigate } from "react-router-dom";

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);


  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get<Room[]>("http://localhost:5000/api/rooms");
        setRooms(res.data);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center px-4 pt-24 pb-20 text-white"
      style={{
        backgroundImage: "url('/images/background_hcmut.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/70 backdrop-blur-sm z-0" />

      {/* Logo */}
      <img
        src="/images/logohcmut.png"
        alt="HCMUT Logo"
        className="absolute top-5 left-5 w-14 h-14 z-10 drop-shadow-lg cursor-pointer"
        onClick={() => navigate('/home')}
        title="Go to Home"
      />

      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-10 z-10 drop-shadow-lg">
        📚 All Study Rooms
      </h1>

      {/* Room cards */}
      <div className="z-10 flex flex-wrap justify-center gap-6 max-w-6xl">
        {rooms
          .filter((room) => room.status === "available")
          .map((room) => (
            <RoomCard key={room.room_id} room={room} onClick={() => setSelectedRoom(room)} />
          ))}
      </div>

      {/* Modal */}
      <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />

      {/* User info & reservation panel */}
      <UserMenu/>
    </div>
  );
};

export default BookingPage;
