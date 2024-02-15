import { useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";
import { useEffect, useState } from "react";

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

  return (
    <div>
      <Appbar name={userData.user} />
      <Balance account={userData.account}/>
      <Users />
    </div>
  );
}
