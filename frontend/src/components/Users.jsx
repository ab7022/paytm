import Button from "./Button";
import { useState,useEffect } from "react";
import axios from "axios"
import InputBox from "./InputBox";
import { useNavigate } from "react-router-dom";
export default function Users({ label }) {
    const [users, setUsers] = useState([{}]);
    const [filter, setFilter] = useState("");


    useEffect(() => {
      axios.get("https://paytm-backend-eta.vercel.app/bulk?filter="+ filter).then((response) => {
        setUsers(response.data.user);
      });
    }, [filter]);
  console.log(filter)

  return (
    <div className="m-7">
      <div className="font-bold text-xl">Users</div>
      <InputBox placeholder={"Search Users Here..."} onChange={((e)=>{setFilter(e.target.value)})}/>
        {users.map((user) => (
          <User user={user} />
        ))}
 </div>
  );
}

function User({ user }) {
  const navigate = useNavigate()

  if(!user.firstName){
    return null
  }
  return (
    <div className="flex justify-between mt-3">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful ">
          <div className="">
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-ful">
        <Button label={"Send Money"} onClick={(e) =>{
          navigate("/sendMoney?id="+user._id + "&name=" + user.firstName)
        }}/>
      </div>
    </div>
  );
}
