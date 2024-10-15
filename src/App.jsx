import { useState } from "react";

const App = () => {
  // Estado para la cantidad de personas y sus pagos
  const [numPeople, setNumPeople] = useState(0);
  const [payments, setPayments] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Estado para manejar el valor de cada entrada de pago
  const handleNumPeopleChange = (e) => {
    const count = parseInt(e.target.value);
    setNumPeople(count);
    setPayments(
      Array.from({ length: count }, (_, index) => ({
        name: `Nombre ${index + 1}`,
        amount: 0,
      }))
    );
  };

  const handlePaymentChange = (index, field, value) => {
    const updatedPayments = [...payments];
    updatedPayments[index] = {
      ...updatedPayments[index],
      [field]: field === "amount" ? parseFloat(value) : value,
    };
    setPayments(updatedPayments);
  };

  // Calcular el total de la cuenta y el costo por persona
  const totalAmount = payments.reduce(
    (total, person) => total + (person.amount || 0),
    0
  );
  const perPerson = numPeople > 0 ? totalAmount / numPeople : 0;

  // Calcular la diferencia para cada persona
  const calculateDifferences = () => {
    return payments.map((person) => ({
      ...person,
      difference: (person.amount - perPerson).toFixed(2),
    }));
  };

  const differences = calculateDifferences();

  // Encontrar la persona que pagó más
  const personWhoPaidMost = payments.reduce(
    (prev, current) => {
      return current.amount > prev.amount ? current : prev;
    },
    { name: "", amount: 0 }
  );

  // Personas que deben dinero a la persona que pagó más
  const peopleWhoOwe = differences
    .filter((person) => parseFloat(person.difference) < 0)
    .map((person) => ({
      name: person.name,
      owes: Math.abs(parseFloat(person.difference)),
    }));

  // Personas a las que la persona que pagó más debe transferir dinero
  const peopleWhoAreOwed = differences
    .filter(
      (person) =>
        parseFloat(person.difference) > 0 &&
        person.name !== personWhoPaidMost.name
    )
    .map((person) => ({
      name: person.name,
      amountOwed: parseFloat(person.difference),
    }));

  const handleShowRecommendations = () => {
    setShowRecommendations(true);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>CuantoToca</h1>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Número de personas:
          <input
            type="number"
            value={numPeople}
            onChange={handleNumPeopleChange}
            min="1"
            style={{ marginLeft: "10px", border: "1px solid black" }}
          />
        </label>
      </div>

      {payments.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          {payments.map((person, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <label>
                Nombre:
                <input
                  type="text"
                  value={person.name}
                  onChange={(e) =>
                    handlePaymentChange(index, "name", e.target.value)
                  }
                  style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    border: "1px solid black",
                  }}
                />
              </label>
              <label>
                Pagó:
                <input
                  type="number"
                  value={person.amount}
                  onChange={(e) =>
                    handlePaymentChange(index, "amount", e.target.value)
                  }
                  min="0"
                  style={{ marginLeft: "10px", border: "1px solid black" }}
                />
              </label>
            </div>
          ))}
        </div>
      )}

      <h2>Total: {totalAmount.toFixed(2)} euros</h2>
      <h3>Por persona: {perPerson.toFixed(2)} euros</h3>

      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Pagó</th>
            <th>Debe/Paga</th>
          </tr>
        </thead>
        <tbody>
          {differences.map((person, index) => (
            <tr key={index}>
              <td>{person.name || `Persona ${index + 1}`}</td>
              <td>{person.amount} euros</td>
              <td>
                {parseFloat(person.difference) >= 0
                  ? `Le deben ${person.difference} euros`
                  : `Debe ${Math.abs(person.difference)} euros`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón para mostrar recomendaciones */}
      <button
        onClick={handleShowRecommendations}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          border: "none",
          backgroundColor: "#007BFF",
          color: "white",
          cursor: "pointer",
        }}
      >
        Mostrar Recomendaciones
      </button>

      {/* Mostrar recomendaciones solo si se presionó el botón */}
      {showRecommendations && personWhoPaidMost.name && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid black",
            backgroundColor: "#f0f0f0",
          }}
        >
          <h2>Recomendaciones</h2>
          <p>
            La persona que pagó más es <strong>{personWhoPaidMost.name}</strong>{" "}
            con <strong>{personWhoPaidMost.amount} euros</strong>. Se recomienda
            que esta persona recoja el dinero de aquellos que deben, para
            simplificar las transferencias:
          </p>
          <ul>
            {peopleWhoOwe.map((person, index) => (
              <li key={index}>
                <strong>{person.name}</strong> debe transferir{" "}
                <strong>{person.owes.toFixed(2)} euros</strong> a{" "}
                {personWhoPaidMost.name}.
              </li>
            ))}
          </ul>
          {peopleWhoAreOwed.length > 0 && (
            <>
              <p>
                Luego, <strong>{personWhoPaidMost.name}</strong> deberá
                transferir el exceso de dinero a las siguientes personas que
                pagaron más de lo que les tocaba:
              </p>
              <ul>
                {peopleWhoAreOwed.map((person, index) => (
                  <li key={index}>
                    <strong>{personWhoPaidMost.name}</strong> debe transferir{" "}
                    <strong>{person.amountOwed.toFixed(2)} euros</strong> a{" "}
                    <strong>{person.name}</strong>.
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
