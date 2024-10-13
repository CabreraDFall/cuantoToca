import { useState, useEffect } from "react";
import Add from "../utils/Add";

function Participants({ onRemainderChange, total }) {
  const [participants, setParticipants] = useState([]);

  const handleCheckboxChange = (index) => {
    const updatedParticipants = participants.map((participant, idx) =>
      idx === index
        ? { ...participant, selected: !participant.selected }
        : participant
    );
    setParticipants(updatedParticipants);
  };

  // Calculate the total of selected participants and communicate it to the parent component
  useEffect(() => {
    const participantsSum = participants
      .filter((participant) => participant.selected)
      .reduce((acc, participant) => acc - participant.value, 0);

    // Communicate the sum of selected participants to the parent component
    if (onRemainderChange) {
      onRemainderChange(participantsSum);
    }
  }, [participants, onRemainderChange]); // Include participants here

  // Update the value of each participant according to the total
  useEffect(() => {
    const updatedParticipants = participants.map((participant) => ({
      ...participant,
      value: total / (participants.length || 1), // Prevent division by zero
    }));
    setParticipants(updatedParticipants);
  }, [total, participants.length]); // Include participants.length for clarity

  // Function to add a new participant
  const addParticipant = () => {
    const newIndex = participants.length + 1; // Increment the index for the new participant
    const newParticipant = {
      name: `Persona ${newIndex}`,
      value: total / (participants.length + 1), // Update the initial value with the new total
      selected: false,
    };
    setParticipants([...participants, newParticipant]);
  };

  return (
    <div>
      <div className="flex justify-between pb-4">
        <div>Participante</div>
        <Add onClick={addParticipant} />{" "}
        {/* Pass the addParticipant function as a prop */}
      </div>
      {participants.map((participant, index) => (
        <div key={index} className="flex justify-between items-center py-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={participant.selected}
              onChange={() => handleCheckboxChange(index)}
            />
            <div>{participant.name}</div>
          </div>
          <div>{participant.value.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
}

export default Participants;
