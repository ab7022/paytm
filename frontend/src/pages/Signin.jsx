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
  const navigate = useNavigate();

  return (
    <div className="flex justify-center bg-gray-400 min-h-screen">
      <div className="flex flex-col justify-center align-middle ">
        <div className="p-7 rounded-lg bg-gray-50">
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
            <Button
              label={"Sign in"}
              onClick={async () => {
                try {
                  const response = await axios.post(
                    "http://localhost:3000/user/signin",
                    JSON.stringify({
                      username,
                      password
                    }),
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
                  console.error("Error signing up:", error);
                  // Handle the error, show a message, or redirect to an error page
                }
              }}
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
