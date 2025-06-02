"use client";

export const Header = ({ onContactClick }: { onContactClick: () => void }) => {
  return (
    <div className="flex justify-center items-center fixed top-3 w-full z-10">
      <nav className="flex gape-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur"> 
        <a href="#" className="nav-item">Home</a>
        <a href="#education" className="nav-item">Education</a>
        <a href="#projects" className="nav-item">Projects</a>
        <a href="#about" className="nav-item">About</a>
        <button
          className="nav-item bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900"
          onClick={onContactClick}
        >
          Contact
        </button>
      </nav>
    </div>
  );
};