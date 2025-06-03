import React, { useEffect, useState } from "react";
import { IoGameController } from "react-icons/io5";
import { PiCopyrightLight } from "react-icons/pi";

const Header = () => {
  const colors = ["Red", "Green", "Blue", "Gray", "Purple", "Orange"];

  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  const [textColor, setTextColor] = useState(getRandomColor());
  const [fontColor, setFontColor] = useState(getRandomColor());
  const [score, setScore] = useState(0);

  useEffect(() => {
    setFontColor(getRandomColor());
  }, [textColor]);

  const handleGuess = (color) => {
    if (color === textColor) {
      setScore(score + 1);
      setTextColor(getRandomColor());
    } else {
      alert("Wrong! Game Over.");
      setScore(0);
      setTextColor(getRandomColor());
    }
  };

  const today = new Date();
  const year = today.getFullYear();
  console.log(year);
  return (
    <div className="relative w-full h-screen bg-[url('./assets/background.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-white/30 backdrop-blur-1xs"></div>

      <div className="relative z-10 flex items-center justify-center h-full w-full">
        <div className="flex flex-col items-center justify-center   bg-cover bg-center h-screen p-4 text-center">
          <h1 className="text-3xl font-bold mb-15">
            <IoGameController className="inline text-red-500" />{" "}
            <span className="text-green-600"> C </span>{" "}
            <span className="text-blue-600"> O </span>{" "}
            <span className="text-purple-500"> L </span>
            <span className="text-blue-600"> O </span>
            <span className="text-green-600"> R </span>
            <IoGameController className="inline text-red-500" />
          </h1>

          <p className="my-2 text-gray-200">
            Click the button that matches the color name,
            <span className="text-rose-500 font-bold">
              {" "}
              not the text color!{" "}
            </span>
          </p>
          <div
            className="text-4xl font-bold my-3"
            style={{ color: fontColor.toLowerCase() }}
          >
            {textColor}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-5">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => handleGuess(color)}
                className={`px-4 py-2 rounded text-white font-semibold shadow-md transition duration-200 hover:scale-105`}
                style={{ backgroundColor: color.toLowerCase() }}
              >
                {color}
              </button>
            ))}
          </div>
          <div className="text-xl text-gray-800">Your Score : {score}</div>

          <footer className="min-w-screen fixed bottom-0 bg-gray-500 flex items-center justify-center text-white py-3">
            <PiCopyrightLight className="inline" /> {year}. Designed by Mr.
            Phyo. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Header;
