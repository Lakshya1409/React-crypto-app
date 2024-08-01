import React from "react";
import { Link } from "react-router-dom";

const CoinCard = ({ id, name, img, symbol, price, currencySymbol = "₹" }) => {
  return (
    <Link
      to={`/coin/${id}`}
      className="shadow-lg hover:scale-110 hover:transition hover:shadow-2xl"
    >
      <div className="flex flex-col justify-evenly items-center bg-white h-52 w-52 rounded-md gap-2 p-3">
        <img src={img} alt="Coin" className="object-contain w-20 h-20" />
        <h1 className="text-black font-bold text-xl">{symbol}</h1>
        <h2 className="text-center line-clamp-1 text-black">{name}</h2>
        <h2 className="text-center line-clamp-1 text-black font-semibold">
          {price ? `${currencySymbol}${price}` : "NA"}
        </h2>
      </div>
    </Link>
  );
};

export default CoinCard;
