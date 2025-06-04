import React, { useEffect, useRef, useState } from "react";
import { IoGameController } from "react-icons/io5";
import { PiCopyrightLight } from "react-icons/pi";

const Body = () => {
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
  //   console.log(year);

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    audio.play().catch((e) => {
      console.log("Autoplay failed (usually due to browser restrictions):", e);
    });

    return () => {
      audio.pause();
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
    setStarted(!true);
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/Sakura.mp3" type="audio/mpeg" />
      </audio>
      {!started && (
        <button
          onClick={toggleMusic}
          className={`fixed top-4 right-4 text-white font-bold py-2 px-4 rounded shadow z-50 ${
            !isPlaying
              ? "bg-yellow-400 hover:bg-yellow-500"
              : "bg-blue-500 hover:bg-blue-600"
          } `}
        >
          {isPlaying ? "Pause Music" : "Play Music"}
        </button>
      )}

      <div className="flex flex-col items-center justify-center bg-gray-300  bg-cover bg-center min-h-screen p-4 text-center">
        <img
          src="/baby.png"
          alt="baby"
          className="w-40 h-70 fixed top-8 object-cover rounded-lg"
        />
        <h1 className="text-3xl font-bold mt-60">
          <IoGameController className="inline text-red-500" />{" "}
          <span className="text-green-600"> C </span>{" "}
          <span className="text-blue-600"> O </span>{" "}
          <span className="text-purple-500"> L </span>
          <span className="text-blue-600"> O </span>
          <span className="text-green-600"> R </span>
          <IoGameController className="inline text-red-500" />
        </h1>

        <p className="mt-3 text-gray-600">
          Click the button that matches the color name,
          <span className="text-rose-500 font-bold"> not the text color! </span>
        </p>
        <div
          className="text-2xl font-bold my-1"
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
        <div className="text-xl text-gray-800">
          <p>Your Score : {score}</p>
        </div>

        <footer className="min-w-screen fixed bottom-0 bg-gray-500 flex items-center justify-center text-white py-3">
          <PiCopyrightLight className="inline" /> {year}. Designed by Mr. Phyo
          for my BABY.
        </footer>
      </div>
    </>
  );
};

export default Body;
