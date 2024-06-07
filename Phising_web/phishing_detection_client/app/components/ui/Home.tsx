
import React from "react";
import { TypewriterEffectSmooth } from "./typewriter-effect";
import { useScroll, useTransform } from "framer-motion";
import { GoogleGeminiEffect } from "../ui/google-gemini-effect";

  const words = [
    {
      text: "Developed",
      className: " text-5 text-white dark:text-blue-500"
    },
    {
      text: "by",
      className: " text-5 text-white dark:text-blue-500"
    },
    {
      text: "the",
      className: " text-5 text-white dark:text-blue-500"
    },
    {
      text: "minds",
      className: " text-5 text-white dark:text-blue-500"
    },
    {
      text: "of",
      className: " text-5 text-white dark:text-blue-500"
    },
    {
      text: "Team",
      className: " text-5 text-white dark:text-blue-500"
    },
    {
      text: "Domain Masters.",
      className: " text-5 text-blue-500 dark:text-blue-500",
    },
  ];




export default function Home() {
  return (
    <div className="bg-black text-white h-[15rem] p-10">
      <main className="items-center">
        <h1 className="text-5xl font-bold">
          <span className="flex justify-center p-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Welcome to phishing link detector
          </span>
        </h1>
        <br />
        <div className="flex justify-center">
        <TypewriterEffectSmooth words={words} />
        </div>
        <br />
      </main>
      
    </div>
  )
}