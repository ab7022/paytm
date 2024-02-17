// QRCodeScanner.jsx
import React, { useEffect, useState } from "react";
import QrScanner from "react-qr-scanner";
export const QRCodeScanner = ({ onScan }) => {
  const [qrCodeData, setQrCodeData] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setQrCodeData(data);
      onScan(data);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      console.log(devices);
    });
  }, []);
  return (
    <QrScanner
      onScan={handleScan}
      onError={handleError}
      constraints={{ video: { facingMode: "environment" } }}
      className="w-full max-h-64 border border-gray-300 rounded-xl shadow overflow-hidden"
    />
  );
};

export default QRCodeScanner;
