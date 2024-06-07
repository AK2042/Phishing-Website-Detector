"use client";
import React from "react";
import { HoverBorderGradient } from "./components/ui/hover-border-gradient";
import Link from "next/link";
import Home from "./components/ui/Home";
import { GoogleGeminiEffect } from "./components/ui/google-gemini-effect";
import { useScroll, useTransform } from "framer-motion";

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
export default function BackgroundBoxesDemo() {
  return (
    <>
    <h1 className="text-2xl relative z-10 cursor-pointer"><Home /></h1>
    <br />
    <div>
        <GoogleGeminiEffectDemo />
    </div>
    <div className="flex justify-center p-5 m-10 transition-all">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className=" border-2 border-black bg-white hover:bg-black hover:text-white  text-black items-center space-x-2 relative text-center z-10 w-[5rem]"
          >
            <Link href="/Start">
              <span className="font-bold">Start</span>
            </Link>
          </HoverBorderGradient>
          </div>
      <hr />
      
            
    </>
  );
}
