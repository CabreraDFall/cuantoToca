import { useState, useEffect } from "react";
import Add from "../utils/Add";
import Modal from "../utils/Modal";

function Participants({
  group,
  listPersonas,
  updateGroup,
  total,
  onCheckedChange,
}) {
  const [participants, setParticipants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const groupSize = group.length || listPersonas.length;
    const amountPerParticipant = groupSize > 0 ? total / groupSize : 0;

    // Crear la lista de participantes basada en las personas actuales y el tamaño del grupo
    const newParticipants = listPersonas.map((persona) => ({
      name: persona.name,
      amount: amountPerParticipant,
      checked: false, // Agregar un campo checked para cada participante
    }));

    // Si el número de personas es menor que el tamaño del grupo, agregar participantes de relleno
    const remainingParticipants = groupSize - listPersonas.length;
    for (let i = 0; i < remainingParticipants; i++) {
      newParticipants.push({
        name: `Participante ${listPersonas.length + i + 1}`,
        amount: amountPerParticipant,
        checked: false, // Agregar un campo checked para los nuevos participantes
      });
    }

    setParticipants(newParticipants);
  }, [group, listPersonas, total]);

  const overwriteGroup = (newGroupSize) => {
    const amountPerParticipant = newGroupSize > 0 ? total / newGroupSize : 0;

    // Crear un nuevo array de objetos para el grupo basado en el tamaño proporcionado
    const newGroup = Array.from({ length: newGroupSize }, (_, i) => ({
      name: `Participante ${i + 1}`,
      amount: amountPerParticipant,
      checked: false, // Agregar un campo checked para los nuevos participantes
    }));
    updateGroup(newGroup);
  };

  const handleCheckboxChange = (index) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index].checked = !updatedParticipants[index].checked;
    setParticipants(updatedParticipants);

    // Notificar al componente padre sobre el cambio
    onCheckedChange(updatedParticipants);
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = (newGroupSize) => {
    // Llamar a overwriteGroup con el nuevo tamaño del modal
    overwriteGroup(newGroupSize);
    setIsModalOpen(false); // Cerrar el modal después de actualizar el grupo
  };

  return (
    <div>
      <div className="flex justify-between pb-4">
        <div>Participante</div>
        <Add onClick={handleAddClick} />
      </div>
      {participants.map((participant, index) => (
        <div key={index} className="flex justify-between items-center py-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={participant.checked}
              onChange={() => handleCheckboxChange(index)}
            />
            <div>{participant.name}</div>
          </div>
          <div>{participant.amount.toFixed(2)}</div>
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

export default Participants;
