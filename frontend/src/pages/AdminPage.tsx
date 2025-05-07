import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserMenu from "../components/UserMenu";
import { BACKEND_URL } from "../api/config";

interface Room {
  room_id: string;
  name: string;
  capacity: string;
  devices: { devices_name: string; count: string }[];
  status: string;
  slots: { date: string; time_slot: { time: string; status: string }[] }[];
}

interface User {
  user_id: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

interface Booking {
  book_id: string;
  user_id: string;
  room_id: string;
  user_name: string;
  room_name: string;
  checkin: string;
  checkout: string;
  status: string;
  book_slot: string;
  created_at: string;
  updated_at: string;
}

const AdminPage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [view, setView] = useState<"rooms" | "users" | "bookings" | "editRoom" | "addRoom" | "addUser" | "editUser">("rooms");
  const [newRoom, setNewRoom] = useState({
    name: "",
    capacity: "",
    status: "",
    devices: [{ devices_name: "", count: "" }],
  });
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [message, setMessage] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState<{roomId: string, roomName: string} | null>(null);
  const [deleteUserConfirmation, setDeleteUserConfirmation] = useState<{userId: string, username: string} | null>(null);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: ""
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteBookingConfirmation, setDeleteBookingConfirmation] = useState<{bookId: string, roomName: string, userName: string} | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (view === "rooms") fetchRooms();
    if (view === "users") fetchUsers();
    if (view === "bookings") fetchBookings();
  }, [view]);

  const fetchRooms = async () => {
    try {
      const res = await axios.get<Room[]>(`${BACKEND_URL}/api/rooms`);
      if (res.status === 401) {
        localStorage.clear();
        navigate("/login");
        return;
      }
      setRooms(res.data);
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get<User[]>(`${BACKEND_URL}/api/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.status === 401) {
        localStorage.clear();
        navigate("/login");
        return;
      }
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get<Booking[]>(`${BACKEND_URL}/api/bookings/all`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.status === 401) {
        localStorage.clear();
        navigate("/login");
        return;
      }
      setBookings(res.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  const handleAddRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Adding new room:", newRoom);
      const res = await axios.post(`${BACKEND_URL}/api/rooms/create`, newRoom, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.status === 401) {
        localStorage.clear();
        navigate("/login");
        return;
      }
      if (res.status === 201) {
        setNewRoom({
          name: "",
          capacity: "",
          status: "",
          devices: [{ devices_name: "", count: "" }],
        });
        setMessage("Room added successfully!");
        setView("rooms");
      } else {
        setMessage("Failed to add room. Please try again.");
      }
    } catch (error) {
      setMessage("Error adding room. Please check your input.");
    }
  };

  const handleDeviceChange = (idx: number, field: string, value: string) => {
    setNewRoom((prevRoom) => {
      const updatedDevices = [...prevRoom.devices];
      updatedDevices[idx] = { ...updatedDevices[idx], [field]: value };
      return { ...prevRoom, devices: updatedDevices };
    });
  };

  const removeDevice = (idx: number) => {
    setNewRoom((prevRoom) => {
      const updatedDevices = prevRoom.devices.filter((_, index) => index !== idx);
      return { ...prevRoom, devices: updatedDevices };
    });
  };

  const addDevice = () => {
    setNewRoom((prevRoom) => ({
      ...prevRoom,
      devices: [...prevRoom.devices, { devices_name: "", count: "" }],
    }));
  };

  const startEditRoom = (room: Room) => {
    setEditingRoom(room);
    setView("editRoom");
  };

  const handleEditRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRoom) return;
    
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/rooms/${editingRoom.room_id}/update`, 
        editingRoom,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      
      if (res.status === 401) {
        localStorage.clear();
        navigate("/login");
        return;
      }
      
      if (res.status === 200) {
        setMessage("Room updated successfully!");
        setEditingRoom(null);
        setView("rooms");
        fetchRooms(); // Refresh the rooms list
      } else {
        setMessage("Failed to update room. Please try again.");
      }
    } catch (error) {
      setMessage("Error updating room. Please check your input.");
      console.error("Error updating room:", error);
    }
  };

  const handleEditRoomChange = (field: string, value: string) => {
    if (!editingRoom) return;
    setEditingRoom({
      ...editingRoom,
      [field]: value
    });
  };

  const handleEditDeviceChange = (idx: number, field: string, value: string) => {
    if (!editingRoom) return;
    const updatedDevices = [...editingRoom.devices];
    updatedDevices[idx] = { ...updatedDevices[idx], [field]: value };
    setEditingRoom({
      ...editingRoom,
      devices: updatedDevices
    });
  };

  const addDeviceToEditRoom = () => {
    if (!editingRoom) return;
    setEditingRoom({
      ...editingRoom,
      devices: [...editingRoom.devices, { devices_name: "", count: "" }]
    });
  };

  const removeDeviceFromEditRoom = (idx: number) => {
    if (!editingRoom) return;
    const updatedDevices = editingRoom.devices.filter((_, index) => index !== idx);
    setEditingRoom({
      ...editingRoom,
      devices: updatedDevices
    });
  };

  const confirmDeleteRoom = (roomId: string, roomName: string) => {
    setDeleteConfirmation({ roomId, roomName });
  };

  const cancelDelete = () => {
    setDeleteConfirmation(null);
  };

  const deleteRoom = async () => {
    if (!deleteConfirmation) return;
    
    try {
      const res = await axios.delete(
        `${BACKEND_URL}/api/rooms/${deleteConfirmation.roomId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      
      if (res.status === 401) {
        localStorage.clear();
        navigate("/login");
        return;
      }
      
      if (res.status === 200) {
        setMessage("Room deleted successfully!");
        // Remove the deleted room from the rooms state
        setRooms(rooms.filter(room => room.room_id !== deleteConfirmation.roomId));
        setDeleteConfirmation(null);
      } else {
        setMessage("Failed to delete room. Please try again.");
      }
    } catch (error) {
      setMessage("Error deleting room. The room might be in use.");
      console.error("Error deleting room:", error);
    }
  };

  // User management functions
  const startEditUser = (user: User) => {
    setEditingUser(user);
    setView("editUser");
  };

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/users/${editingUser.user_id}/update`, 
        editingUser,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      
      if (res.status === 401) {
        localStorage.clear();
        navigate("/login");
        return;
      }
      
      if (res.status === 200) {
        setMessage("User updated successfully!");
        setEditingUser(null);
        setView("users");
        fetchUsers(); // Refresh the users list
      } else {
        setMessage("Failed to update user. Please try again.");
      }
    } catch (error) {
      setMessage("Error updating user. Please check your input.");
      console.error("Error updating user:", error);
    }
  };

  const handleEditUserChange = (field: string, value: string) => {
    if (!editingUser) return;
    setEditingUser({
      ...editingUser,
      [field]: value
    });
  };

  const confirmDeleteUser = (userId: string, username: string) => {
    setDeleteUserConfirmation({ userId, username });
  };

  const cancelDeleteUser = () => {
    setDeleteUserConfirmation(null);
  };

  const deleteUser = async () => {
    if (!deleteUserConfirmation) return;
    
    try {
      const res = await axios.delete(
        `${BACKEND_URL}/api/users/${deleteUserConfirmation.userId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      
      if (res.status === 401) {
        localStorage.clear();
        navigate("/login");
        return;
      }
      
      if (res.status === 200) {
        setMessage("User deleted successfully!");
        // Remove the deleted user from the users state
        setUsers(users.filter(user => user.user_id !== deleteUserConfirmation.userId));
        setDeleteUserConfirmation(null);
      } else {
        setMessage("Failed to delete user. Please try again.");
      }
    } catch (error) {
      setMessage("Error deleting user. The user might have associated data.");
      console.error("Error deleting user:", error);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_URL}/api/users/create`, newUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      
      if (res.status === 401) {
        localStorage.clear();
        navigate("/login");
        return;
      }
      
      if (res.status === 201) {
        setNewUser({
          username: "",
          email: "",
          password: "",
          role: ""
        });
        setMessage("User added successfully!");
        setView("users");
        fetchUsers();
      } else {
        setMessage("Failed to add user. Please try again.");
      }
    } catch (error) {
      setMessage("Error adding user. The email might already be in use.");
      console.error("Error adding user:", error);
    }
  };


  const confirmDeleteBooking = (bookId: string, roomName: string, userName: string) => {
    setDeleteBookingConfirmation({ bookId, roomName, userName });
  };

  const cancelDeleteBooking = () => {
    setDeleteBookingConfirmation(null);
  };

  const deleteBooking = async () => {
    if (!deleteBookingConfirmation) return;
    
    try {
      const res = await axios.delete(
        `${BACKEND_URL}/api/bookings/${deleteBookingConfirmation.bookId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      
      if (res.status === 401) {
        localStorage.clear();
        navigate("/login");
        return;
      }
      
      if (res.status === 200) {
        setMessage("Booking deleted successfully!");
        // Remove the deleted booking from the bookings state
        setBookings(bookings.filter(booking => booking.book_id !== deleteBookingConfirmation.bookId));
        setDeleteBookingConfirmation(null);
      } else {
        setMessage("Failed to delete booking. Please try again.");
      }
    } catch (error) {
      setMessage("Error deleting booking.");
      console.error("Error deleting booking:", error);
    }
  };

  return (
    
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">🔐 Admin Dashboard</h1>

      <div className="flex gap-4 mb-6">
        <button onClick={() => setView("rooms")} className="btn">View Rooms</button>
        <button onClick={() => setView("users")} className="btn">View Users</button>
        <button onClick={() => setView("bookings")} className="btn">View Bookings</button>
        <button onClick={() => navigate('/home')} className="btn">Home</button>
      </div>

      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete room "{deleteConfirmation.roomName}"? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button 
                onClick={deleteRoom}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteUserConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm User Deletion</h3>
            <p className="mb-6">Are you sure you want to delete user "{deleteUserConfirmation.username}"? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={cancelDeleteUser}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button 
                onClick={deleteUser}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteBookingConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Booking Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete the booking for room "{deleteBookingConfirmation.roomName}" 
              by user "{deleteBookingConfirmation.userName}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={cancelDeleteBooking}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button 
                onClick={deleteBooking}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {view === "rooms" && (
        <div>
          <button onClick={() => setView("addRoom")} className="btn mb-4">➕ Add New Room</button>
          <h2 className="text-xl font-semibold mb-4">📋 Room List</h2>
          <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Room Name</th>
                <th className="px-4 py-2 text-left">Room Id</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Capacity</th>
                <th className="px-4 py-2 text-left">Devices</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.room_id} className="border-t">
                  <td className="px-4 py-2">{room.name}</td>
                  <td className="px-4 py-2">{room.room_id}</td>
                  <td className="px-4 py-2">{room.status}</td>
                  <td className="px-4 py-2">{room.capacity}</td>
                  <td className="px-4 py-2">{room.devices.map(d => `${d.devices_name} (${d.count})`).join(", ")}</td>
                  <td className="px-4 py-2">
                    <button 
                      className="text-blue-500 hover:underline"
                      onClick={() => startEditRoom(room)}
                    >Edit</button>
                    <button 
                      className="text-red-500 hover:underline ml-4"
                      onClick={() => confirmDeleteRoom(room.room_id, room.name)}
                    >Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === "addRoom" && (
        <form onSubmit={handleAddRoom} className="bg-white p-6 rounded-lg shadow-md text-black w-full max-w-2xl mx-auto">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={newRoom.name}
              onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Capacity</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={newRoom.capacity}
              onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Status</label>
            <select
              className="w-full p-2 border rounded"
              value={newRoom.status}
              onChange={(e) => setNewRoom({ ...newRoom, status: e.target.value })}
              required
            >
              <option value="">-- Select Status --</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Devices</label>
            {newRoom.devices.map((device, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Device Name"
                  className="flex-1 p-2 border rounded"
                  value={device.devices_name}
                  onChange={(e) => handleDeviceChange(idx, "devices_name", e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Count"
                  className="w-20 p-2 border rounded"
                  value={device.count}
                  onChange={(e) => handleDeviceChange(idx, "count", e.target.value)}
                  required
                />
                <button type="button" onClick={() => removeDevice(idx)} className="text-red-500 font-bold">✖</button>
              </div>
            ))}
            <button type="button" onClick={addDevice} className="mt-2 px-3 py-1 bg-blue-600 text-white rounded">
              ➕ Add Device
            </button>
          </div>
            <div className="flex gap-3 mt-4">
            <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Create Room
            </button>
            <button 
              type="button" 
              onClick={() => setView("rooms")} 
              className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {view === "editRoom" && editingRoom && (
        <form onSubmit={handleEditRoom} className="bg-white p-6 rounded-lg shadow-md text-black w-full max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Edit Room: {editingRoom.name}</h2>
          
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={editingRoom.name}
              onChange={(e) => handleEditRoomChange("name", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Capacity</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={editingRoom.capacity}
              onChange={(e) => handleEditRoomChange("capacity", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Status</label>
            <select
              className="w-full p-2 border rounded"
              value={editingRoom.status}
              onChange={(e) => handleEditRoomChange("status", e.target.value)}
              required
            >
              <option value="">-- Select Status --</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Devices</label>
            {editingRoom.devices.map((device, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Device Name"
                  className="flex-1 p-2 border rounded"
                  value={device.devices_name}
                  onChange={(e) => handleEditDeviceChange(idx, "devices_name", e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Count"
                  className="w-20 p-2 border rounded"
                  value={device.count}
                  onChange={(e) => handleEditDeviceChange(idx, "count", e.target.value)}
                  required
                />
                <button type="button" onClick={() => removeDeviceFromEditRoom(idx)} className="text-red-500 font-bold">✖</button>
              </div>
            ))}
            <button type="button" onClick={addDeviceToEditRoom} className="mt-2 px-3 py-1 bg-blue-600 text-white rounded">
              ➕ Add Device
            </button>
          </div>

          <div className="flex gap-3 mt-4">
            <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Update Room
            </button>
            <button 
              type="button" 
              onClick={() => setView("rooms")} 
              className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {view === "users" && (
        <div>
          <button onClick={() => setView("addUser")} className="btn mb-4">➕ Add New User</button>
          <h2 className="text-xl font-semibold mb-4">👥 User List</h2>
          <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Username</th>
                <th className="px-4 py-2 text-left">User ID</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_id} className="border-t">
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.user_id}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">
                    <button 
                      className="text-blue-500 hover:underline"
                      onClick={() => startEditUser(user)}
                    >Edit</button>
                    <button 
                      className="text-red-500 hover:underline ml-4"
                      onClick={() => confirmDeleteUser(user.user_id, user.username)}
                    >Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === "addUser" && (
        <form onSubmit={handleAddUser} className="bg-white p-6 rounded-lg shadow-md text-black w-full max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Add New User</h2>
          
          <div>
            <label className="block font-medium">Username</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Role</label>
            <select
              className="w-full p-2 border rounded"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              required
            >
              <option value="">-- Select Role --</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex gap-3 mt-4">
            <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Create User
            </button>
            <button 
              type="button" 
              onClick={() => setView("users")} 
              className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {view === "editUser" && editingUser && (
        <form onSubmit={handleEditUser} className="bg-white p-6 rounded-lg shadow-md text-black w-full max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Edit User: {editingUser.username}</h2>
          
          <div>
            <label className="block font-medium">Username</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={editingUser.username}
              onChange={(e) => handleEditUserChange("username", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={editingUser.email}
              onChange={(e) => handleEditUserChange("email", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium">New Password (leave blank to keep current)</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={editingUser.password}
              onChange={(e) => handleEditUserChange("password", e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium">Role</label>
            <select
              className="w-full p-2 border rounded"
              value={editingUser.role}
              onChange={(e) => handleEditUserChange("role", e.target.value)}
              required
            >
              <option value="">-- Select Role --</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex gap-3 mt-4">
            <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Update User
            </button>
            <button 
              type="button" 
              onClick={() => setView("users")} 
              className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {view === "bookings" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">📅 Booking List</h2>
          <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Booking ID</th>
                <th className="px-4 py-2 text-left">User Name</th>
                <th className="px-4 py-2 text-left">Room Name</th>
                <th className="px-4 py-2 text-left">Check-in</th>
                <th className="px-4 py-2 text-left">Check-out</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.book_id} className="border-t">
                  <td className="px-4 py-2">{booking.book_id}</td>
                  <td className="px-4 py-2">{booking.user_name}</td>
                  <td className="px-4 py-2">{booking.room_name}</td>
                  <td className="px-4 py-2">{new Date(booking.checkin).toLocaleString()}</td>
                  <td className="px-4 py-2">{new Date(booking.checkout).toLocaleString()}</td>
                  <td className="px-4 py-2">{booking.status}</td>
                  <td className="px-4 py-2">
                    <button 
                      className="text-red-500 hover:underline ml-4"
                      onClick={() => confirmDeleteBooking(booking.book_id, booking.room_name, booking.user_name)}
                    >Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


      {message && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded shadow-lg">
          {message}
          <button 
            onClick={() => setMessage('')}
            className="ml-3 text-white font-bold"
          >
            ✕
          </button>
        </div>
      )}

      <div className="absolute top-4 right-4">
        <UserMenu />
      </div>
    </div>
  );
};

export default AdminPage;
