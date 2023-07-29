// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

const style = {
  fontSize: "28px",
};

export default function App() {
  const [amount, setAmount] = useState(1);
  const [convert1, setConvert1] = useState("USD");
  const [convert2, setConvert2] = useState("EUR");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchCurrencies() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${convert1}&to=${convert2}`
        );
        const data = await res.json();
        setOutput(data.rates[convert2]);
        setIsLoading(false);
      }

      if (convert1 === convert2) return setOutput(amount);
      if (amount === 0) return setOutput(amount);
      fetchCurrencies();
    },
    [amount, convert1, convert2]
  );

  return (
    <>
      <form>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          disabled={isLoading}
        />
        <select
          value={convert1}
          onChange={(e) => setConvert1(e.target.value)}
          disabled={isLoading}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select
          value={convert2}
          onChange={(e) => setConvert2(e.target.value)}
          disabled={isLoading}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
      </form>
      <p style={style}>{output}</p>
    </>
  );
}
