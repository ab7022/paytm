import { Link } from "react-router-dom";

export default function BottomWarning({ label, buttonText, to }) {
  return (
    <div className="flex flex-row text-center pt-4 font-medium px-9">
      <div className="text-center ">{label}</div>
      <Link to={to} className="text-center pl-1 underline decoration-2">
        {buttonText}
      </Link>
    </div>
  );
}
