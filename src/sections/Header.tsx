"use client";

export const Header = ({ 
  onContactClick, 
  isSubPage = false 
}: { 
  onContactClick: () => void,
  isSubPage?: boolean 
}) => {
  return (
    <div className="flex justify-center items-center fixed top-3 w-full z-10">
      <nav className="flex gape-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur"> 
        <a href={isSubPage ? "/" : "#"} className="nav-item">Home</a>
        <a href={isSubPage ? "/#education" : "#education"} className="nav-item">Education</a>
        <a href={isSubPage ? "/#projects" : "#projects"} className="nav-item">Projects</a>
        <a href={isSubPage ? "/#about" : "#about"} className="nav-item">About</a>
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