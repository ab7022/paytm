import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";

export default function SendMoney() {
  return (
    <div className="flex justify-center bg-gray-400 min-h-screen">
      <div className="flex flex-col justify-center align-middle ">
        <div className="p-7 rounded-lg bg-gray-50">
          <div className="p-2">
            <div className="mb-14 mx-10">
              <Header label={"Send Money"} />
            </div>
            <div className="flex flex-row align-center ">
              <div className="h-12 w-12 pb-5 bg-green-500 rounded-full justify-center flex  text-white text-2xl font-medium pt-1.5">
                A
              </div>
              <div className="ml-5 mt-2 pb-5 text-xl font-semibold">
                Friend's Name
              </div>
            </div>
            <InputBox label={"Amount (in Rs)"} placeholder={"Enter Amount"} />
            <div
              className={`bg-green-500 hover:bg-green-600 hover:bg-primary2 text-white text-center p-2.5 rounded-xl font-medium text-lg mt-2`}
            >
              <button>Initiate Transfer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
