export default function Balance({account}) {
  if (!account) {
    return null; // or provide a loading state or placeholder
  }
  return (
    <div className="flex flex-row pl-7 pt-5 text-lg ">
      <div className="font-semibold ">Your Balance</div>
      <div className="pl-4 font-medium text-xl font-semibold">{account.amount}</div>
    </div>
  );
}
