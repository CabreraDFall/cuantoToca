import { useState } from "react";

function Modal({ isOpen, onClose, onSubmit }) {
  const [value, setValue] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    // Llamar a onSubmit con el valor convertido a número
    onSubmit(parseFloat(value));
    setValue(""); // Resetea el valor después de enviarlo
    onClose(); // Cierra el modal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-lg font-medium mb-4">Agregar valor</h2>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Agregar
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default Modal;
