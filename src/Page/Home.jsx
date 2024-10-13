import { useState } from "react";
import Accounts from "../components/Accounts";
import Participants from "../components/Participants";
import Payments from "../components/Payments";
import Splits from "../components/Splits";

function Home() {
  const [total, setTotal] = useState(0);
  const [remainder, setRemainder] = useState(0);

  const handleTotalChange = (newTotal) => {
    setTotal(newTotal);
    // Recalculate remainder whenever total changes
    setRemainder(newTotal); // Set remainder to the total initially
  };

  const handleRemainderChange = (participantsSum) => {
    // Calculate the remainder as total minus the sum of selected participants
    setRemainder(total + participantsSum);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col py-20 items-center justify-center">
        <div>
          <h1>Cuanto Toca</h1>
        </div>
        <div className="flex gap-5">
          <div>
            Total: <span>{total.toFixed(2)}</span>
          </div>
          <div>
            Restante: <span>{remainder.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          <div className="w-96 h-96">
            <Accounts onTotalChange={handleTotalChange} />
          </div>
          <div className="w-96 h-96">
            <Participants
              onRemainderChange={handleRemainderChange}
              total={total}
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="w-96 h-96">
            <Splits />
          </div>
          <div className="w-96 h-96">
            <Payments />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
