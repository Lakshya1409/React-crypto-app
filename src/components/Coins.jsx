import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import CoinCard from "./CoinCard";
import ErrorComponent from "./ErrorComponent";

const server = `https://api.coingecko.com/api/v3`;

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  const btns = new Array(132).fill(1);
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);

  if (error) return <ErrorComponent message="Error While Fetching Coins" />;

  return (
    <section>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-center mt-4 gap-4 ">
            <div className="flex gap-1 font-bold font-mono">
              <input
                type="radio"
                name="id"
                checked={currency === "inr"}
                onChange={() => setCurrency("inr")}
              />
              <p>INR</p>
            </div>
            <div className="flex gap-1 font-bold font-mono">
              <input
                type="radio"
                name="id"
                onChange={() => setCurrency("usd")}
                checked={currency === "usd"}
              />
              <p>USD</p>
            </div>
            <div className="flex gap-1 font-bold font-mono">
              <input
                type="radio"
                name="id"
                onChange={() => setCurrency("eur")}
                checked={currency === "eur"}
              />
              <p>EURO</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center h-full ml-20 mr-20 p-10 gap-20">
            {coins.map((i) => (
              <CoinCard
                id={i.id}
                key={i.id}
                name={i.name}
                img={i.image}
                symbol={i.symbol}
                price={i.current_price}
                currencySymbol={currencySymbol}
              />
            ))}
          </div>
          <div className="flex justify-center">
            <div className="flex overflow-x-auto gap-2 p-8 w-3/4">
              {btns.map((item, index) => (
                <button
                  key={index}
                  className="bg-black text-white p-2 rounded-md"
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Coins;
