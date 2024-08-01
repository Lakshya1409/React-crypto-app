import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import ExchangeCard from "./ExchangeCard";
import ErrorComponent from "./ErrorComponent";
const server = `https://api.coingecko.com/api/v3`;
const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchExchange = async () => {
      // const response = await fetch(`${server}/exchanges`);
      // const data = await response.json();
      // console.log(data);
      try {
        const { data } = await axios.get(`${server}/exchanges?per_page=100`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchange();
  }, []);
  if (error) return <ErrorComponent message="Error While Fetching Exchanges" />;
  return (
    <section>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap justify-center h-full ml-20 mr-20 p-10 gap-20">
          {exchanges.map((i) => (
            <ExchangeCard
              key={i.id}
              name={i.name}
              img={i.image}
              rank={i.trust_score_rank}
              url={i.url}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Exchanges;
