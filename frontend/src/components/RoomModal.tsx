import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Room } from "./RoomCard";
import BACKEND_URL from "../api/config";

interface RoomModalProps {
  room: Room | null;
  onClose: () => void;
}

interface SelectedSlot {
  date: string;
  time: string;
}

interface Booking {
  checkin: string;
  book_slot: string;
}

const RoomModal: React.FC<RoomModalProps> = ({ room, onClose }) => {
  const [selectedSlots, setSelectedSlots] = useState<SelectedSlot[]>([]);
  const [bookedSlots, setBookedSlots] = useState<SelectedSlot[]>([]);
  const navigate = useNavigate();


  useEffect(() => {
    if (!room?.room_id) {
      return;
    }
    const fetchBookings = async () => {
      try {
        const res = await axios.get<Booking[]>(`${BACKEND_URL}/api/bookings/room/${room.room_id}`);
        const newBooked: SelectedSlot[] = [];

        res.data.forEach((booking) => {
          const date = new Date(booking.checkin).toISOString().split("T")[0];
          const times = booking.book_slot
            .split(",")
            .map((t) => t.trim().padStart(5, "0")); // Chuẩn hóa giờ HH:mm
          times.forEach((time) => {
            newBooked.push({ date, time });
          });
        });

        setBookedSlots(newBooked);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [room]);

  if (!room) return null;

  const toggleSlot = (date: string, time: string) => {
    const alreadySelected = selectedSlots.find(
      (slot) => slot.date === date && slot.time === time
    );

    if (alreadySelected) {
      setSelectedSlots((prev) =>
        prev.filter((slot) => !(slot.date === date && slot.time === time))
      );
    } else {
      setSelectedSlots((prev) => [...prev, { date, time }]);
    }
  };

  const handleConfirm = () => {
    if (selectedSlots.length === 0) return;

    const padTime = (t: string) => t.padStart(5, "0");

    const sorted = [...selectedSlots].sort((a, b) =>
      `${a.date}T${padTime(a.time)}`.localeCompare(`${b.date}T${padTime(b.time)}`)
    );

    navigate("/confirm", {
      state: {
        room_id: room.room_id,
        checkin: `${sorted[0].date}T${padTime(sorted[0].time)}:00`,
        checkout: `${sorted[sorted.length - 1].date}T${padTime(sorted[sorted.length - 1].time)}:00`,
        roomName: room.name,
        slots: sorted.map((s) => ({ date: s.date, time: padTime(s.time) })),
      },
    });
  };

  const isSlotBooked = (date: string, time: string) =>
    bookedSlots.some((s) => s.date === date && s.time === time);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="relative bg-white text-black p-6 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl font-bold text-gray-500 hover:text-black"
        >
          ✖
        </button>

        <h2 className="text-3xl font-bold mb-4">{room.name}</h2>
        <p className="mb-1">
          <strong>Capacity:</strong> {room.capacity}
        </p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">📟 Devices:</h3>
          <ul className="list-disc list-inside">
            {room.devices.map((device, idx) => (
              <li key={idx}>{device.devices_name} - {device.count ? device.count : '0'}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">🕒 Booking Slots:</h3>
          {room.slots.map((slot, idx) => (
            <div key={idx} className="mb-4">
              <p className="font-medium">📅 Date: {slot.date}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {slot.time_slot.map((ts, tsIdx) => {
                  const paddedTime = ts.time.padStart(5, "0");

                  const isSelected = selectedSlots.some(
                    (s) => s.date === slot.date && s.time === paddedTime
                  );

                  const now = new Date();
                  const slotDateTime = new Date(`${slot.date}T${paddedTime}:00`);
                  const isPast = slotDateTime < now;
                  const isBooked = isSlotBooked(slot.date, paddedTime);

                  return (
                    <button
                      key={tsIdx}
                      disabled={isBooked || isPast}
                      onClick={() =>
                        !isPast && !isBooked && toggleSlot(slot.date, paddedTime)
                      }
                      className={`px-3 py-1 rounded-md text-sm border transition-all duration-200
                        ${
                          isBooked
                            ? "bg-black text-white cursor-not-allowed"
                            : isPast
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : isSelected
                            ? "bg-blue-500 text-white border-blue-600 scale-105"
                            : "bg-green-100 text-green-800 hover:bg-green-200"
                        }`}
                    >
                      {ts.time}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {selectedSlots.length > 0 && (
          <div className="flex justify-end mt-6">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
              onClick={handleConfirm}
            >
              Confirm ({selectedSlots.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomModal;
