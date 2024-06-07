"use client";
import Image from "next/image";
import { BsIncognito } from "react-icons/bs";
import { useState, ChangeEvent, FormEvent } from 'react';
import { FlipWords } from "../components/ui/flip-words"; // Ensure this path is correct
import { GoogleGeminiEffect } from "../components/ui/google-gemini-effect";
import React from "react";
import { useScroll, useTransform } from "framer-motion";

function FlipWordsDemo() {
  const words = ["phishing", "malicious", "fake", "unsecure"];

  return (
    <div className="relative px-3 z-10 align-text-bottom">
      <div className="text-3xl font-normal text-cyan-600">
        Stay safe from <FlipWords className="text-slate-50" words={words} /><br />
        websites with Phishing Detector
      </div>
    </div>
  );
}

const AboutUs = ({ onGoBack }: { onGoBack: () => void }) => {
  return (
    <div className="relative w-screen h-screen">
      <div className="absolute flex justify-start items-center gap-2 text-3xl pt-4 pl-4 hover:animate-pulse cursor-pointer z-10">
        <BsIncognito />
        <h1 className="text-blue-300">Phishing Website Detection</h1>
      </div>
      
      <button
        className="relative z-10 float-end mr-5 mt-3 text-xl border border-solid border-slate-50 p-2 rounded-xl hover:bg-white hover:text-black transition-all hover:shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]"
        onClick={onGoBack}
      >
        Go Back
      </button>
      <Image
        className="object-cover z-0"
        src="/images/background.jpg"
        alt="background image"
        fill
        objectFit="cover"
      />
    </div>
  );
};

export function GoogleGeminiEffectDemo() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target:ref,
    offset: ["start start", "end start"],
  });
 
  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);
 
  return (
    <div
      className="h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md pt-40 overflow-clip"
      ref={ref}
    >
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />
    </div>
  );
}

export default function Home() {
  const [value, setValue] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [showAboutUs, setShowAboutUs] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/checkPhishing.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: value }),
      });

      const data = await response.json();
      setApiResponse(data.result);
    } catch (error) {
      console.error('Error:', error);
      setApiResponse('An error occurred while checking the URL.');
    }
  };

  if (showAboutUs) {
    return <AboutUs onGoBack={() => setShowAboutUs(false)} />;
  }

  return (
    <div className="relative w-screen h-screen">
      <div className="absolute flex justify-start items-center gap-2 text-3xl pt-4 pl-4 hover:animate-pulse cursor-pointer z-10">
        <BsIncognito />
        <h1 className="text-blue-300">Phishing Website Detection</h1>
      </div>
      <button
        className="relative z-10 float-end mr-5 mt-3 text-xl border border-solid border-slate-50 p-2 rounded-xl hover:bg-white hover:text-black transition-all hover:shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]"
        onClick={() => setShowAboutUs(true)}
      >
        About Us
      </button>
      <hr />
      <div className="items-center flex justify-center pt-[20rem]">
        <form className="items-center text-center" onSubmit={handleSubmit}>
          <label className="z-10 relative text-xl text-center items-center m-3">Enter the URL</label>
          <input
            className="w-[14rem] relative z-10 items-center text-center rounded-lg h-8 border-2 border-indigo-600 text-slate-950 hover:shadow-[5px_5px_0px_0px_rgba(109,40,217)] transition-all"
            type="url"
            placeholder="Enter the URL"
            value={value}
            onChange={handleChange}
          />
          <br />
          <button
            className="relative z-10 inline-flex items-center justify-center p-0.5 mt-6 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            type="submit"
          >
            <span className="relative px-5 py-2.5 transition-all text-lg ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Enter
            </span>
          </button>
        </form>
      </div>
      {apiResponse && (
        <div className="relative z-10 text-center mt-6 text-lg">
          {apiResponse}
        </div>
      )}
      <div className="absolute bottom-10">
        <FlipWordsDemo />
      </div>
      <div className="relative z-10 align-middle text-center">
      </div>

      <Image
        className="object-cover z-0"
        src="/images/background.jpg"
        alt="background image"
        fill
        objectFit="cover"
      />
    </div>
  );
}
