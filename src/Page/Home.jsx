import { useState } from "react";
import Accounts from "../components/Accounts";
import Participants from "../components/Participants";
import Payments from "../components/Payments";
import Splits from "../components/Splits";

function Home() {
  const [personas, setPersonas] = useState([]);
  const [group, setGroup] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]); // Nuevo estado para participantes seleccionados

  // Function to update personas based on new bills
  const updatePersonas = (newBills) => {
    setPersonas(newBills);
  };

  const updateGroup = (newGroup) => {
    setGroup(newGroup);
  };

  const calculateTotal = () => {
    return personas.reduce((acc, persona) => acc + (persona.bill || 0), 0);
  };

  const calculateTotalChecked = (participants) => {
    // Calcular el total solo de los participantes seleccionados
    return participants.reduce((acc, participant) => {
      return participant.checked ? acc + participant.amount : acc;
    }, 0);
  };

  const handleCheckedChange = (participants) => {
    // Actualiza el estado de los participantes seleccionados
    setSelectedParticipants(participants);
  };

  const totalChecked = calculateTotalChecked(selectedParticipants); // Total de participantes seleccionados
  const remaining = calculateTotal() - totalChecked; // Calcular el restante

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col py-20 items-center justify-center">
        <div>
          <h1>Cuanto Toca</h1>
        </div>
        <div className="flex gap-5">
          <div>
            Total: <span>{calculateTotal().toFixed(2)}</span>
          </div>
          <div>
            Restante: <span>{remaining.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          <div className="w-96 h-96">
            <Accounts listPersonas={personas} onUpdate={updatePersonas} />
          </div>
          <div className="w-96 h-96">
            <Participants
              group={group}
              listPersonas={personas}
              updateGroup={updateGroup}
              total={calculateTotal()}
              onCheckedChange={handleCheckedChange} // Pasar la función para manejar cambios de selección
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
