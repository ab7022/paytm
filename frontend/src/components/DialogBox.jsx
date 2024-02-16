import React, { useState } from 'react';
import Button from './Button';
import QRCodeGenerator from './QrCodeGenerator';
import QRCodeScanner from './QrScanner';
import { useNavigate } from 'react-router-dom';

export default function DialogBox({ onClose, name }) {
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      setQrCodeData(data);
      // Your logic for handling the scanned data, e.g., initiate payment
      handlePayMoney(data);
    }
  };

  const handlePayMoney = (scannedData) => {
    try {
      // Parse the scanned data as JSON
      const userData = JSON.parse(scannedData.text);

      // Check if the required fields are present in the parsed data
      if (userData.id && userData.name) {
        // Redirect to the appropriate page with user data
        navigate(`/sendMoney?id=${userData.id}&name=${userData.name}`);
      } else {
        console.log("Invalid QR code data structure");
        // Handle the case where the structure of the QR code data is invalid
        // You might want to display an error message or handle it in another way
      }
    } catch (error) {
      console.error("Error parsing QR code data as JSON", error);
      // Handle the case where the scanned data is not a valid JSON
      // You might want to display an error message or handle it in another way
    }
  };

  const handleReceiveMoney = () => {
    setShowQRCode(true);
  };

  const handleCloseQRCode = () => {
    setShowQRCode(false);
  };

  const handlePayMoneyButtonClick = () => {
    // Set state to show the camera
    setShowCamera(true);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Choose an Action</h2>
          <div className="flex flex-col space-y-4">
            <Button label="Pay Money" onClick={handlePayMoneyButtonClick} />
            <Button label="Receive Money" onClick={handleReceiveMoney} />
          </div>
        </div>
        {showCamera && (
          <QRCodeScanner onScan={handleScan} />
        )}
        {showQRCode ? (
          <div>
            <QRCodeGenerator
              data={{ id: name._id, name: name.firstName }}
              size={170}
            />
<button
  className="border-2 border-red-600 rounded-lg px-3 py-2 text-red-600 cursor-pointer hover:bg-red-600  hover:text-white mx-10"
  onClick={handleCloseQRCode}
>
  Close QR Code
</button>

          </div>
        ) : (
          <button
            className="border-2 border-red-600 rounded-lg px-3 py-2 mt-4 justify-center mx-28 text-red-600 cursor-pointer hover:bg-red-600 hover:text-white"
            onClick={onClose}
          >
            Close
          </button>
        )}
        {qrCodeData && <p>Scanned Data: {JSON.stringify(qrCodeData)}</p>}
      </div>
    </div>
  );
}
