import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  console.log("Updated state:", { username, firstname, lastName, password });
  console.log(password);

  return (
    <div className="flex justify-center bg-gray-400 min-h-screen">
      <div className="flex flex-col justify-center align-middle ">
        <div className="p-5 rounded-lg bg-gray-50">
          <div className="p-1">
            <Header label={"Sign up"} />
            <SubHeader label={"Enter your information to create an account"} />
            <InputBox
              label={"First Name"}
              placeholder={"Abdul"}
              name={"fname"}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <InputBox
              label={"Last Name"}
              placeholder={"Bayees"}
              name={"lname"}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
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
              name={"password"}
              placeholder={"123456"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              label={"Sign up"}
              onClick={async () => {
                try {
                  const response = await axios.post(
                    "https://paytm-backend-eta.vercel.app/signup",
                    JSON.stringify({
                      username,
                      password,
                      fName: firstname,
                      lName: lastName,
                    }),
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  console.log(response);

                  localStorage.setItem("token","Bearer", response.data.token);
                  navigate("/dashboard");
                } catch (error) {
                  console.error("Error signing up:", error);
                  // Handle the error, show a message, or redirect to an error page
                }
              }}
            />
            <BottomWarning
              label={"Already have an account?"}
              buttonText={"Sign in"}
              to={"/"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
