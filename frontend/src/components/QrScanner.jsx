// QRCodeScanner.jsx
import React, { useState } from 'react';
import QrScanner from "react-qr-scanner";

export const QRCodeScanner = ({ onScan }) => {
  const [qrCodeData, setQrCodeData] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setQrCodeData(data);
      onScan(data); // Pass the scanned data to the parent component
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <QrScanner
  onScan={handleScan}
  onError={handleError}
  className="w-full max-h-64 border border-gray-300 rounded-xl shadow overflow-hidden"
/>
  )
};

export default QRCodeScanner;
