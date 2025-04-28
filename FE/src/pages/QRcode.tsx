import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

const QRCodePage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    navigate("/home");
    return null;
  }

  const { timeFrom, timeTo, date, slot, demands } = state;
  const [qrValue, setQrValue] = useState("");

  useEffect(() => {
    const qrData = `Booking Details:\nTime: ${timeFrom} - ${timeTo}\nDate: ${date}\nSlot: ${slot}\nDemands: ${
      demands.length > 0 ? demands.join(", ") : "None"
    }`;
    setQrValue(qrData);
  }, [timeFrom, timeTo, date, slot, demands]);

  const handleSaveQR = () => {
    const svg = document.querySelector("#qrCode svg") as SVGElement;
    const serializer = new XMLSerializer();
    const svgBlob = new Blob([serializer.serializeToString(svg)], {
      type: "image/svg+xml",
    });
    const url = URL.createObjectURL(svgBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "reservation_qr.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=1740&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      {/* Logo */}
      <img
        src="/public/images/logohcmut.png"
        alt="Logo"
        className="absolute top-5 left-5 w-14 h-14 z-10 drop-shadow-lg"
      />

      {/* QR Card */}
      <div className="z-10 bg-white/10 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl border border-white/20 w-full max-w-md text-center space-y-6">
        <h2 className="text-3xl font-bold text-white drop-shadow">✅ Booking Confirmed</h2>
        <p className="text-white/90">Please scan this QR code when you check in</p>

        <div
          id="qrCode"
          className="bg-white p-4 rounded-xl shadow-lg inline-block"
        >
          <QRCode value={qrValue} size={180} />
        </div>

        <p className="text-sm text-red-300 italic">
          ⏰ If you check in more than 15 minutes late, your reservation will be cancelled.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col gap-4 mt-4">
          <button
            onClick={handleSaveQR}
            className="bg-white/20 border border-white px-6 py-3 rounded-xl text-white hover:bg-white/30 transition-all"
          >
            💾 Save QR Code
          </button>
          <button
            onClick={() => navigate("/home")}
            className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all"
          >
            🔙 Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodePage;
