import { Plus } from "lucide-react";

function Add({ onClick }) {
  return (
    <div
      className="bg-[#3F51B5] p-2 rounded-full flex justify-center shadow-[0px_6px_10px_rgba(0,0,0,0.3)]"
      onClick={onClick}
    >
      <Plus color="white" size={18} />
    </div>
  );
}

export default Add;
