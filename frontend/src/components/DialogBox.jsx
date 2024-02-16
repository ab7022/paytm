import React, { useState } from "react";
import Button from "./Button";
import QRCodeGenerator from "./QrCodeGenerator";

export default function DialogBox({ onClose,name }) {
  const [showQRCode, setShowQRCode] = useState(false);
    
  const handleReceiveMoney = () => {
    setShowQRCode(true);
  };

  const handleCloseQRCode = () => {
    setShowQRCode(false);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Choose an Action</h2>
          <div className="flex flex-col space-y-4">
            <Button label="Pay Money" onClick={""} />
            <Button label="Receive Money" onClick={handleReceiveMoney} />
          </div>
        </div>
        {showQRCode ? (
          <div>
            <QRCodeGenerator
              data={`{"id": "${name._id}", "name": "${name.firstName}"}`}
              size={190}
            />{" "}
            <button
              className="border-2 border-red-600 rounded-lg px-3 py-2 text-red-600 cursor-pointer hover:bg-red-600 mx-16 hover:text-white "
              onClick={handleCloseQRCode}
            >
              Close QR Code
            </button>
          </div>
        ) : (
          <button
            className="border-2 border-red-600 rounded-lg px-3 py-2 mx-16 text-red-600 cursor-pointer hover:bg-red-600 hover:text-white"
            onClick={onClose}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}
