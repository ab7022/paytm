import { useEffect,useState } from "react";
import QRCodeGenerator from "./QrCodeGenerator";
import DialogBox from "./DialogBox";

export default function Appbar({ name }) {
  const [loading,setLoading] = useState(true)
  const [isDialogOpen,setDialogOpen] = useState(false)
  useEffect(()=>{
    if(name && name.firstName && name.firstName[0]){
      setLoading(false)

    }else{
      setLoading(true)
    }
  },[name])
  // if (!name) {
  //   return null; // If name is not available, return null or a loading state
  // }

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className="shadow h-14 flex justify-between px-5">
      <div className="flex flex-col justify-center align-center font-bold text-2xl">
        Paytm
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center mr-5 text-l font-medium">
          Hello {loading ?  "User": name.firstName }
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
          <button onClick={handleOpenDialog}>
                                                                                                                  {loading ?"U": name.firstName[0].toUpperCase() }
            </button>
          </div>
        </div>
      </div>
              {isDialogOpen && <DialogBox onClose={handleCloseDialog} name={name}/>}

    </div>
  );
}
