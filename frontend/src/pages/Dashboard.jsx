import { useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [userData, setUserData] = useState({ user: null, account: null });
  const [accountBalance, setAccountBalance] = useState(null); 

  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios.get(
          "https://paytm-backend-eta.vercel.app/dashboard",
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );

        setUserData(response.data);
        setAccountBalance(response.data.account ? response.data.account.amount : null);

      } catch (error) {
        navigate("/");
      }
    };

    checkToken();
  }, [navigate,userData]);
  const handleQRCodeScan = () => {
    const scannedUserData = {
      id: userData.user._id,
      name: userData.user.firstName,
    };
    navigate(
      `/sendMoney?id=${scannedUserData.id}&name=${scannedUserData.name}`
    );
  };
  return (
    <div>
      <Appbar name={userData.user} />
      <Balance account={accountBalance} />
      <Users />
    </div>
  );
}
