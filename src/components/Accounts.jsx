import { useState, useEffect } from "react";
import Add from "../utils/Add";
import Modal from "../utils/Modal";

function Accounts({ onTotalChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [personas, setPersonas] = useState([]);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = (value) => {
    // Agrega una nueva persona con el valor ingresado como negativo
    const negativeValue = -Math.abs(parseFloat(value));
    const newName = `Persona ${personas.length + 1}`;
    const updatedPersonas = [
      ...personas,
      { name: newName, value: negativeValue.toFixed(2) },
    ];
    setPersonas(updatedPersonas);
  };

  // Calcular el total y comunicarlo al componente padre
  useEffect(() => {
    const total = personas.reduce(
      (acc, persona) => acc + parseFloat(persona.value),
      0
    );
    if (onTotalChange) {
      onTotalChange(total);
    }
  }, [personas, onTotalChange]);

  return (
    <div className="">
      <div className="flex justify-between pb-8 items-center">
        <div>
          <h2 className="text-xl font-medium">Cuenta</h2>
        </div>
        <Add onClick={handleAddClick} />
      </div>
      {personas.map((persona, index) => (
        <div key={index} className="flex justify-between">
          <div>{persona.name}</div>
          <div>{persona.value}</div>
        </div>
      ))}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}

export default Accounts;
