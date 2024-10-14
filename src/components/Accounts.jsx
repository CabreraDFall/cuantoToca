import { useState, useEffect } from "react";
import Add from "../utils/Add";
import Modal from "../utils/Modal";

function Accounts({ listPersonas, onUpdate }) {
  const [bills, setBills] = useState(listPersonas);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleAddBill = (newBill) => {
    // Create the new entry with "Persona" and the current index
    const newEntry = {
      name: `Persona ${bills.length + 1}`, // Add "Persona" followed by the next index
      bill: newBill,
    };

    // Update local state with the new entry
    setBills((prevBills) => {
      const updatedBills = [...prevBills, newEntry];
      // Notify the parent component of the updated bills
      onUpdate(updatedBills);
      return updatedBills; // Return the updated bills for local state
    });
  };

  useEffect(() => {
    // Sync the bills with the personas when the component mounts or the listPersonas prop changes
    setBills(listPersonas);
  }, [listPersonas]);

  return (
    <div className="">
      <div className="flex justify-between pb-8 items-center">
        <div>
          <h2 className="text-xl font-medium">Cuenta</h2>
        </div>
        <Add onClick={handleAddClick} />
      </div>
      {bills.map((bill, index) => (
        <div key={index} className="flex justify-between">
          <div>{bill.name}</div>
          <div>{bill.bill}</div>
        </div>
      ))}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddBill}
      />
    </div>
  );
}

export default Accounts;
