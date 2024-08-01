import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import { useParams } from "react-router-dom";
import Chart from "./Chart";

const server = `https://api.coingecko.com/api/v3`;

const CoinDetails = () => {
  const params = useParams();
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [currency, params.id, days]);

  if (error) return <ErrorComponent message="Error While Fetching Coin" />;

  return (
    <section className="flex flex-col items-center w-full">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className=" flex justify-center items-center mt-2"
            style={{ height: "70%", width: "87%" }}
          >
            <Chart arr={chartArray} currency={currencySymbol} days={days} />
          </div>

          <div className="flex gap-3 justify-start overflow-x-auto ml-30 w-3/4 mt-2 sm:justify-center">
            {btns.map((i) => (
              <button
                disabled={days === i}
                key={i}
                onClick={() => switchChartStats(i)}
                className="p-1 bg-red-200 font-medium rounded-md hover:bg-red-500 hover:scale-110"
              >
                {i}
              </button>
            ))}
          </div>

          {/* radio */}
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

          {/* main */}
          <div className="flex flex-col h-100 justify-center p-16 gap-4 w-full sm:w-3/4">
            <h2 className="self-center opacity-25">
              Last Updated On{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </h2>

            {/* coininfo */}
            <div className="CoinInfo flex flex-col gap-3">
              {/* img */}
              <img
                src={coin.image.large}
                alt="coin"
                className="w-20 h-20 object-contain"
              />

              {/* name price change */}
              <div>
                <h1 className="font-serif font-bold text-sm">{coin.name}</h1>
                <p className="text-lg font-bold">
                  {currencySymbol}
                  {coin.market_data.current_price[currency]}
                </p>
                <div className="flex">
                  {coin.market_data.price_change_percentage_24h < 0 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      color="red"
                      fill="none"
                    >
                      <path
                        d="M20 11V16H15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20 16L15 11C14.1174 10.1174 13.6762 9.67615 13.1346 9.62737C13.045 9.6193 12.955 9.6193 12.8654 9.62737C12.3238 9.67615 11.8826 10.1174 11 11C10.1174 11.8826 9.67615 12.3238 9.13457 12.3726C9.04504 12.3807 8.95496 12.3807 8.86543 12.3726C8.32385 12.3238 7.88256 11.8826 7 11L4 8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      color="green" // This sets the color for the fill, not stroke
                      fill="none"
                    >
                      <path
                        d="M20 13V8H15"
                        stroke="green" // Change the stroke color to green
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20 8L15 13C14.1174 13.8826 13.6762 14.3238 13.1346 14.3726C13.045 14.3807 12.955 14.3807 12.8654 14.3726C12.3238 14.3238 11.8826 13.8826 11 13C10.1174 12.1174 9.67615 11.6762 9.13457 11.6274C9.04504 11.6193 8.95496 11.6193 8.86543 11.6274C8.32385 11.6762 7.88256 12.1174 7 13L4 16"
                        stroke="green" // Change the stroke color to green
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <p className="text-sm">
                    {coin.market_data.price_change_percentage_24h}%
                  </p>
                </div>
                <div className="bg-black w-fit p-2 text-white rounded-sm">{`#${coin.market_cap_rank}`}</div>
              </div>
            </div>

            {/* custom bar */}
            <CustomBar
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
              currentPrice={`${coin.market_data.current_price[currency]}`}
            />
            <div className="p-4 w-full">
              <Item title={"Max Supply"} value={coin.market_data.max_supply} />
              <Item
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
              />
              <Item
                title={"Market Cap"}
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
              />
              <Item
                title={"All Time Low"}
                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
              />
              <Item
                title={"All Time High"}
                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

const CustomBar = ({ high, low }) => {
  return (
    <div className="w-full flex flex-col">
      {/* Progress Bar */}
      <div className="relative w-full">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 w-1/2"></div>
        </div>
      </div>

      {/* Range Info */}
      <div className="flex justify-between w-full mt-2 text-sm">
        <span className="px-2 py-1 bg-red-500 text-white rounded-full">
          {low}
        </span>
        <span className="text-gray-500">24H Range</span>
        <span className="px-2 py-1 bg-green-500 text-white rounded-full">
          {high}
        </span>
      </div>
    </div>
  );
};

const Item = ({ title, value }) => {
  return (
    <div className="flex justify-between w-full my-4">
      <p className="tracking-widest" style={{ fontFamily: "Bebas Neue" }}>
        {title}
      </p>
      <p className="text-sm">{value || "NA"}</p>
    </div>
  );
};

export default CoinDetails;
