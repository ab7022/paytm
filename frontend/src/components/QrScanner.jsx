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
      style={{ width: '100%' }}
    />
  );
};

export default QRCodeScanner;
