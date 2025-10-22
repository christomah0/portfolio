"use client";

import { useEffect, useState } from "react";
import SocialLink from "../social-link";
import { FaArrowDown } from "react-icons/fa6";
import Link from "next/link";

const title = "Software Developer";
const description = `
  Ready to build something great? I'm a software developer with a knack for creating fast, responsive, and user-friendly applications. 
  Let's connect and discuss how my skills can help you achieve your project goals.
`;
const ANIMATION_DURATION = 0.5; // seconds per character
const ANIMATION_DELAY = 0.1; // seconds between each character

const HeroSection = () => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const totalDuration = ANIMATION_DURATION + ANIMATION_DELAY * (title.length - 1);
    const interval = setInterval(() => {
      setKey(k => k + 1);
    }, totalDuration * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="w-full min-h-screen flex flex-col gap-6 sm:gap-8 items-center justify-center px-4 py-8 md:py-12">
      <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold my-2 text-center leading-tight">
        {title.split("").map((char, index) => (
          <span
            key={key + "-" + index}
            style={{ animationDelay: `${index * ANIMATION_DELAY}s` }}
            className="animate-show"
          >
            {char}
          </span>
        ))}
      </h1>
      <p className="text-center text-sm sm:text-base md:text-lg text-gray-700 max-w-xl sm:max-w-2xl leading-relaxed">
        {description}
      </p>
      <SocialLink />
      <Link href={"#about-me"} className="fixed bottom-6 sm:bottom-8 p-2 border border-black rounded-full hover:bg-black hover:text-white">
        <FaArrowDown size={14} className="text-black hover:text-white" />
      </Link>
    </section>
  )
}

export default HeroSection;
