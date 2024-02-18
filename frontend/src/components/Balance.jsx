import { useState, useEffect } from 'react';

export default function Balance({ account }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (account !== null && account !== undefined ) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [account]);

  if (loading) {
    return (
      <div className="flex flex-row text-center text-lg justify-center p-4 bg-gray-100">
        <div className="font-semibold justify-center text-center">
          Your Available Balance Is
        </div>
        <div className="pl-2 text-xl font-semibold">
          {"Loading..."}
        </div>
      </div>
    );
  }

  if (account === null || account === undefined) {
    return null;
  }

  return (
    <div className="flex flex-row text-center text-lg justify-center p-4 bg-gray-100">
      <div className="font-semibold justify-center text-center">
        Your Available Balance Is
      </div>
      <div className="pl-2  text-xl font-semibold">
        {account || "Loading"}
      </div>
    </div>
  );
}
