import { useState } from "react";
import { Menu, X, BookOpen, User, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-12 left-0 w-full bg-[#f9fafb] shadow-md text-[#1f2937] z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <BookOpen size={26} className="text-[black]" />
            <span className="text-2xl font-medium text-[black] font-inter tracking-tight">
              EduTech
            </span>
          </a>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-[#2563eb] transition">
              Home
            </Link>
            <Link to="/category" className="hover:text-[#2563eb] transition">
              Categories
            </Link>
            <Link to="/about" className="hover:text-[#2563eb] transition">
              About
            </Link>
            <Link to="/contact" className="hover:text-[#2563eb] transition">
              Contact
            </Link>
          </div>
          {/* Icons Section */}
          <div className="flex items-center space-x-4">
            {/* Profile Icon */}
            <Link to="Profile">
              <button className="text-[#1f2937] hover:text-[#2563eb] transition">
                <User size={23} />
              </button>
            </Link>

            {/* Dot Menu Icon */}
            <button className="text-[#1f2937] hover:text-[#2563eb] transition">
              <MoreVertical size={23} />
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#1f2937] focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-[#f9fafb] border-t border-gray-200 px-6 py-4 space-y-3 text-center shadow-md">
            <Link
              onClick={() => setIsOpen(!isOpen)}
              to="/"
              className="block hover:text-[#2563eb] transition"
            >
              Home
            </Link>
            <Link
              onClick={() => setIsOpen(!isOpen)}
              to="/category"
              className="block hover:text-[#2563eb] transition"
            >
              Categories
            </Link>
            <Link
              onClick={() => setIsOpen(!isOpen)}
              to="/about"
              className="block hover:text-[#2563eb] transition"
            >
              About
            </Link>
            <Link
              onClick={() => setIsOpen(!isOpen)}
              to="/contact"
              className="block hover:text-[#2563eb] transition"
            >
              Contact
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
