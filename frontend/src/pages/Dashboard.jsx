import { useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";
import { useEffect, useState } from "react";
import QRCodeGenerator from "../components/QrCodeGenerator";


export default function Dashboard() {
  const [userData, setUserData] = useState({ user: null, account: null });
  const navigate = useNavigate();
 
  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios.get("https://paytm-backend-eta.vercel.app/dashboard", {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        navigate("/");
      }
    };

    checkToken();
  }, [navigate]);
   const handleQRCodeScan = () => {
    // Extract user data from the QR code (you may use a QR code scanning library)
    const scannedUserData = {
      id: userData.user._id,
      name: userData.user.firstName,
    };
    navigate(`/sendMoney?id=${scannedUserData.id}&name=${scannedUserData.name}`);
  };
  return (
<div>
      <Appbar name={userData.user} />
      <Balance account={userData.account} />
      <Users />
      {/* <div className="text-center mt-5">
         <QRCodeGenerator data={`{"id": "${userData.user?._id}", "name": "${userData.user?.firstName}"}`} />
        
         <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={handleQRCodeScan}
        >
          Simulate QR Code Scan
        </button> 
      </div> */}
      
    </div>
  );
}
