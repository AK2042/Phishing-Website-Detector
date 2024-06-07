"use client";
import Image from "next/image";
import { BsIncognito } from "react-icons/bs";
import { SetStateAction, useState } from 'react';
import { FlipWords } from "../components/ui/flip-words"; // Ensure this path is correct

function FlipWordsDemo() {
  const words = ["phishing", "malicious", "fake", "unsecure"];

  return (
    <div className="relative px-3 z-10 align-text-bottom">
      <div className="text-3xl font-normal text-cyan-600 dark:text-cyan-200">
        Stay safe from <FlipWords words={words} /> <br />
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
        alt="an image"
        layout="fill"
      />
    </div>
  );
};

export default function Home() {
  const [value, setValue] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [showAboutUs, setShowAboutUs] = useState(false);

  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const response = await fetch('http://10.10.2.131:8080/api/check-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: value }),
    });

    const data = await response.json();
    console.log(data);  // Log the response to the console for debugging

    // Update the state to display the response on the webpage
    setApiResponse(data.message); // Assuming 'message' is the key in the JSON response
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
            onClick={() => setValue("")}
          >
            <span className="relative px-5 py-2.5 transition-all text-lg ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Enter
            </span>
          </button>
        </form>
      </div>
      <div className="absolute bottom-10">
        <FlipWordsDemo />
      </div>
      <div className="relative z-10 align-middle text-center">
        {/* Display the response message */}
        {apiResponse && <p>{apiResponse}</p>}
      </div>

      <Image
        className="object-cover z-0"
        src="/images/background.jpg"
        alt="an image"
        layout="fill"
      />
    </div>
  );
}
