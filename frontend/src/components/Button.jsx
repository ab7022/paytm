export default function Button({ label, onClick }) {
  return (
    <div
      className={`bg-primary hover:bg-primary2 text-white text-center p-2.5 rounded-xl font-medium text-lg`}
    >
      <button onClick={onClick}>{label}</button>
    </div>
  );
}
