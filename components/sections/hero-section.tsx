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
    <section id="hero" className="w-full min-h-screen flex flex-col gap-12 items-center justify-center">
      <h1 className="text-7xl font-semibold my-4">
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
      <p className="text-center text-lg md:text-xl text-gray-700 max-w-4xl leading-relaxed">
        {description}
      </p>
      <SocialLink />
      <Link href={"#about-me"} className="absolute bottom-0 p-2 border border-black rounded-full hover:bg-black hover:text-white animate-bounce">
        <FaArrowDown size={16} className="text-black hover:text-white" />
      </Link>
    </section>
  )
}

export default HeroSection;
