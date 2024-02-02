import Button from "./Button";
import { useState,useEffect } from "react";
import axios from "axios"
import InputBox from "./InputBox";

export default function Users({ label }) {
    const [users, setUsers] = useState([{}]);

    useEffect(() => {
      axios.get("http://localhost:3000/USER/bulk").then((response) => {
        setUsers(response.data.user);
      });
    }, []);
  

  return (
    <div className="m-7">
      <div className="font-bold text-xl">Users</div>
      <InputBox placeholder={"Search Users Here..."} />
      <div className="">
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </div>
  );
}

function User({ user }) {
  return (
    <div className="flex justify-between mt-3">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {/* {user.firstName[0].toUpperCase()} */}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful ">
          <div className="">
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-ful">
        <Button label={"Send Money"} />
      </div>
    </div>
  );
}
