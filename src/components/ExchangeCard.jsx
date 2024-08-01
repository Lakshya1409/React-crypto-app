import React from "react";

const ExchangeCard = ({ name, img, rank, url }) => {
  return (
    <a
      href={url}
      target={"blank"}
      className=" text-white shadow-lg hover:scale-110 hover:transition hover:shadow-2xl"
    >
      <div className="flex flex-col justify-evenly items-center bg-white h-48 w-48 rounded-md gap-2 p-3">
        <img src={img} alt="Exchange" className="object-contain w-20 h-20" />
        <h3 className="text-black font-bold">{rank}</h3>
        <h1 className="text-center line-clamp-2 text-black font-semibold">
          {name}
        </h1>
      </div>
    </a>
  );
};

export default ExchangeCard;
