"use client";
import { useState } from "react";

export const Header = ({
  onContactClick,
  isSubPage = false
}: {
  onContactClick: () => void,
  isSubPage?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center items-center fixed top-3 w-full z-50 px-4 md:px-0">
      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur">
        <a href={isSubPage ? "/" : "#"} className="nav-item">Home</a>
        <a href={isSubPage ? "/#about" : "#about"} className="nav-item">About</a>
        <a href={isSubPage ? "/#tech-stack" : "#tech-stack"} className="nav-item">Tech Stack</a>
        <a href={isSubPage ? "/#education" : "#education"} className="nav-item">Education</a>
        <a href={isSubPage ? "/#projects" : "#projects"} className="nav-item">Projects</a>
        <button
          className="nav-item bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900"
          onClick={onContactClick}
        >
          Contact
        </button>
      </nav>

      {/* Mobile Hamburger Button */}
      <div className="md:hidden flex w-full justify-end">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 border border-white/15 rounded-full bg-white/10 backdrop-blur text-white flex items-center justify-center size-12"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <nav className="absolute top-16 right-4 flex flex-col gap-2 p-2 border border-white/15 rounded-2xl bg-gray-900/95 backdrop-blur shadow-2xl md:hidden w-48 z-50">
          <a href={isSubPage ? "/" : "#"} onClick={() => setIsOpen(false)} className="nav-item w-full text-left">Home</a>
          <a href={isSubPage ? "/#about" : "#about"} onClick={() => setIsOpen(false)} className="nav-item w-full text-left">About</a>
          <a href={isSubPage ? "/#tech-stack" : "#tech-stack"} onClick={() => setIsOpen(false)} className="nav-item w-full text-left">Tech Stack</a>
          <a href={isSubPage ? "/#education" : "#education"} onClick={() => setIsOpen(false)} className="nav-item w-full text-left">Education</a>
          <a href={isSubPage ? "/#projects" : "#projects"} onClick={() => setIsOpen(false)} className="nav-item w-full text-left">Projects</a>
          <button
            className="nav-item bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900 w-full text-left"
            onClick={() => {
              setIsOpen(false);
              onContactClick();
            }}
          >
            Contact
          </button>
        </nav>
      )}
    </div>
  );
};