import "./App.css";

import { useEffect, useState } from "react";

const getRandomNumberFromApi = async (): Promise<number> => {
  const res = await fetch("https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new");
  const numberString = await res.text();
  return +numberString;
};

export const App = () => {
  const [number, setNumber] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    getRandomNumberFromApi()
      .then(setNumber)
      .catch((error) => setError(error.message));
  }, []);

  useEffect(() => {
    if (number) setIsLoading(false);
  }, [number]);

  useEffect(() => {
    if (error) setIsLoading(false);
  }, [error]);

  const handlerCargando = (isLoading: boolean, number?: number) => {
    if (isLoading) return <h2>Cargando...</h2>;
    return <h2>Número Aleatorio: {number}</h2>;
  };

  return (
    <div className="App App-header">
      {handlerCargando(isLoading, number)}

      {error && <h3>{error}</h3>}
    </div>
  );
};

export default App;
