import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "https://paytm-backend-eta.vercel.app/signin",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in:", error);

      if (error.response && error.response.status === 401) {
        setError("Wrong username or password. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center bg-gray-400 min-h-screen">
      <div className="flex flex-col justify-center align-middle">
        <div className="p-7 rounded-lg bg-gray-50 mx-4">
          <div className="p-1">
            <Header label={"Sign in"} />
            <SubHeader
              label={"Enter your credentials to access your account"}
            />
            <InputBox
              label={"Email"}
              placeholder={"bayees1@gmail.com"}
              name={"username"}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <InputBox
              label={"Password"}
              placeholder={"123456"}
              name={"password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {error && <p className="text-red-500 text-md">{error}</p>}
            <Button
              label={loading ? "Signing in..." : "Sign in"}
              onClick={handleSignIn}
              disabled={loading}
            />{" "}
            <BottomWarning
              label={"Don't have an account?"}
              buttonText={"Sign up"}
              to={"/signup"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
