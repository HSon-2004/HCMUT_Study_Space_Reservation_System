import React from "react";

export interface Device {
  devices_name: string;
  devices_status: string;
}

export interface TimeSlot {
  time: string;
  status: string;
}

export interface Slot {
  date: string;
  time_slot: TimeSlot[];
}

export interface Room {
  _id: string;
  room_id: string;
  name: string;
  capacity: string;
  devices: Device[];
  status: string;
  slots: Slot[];
}

interface RoomCardProps {
  room: Room;
  onClick: (room: Room) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onClick }) => {
  return (
    <div
      className="cursor-pointer p-4 rounded-xl bg-white/10 hover:bg-white/20 transition text-white shadow-lg w-64"
      onClick={() => onClick(room)}
    >
      <h3 className="text-xl font-bold mb-2">{room.name}</h3>
      <p><strong>Capacity:</strong> {room.capacity}</p>
      <p><strong>Devices:</strong> {room.devices.map(d => d.devices_name).join(", ") || "None"}</p>
    </div>
  );
};

export default RoomCard;
