import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import { useEffect } from "react";

export default function SendMoney() {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [userData, setUserData] = useState({ user: null, account: null });

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
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
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData(); 
  }, []);

  const handleTransfer = async () => {
    try {
      setLoading(true); 
      await axios.post(
        "https://paytm-backend-eta.vercel.app/transfer",
        {
          to: id,
          amount,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      setSuccessMessage("Transfer successful");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Transfer error:", error);
      setSuccessMessage("Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center bg-gray-400 min-h-screen">
      <div className="flex flex-col justify-center align-middle ">
        <div className="p-7 rounded-lg bg-gray-50">
          <div className="p-2">
            <div className="mb-14 mx-10">
              <Header label={"Send Money"} />
            </div>
            <div className="flex flex-row align-center">
              <div className="h-12 w-12 pb-5 bg-green-500 rounded-full justify-center flex text-white text-2xl font-medium pt-1.5">
                {name ? name[0].toUpperCase() : null}
              </div>
              <div className="ml-5 mt-2 pb-5 text-xl font-semibold">{name}</div>
            </div>
            <div className="flex flex-row  pt-5 ">
              <div className="font-medium ">Your Available Balance is</div>
              <div className="pl-1 font-semibold">
                {userData.account?.amount || 0}
              </div>
            </div>
            <InputBox
              label={"Amount (in Rs)"}
              placeholder={"Enter Amount"}
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <div
              className={`bg-green-500 hover:bg-green-600  text-white text-center p-2.5 rounded-xl font-medium text-lg mt-2 ${
                loading ? "cursor-not-allowed opacity-50" : "" // Disable button and change opacity if loading
              }`}
            >
              <button onClick={handleTransfer} disabled={loading}>
                {loading ? "Transferring..." : "Initiate Transfer"}
              </button>
            </div>
            {successMessage && (
              <div className="mt-2 text-green-600">{successMessage}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
