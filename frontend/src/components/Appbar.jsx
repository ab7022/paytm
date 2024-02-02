export default function Appbar({ name }) {
  if (!name) {
    return null; // If name is not available, return null or a loading state
  }

  return (
    <div className="shadow h-14 flex justify-between px-5">
      <div className="flex flex-col justify-center align-center font-bold text-2xl">
        Paytm
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center mr-5 text-l font-medium">
          Hello {name.firstName}
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {name.firstName[0].toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}
