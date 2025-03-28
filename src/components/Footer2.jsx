import React from "react";
import { Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

function Footer2() {
  return (
    <footer className="foot mt-32 pt-4">
      <div className=" w-full grid grid-cols-3 justify-between px-12 max-sm:grid-cols-1 max-sm:px-6 max-sm:gap-8 ">
        <div>
          <h3 className="text-3xl font-medium overflow-hidden text-[black] font-inter tracking-tight">
            EduTech
          </h3>
          <p className="mt-3 text-start ">Empowering Learning, One Click at a Time.</p>
        </div>
        <div className="flex flex-col justify-center items-center mr-6 max-sm:items-start">
          <div className="space-x-7">
            <a href="#" className="hover:text-[#2563eb] transition ">
              Home
            </a>
            <a href="#" className="hover:text-[#2563eb] transition ">
              Categories
            </a>
            <a href="#" className="hover:text-[#2563eb] transition ">
              About
            </a>
            <a href="#" className="hover:text-[#2563eb] transition ">
              Contact
            </a>
          </div>
          <div className="flex flex-row mt-4 px-4 gap-3 max-sm:gap-3 max-sm:px-1">
            <label
              htmlFor="text"
              className="font-medium text-[black] font-inter tracking-tight text-start"
            >
              NEWSLETTER
            </label>
            <input
              type="text"
              className="border  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="w-full flex flex-col">
          <p className=" font-medium text-[black] font-inter tracking-tight">
            123 EduTech Street, Learning City, LT 45678
          </p>
          <p className="mt-4">
            Email: support@edutech.com | Phone: (123) 456-7890
          </p>
        </div>
      </div>

      <hr className="border mt-14"/>

      <div className="px-12 flex flex-row justify-between items-center py-10 max-sm:px-2 ">
        <p className="max-sm:text-[15px] mt-5">&copy; {new Date().getFullYear()} EduTech. All Rights Reserved.</p>

        <div className="flex space-x-4 mt-4  max-sm:space-x-2">
          <a
            href="#"
            className="hover:text-[#facc15] transition-colors text-lg"
          >
            <Facebook size={24} />
          </a>
          <a
            href="#"
            className="hover:text-[#facc15] transition-colors text-lg"
          >
            <Twitter size={24} />
          </a>
          <a
            href="#"
            className="hover:text-[#facc15] transition-colors text-lg"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="#"
            className="hover:text-[#facc15] transition-colors text-lg"
          >
            <Youtube size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer2;
