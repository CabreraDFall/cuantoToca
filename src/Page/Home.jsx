import Accounts from "../components/Accounts";

function Home() {
  return (
    <div className="flex flex-col items-center ">
      <div className="py-20">
        <h1>Cuanto Toca</h1>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          <div className="w-96 h-96">
            <Accounts />
          </div>
          <div className="w-96 h-96">Participantes</div>
        </div>
        <div className="flex gap-5 ">
          <div className="w-96 h-96">Cuentas claras</div>
          <div className="w-96 h-96">Pagos realizados</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
