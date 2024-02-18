// QRCodeScanner.jsx
import React, { useState } from "react";
import QrScanner from "react-qr-scanner";

export const QRCodeScanner = ({ onScan }) => {
  const [qrCodeData, setQrCodeData] = useState(null);

  const handleScan = (data) => {
    if (data) {
      try {
        const parsedData = typeof data === 'object' ? data : JSON.parse(data);
        setQrCodeData(parsedData);
        onScan(parsedData);
      } catch (error) {
        console.error("Error parsing QR code data:", error);
      }
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <QrScanner
      onScan={handleScan}
      onError={handleError}
      constraints={{ video: true, facingMode: "environment" }}
      className="w-full max-h-64 border border-gray-300 rounded-xl shadow overflow-hidden"
    />
  );
};

export default QRCodeScanner;
