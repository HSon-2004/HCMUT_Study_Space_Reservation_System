import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import UserMenu from "../components/UserMenu";
import { FRONTEND_URL } from "../api/config";

const QRPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.roomName) {
    return <div className="text-center mt-10 text-red-500">No booking info.</div>;
  }

  const encodedRoomName = encodeURIComponent(state.roomName);
  //const localIP = import.meta.env.VITE_LOCAL_IP;
  const bookingData = {
    URL: `${FRONTEND_URL}/checkin?book_id=${state.book_id}&room_name=${encodedRoomName}&checkin=${state.checkin}&checkout=${state.checkout}`,
  };
  

  const qrCodeValue = JSON.stringify(bookingData); // Dữ liệu sẽ được mã hóa thành mã QR

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage: "url('/images/background_hcmut.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      {/* Logo */}
      <img
        src="/images/logohcmut.png"
        alt="Logo"
        className="absolute top-5 left-5 w-14 h-14 z-10 drop-shadow-lg cursor-pointer"
        onClick={() => navigate('/home')}
        title="Go to Home"
      />

      {/* QR Code Content */}
      <div className="relative z-10 bg-white text-black p-8 rounded-xl shadow-xl w-full max-w-lg text-center mt-20 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Your QR Code</h1>
        <p className="mb-4">Scan this QR Code to check-in</p>

        {/* Hiển thị QR Code và căn giữa */}
        <div className="flex justify-center items-center">
          <QRCode value={qrCodeValue} size={256} />
        </div>
        
        <p className="mb-4">
          Check-in link:{" "}
          <a
            href={`${FRONTEND_URL}/checkin?book_id=${state.book_id}&room_name=${encodedRoomName}&checkin=${state.checkin}&checkout=${state.checkout}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            here
          </a>
        </p>


        <div className="mt-6">
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded mb-4"
            onClick={() => alert("QR Code saved!")}
          >
            Save QR Code
          </button>
          <br />
          <button
            className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded"
            onClick={() => navigate("/home")}
          >
            Back to Home
          </button>
        </div>
      </div>
      <UserMenu/>
    </div>
  );
};

export default QRPage;
