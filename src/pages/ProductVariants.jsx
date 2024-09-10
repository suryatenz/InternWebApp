import React, { useState } from "react";
import {useNavigate  } from 'react-router'
export default function ProductVariants() {
  const [cards, setCards] = useState([1, 2]);
const navigate = useNavigate();
  const addCard = () => {
    setCards([...cards, cards.length + 1]);
  };
  const [unit, setUnit] = useState("Inch");
  const handleNext = () => {

     navigate("/search/ProductVariants/ProductInfo/Specifications");

  }
  return (
    <div className="m-3 mt-0 rounded-md border border-neutral-800 border-t-0 rounded-t-none  flex flex-col h-full bg-neutral-900  " style={{minHeight: '75vh'}}>
    <div className="px-9 py-1 flex flex-col gap-2 ">
      <span className="text-orange-500 text-lg font-medium ">Variants</span>
      <span className=" ">Telivision Size</span>
    </div>
    <div className="flex flex-wrap justify-start p-4 px-9 pt-2 gap-8  flex-grow">
      {cards.map((card, index) => (
        <div className="flex flex-col w-52 gap-4">
          <div
            key={index}
            className="border border-neutral-700 rounded-sm h-44 px-4 pt-2  "
          >
            <div>
              <span className="text-sm font-medium text-neutral-500">
                Variant #{index + 1}
              </span>
            </div>
            <div className="flex  pt-2 gap-1">
              <div className="bg-neutral-800 border border-neutral-700 w-14  text-neutral-200 text-base  rounded-sm pl-2 pr-8">
                {unit === "cm" ? (45 + index * 10) * 2.54 : 45 + index * 10}
              </div>
              <select
                className=" bg-neutral-900  text-neutral-300 text-lg font-medium"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                <option value="Inch">Inch</option>
                <option value="cm">cm</option>
              </select>
            </div>
            <div className=" border border-r-0 mr-5 rounded shadow-md pb-1 border-t-0 border-l-0 border-neutral-700 pt-8">
              <span className="text-sm">Product Data Capability</span>
            </div>
            <div className="flex gap-3 pt-2">
              <div className="flex flex-col items-center">
                <span className=" font-light" style={{ fontSize: "11px" }}>
                  Add Asset
                </span>
                <span className="bg-orange-500 py-0.5 rounded w-12"></span>
              </div>
              <div className="flex flex-col items-center">
                <span className=" font-light" style={{ fontSize: "11px" }}>
                  Validate
                </span>
                <span className="bg-orange-500 py-0.5 rounded w-12"></span>
              </div>
              <div className="flex flex-col  items-center">
                <span className=" font-light" style={{ fontSize: "11px" }}>
                  Go Live
                </span>
                <span className="bg-orange-500 py-0.5 rounded w-12"></span>
              </div>
            </div>
          </div>

          <button onClick={handleNext} className="bg-orange-500 py-2 rounded-sm">Next</button>
        </div>
      ))}
      <div
        onClick={addCard}
        className=" p-4 flex items-center cursor-pointer gap-2 h-48 w-48 border-dashed border-2 rounded-sm border-orange-500"
        style={{ backgroundColor: "#251B16" }}
      >
        <span className="font-semibold text-lg r-4 "> + </span>
        <span className="font-semibold text-sm "> Add More Variants </span>
      </div>
    </div>
    <div className="text-right pr-14 pb-6 ">
      <button className="bg-orange-500 text-white  py-1.5 rounded-sm px-7">
        Confirm
      </button>
    </div>
  </div>
  );
}
