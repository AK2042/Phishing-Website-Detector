"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = new Array(20).fill(1); // Adjusted to fit the screen better
  const cols = new Array(20).fill(1); // Adjusted to fit the screen better
  const colors = [
    "--sky-300",
    "--pink-300",
    "--green-300",
    "--yellow-300",
    "--red-300",
    "--purple-300",
    "--blue-300",
    "--indigo-300",
    "--violet-300",
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      style={{
        overflow: "hidden", // Ensure no scroll
        background: "none", // Ensure no background color
        display: "grid",
        gridTemplateRows: `repeat(${rows.length}, 1fr)`,
        gridTemplateColumns: `repeat(${cols.length}, 1fr)`,
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
      }}
      className={cn(
        "z-0",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        cols.map((_, j) => (
          <motion.div
            whileHover={{
              backgroundColor: `var(${getRandomColor()})`,
              transition: { duration: 0 },
            }}
            animate={{
              transition: { duration: 2 },
            }}
            key={`col` + j + `row` + i}
            className="w-full h-full relative"
          >
            {j % 2 === 0 && i % 2 === 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="absolute h-0 w-0 -top-[14px] -left-[22px] text-slate-700 stroke-[1px] pointer-events-none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m6-6H6"
                />
              </svg>
            ) : null}
          </motion.div>
        ))
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
