"use client";

import { useState } from "react";
import { NavLink } from "./nav-link";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/60 backdrop-blur-md w-full z-[99] border-b border-white/20 shadow">
      <nav className="container mx-auto flex items-center justify-between h-14 px-4">
        <a href="/" className="text-sm sm:text-base font-medium border border-black px-2 py-1 rounded transition hover:bg-black hover:text-white">
          christomah0
        </a>

        {/* Desktop links */}
        <div className="hidden md:block">
          <NavLink />
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          className="md:hidden p-2 rounded focus:outline-none focus:ring"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {open ? (
              <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <>
                <path d="M3 7h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M3 17h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile overlay menu */}
      {open && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setOpen(false)}>
          <div className="absolute right-4 top-16 bg-white rounded-lg shadow-lg p-4 w-[90%] max-w-xs" onClick={(e) => e.stopPropagation()}>
            <NavLink vertical onClick={() => setOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
