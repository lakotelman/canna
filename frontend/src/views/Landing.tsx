import { useEffect } from "react";
import { LandingLayout } from "../layouts/Landing";
function Landing() {
   
  return (
    <>
      <nav className="flex items-center md:justify-center mx-auto container p-6 gap-10 justify-between">
        <div className="hidden md:block">
          <a
            href="#"
            className="hidden mt-8 w-40 justify-center rounded-full p-2 text-black md:flex items-center hover:bg-lightPink bg-lightGreen"
          >
            Login
          </a>
        </div>

        <div className="">
          <img
            className="w-52"
            src="cannalogo(1).webp"
            alt="logo of word 'canna'"
          />
        </div>

        <div className="hidden md:block">
          <a
            href="#"
            className="hidden mt-8 w-40 justify-center rounded-full p-2 text-black md:flex items-center hover:bg-lightPink bg-lightOrange"
          >
            Register
          </a>
        </div>
        {/* <!---Small Screen Navigation --> */}
        <div
          className="burger md:hidden w-12 mt-8 cursor-pointer"
          id="burgerMenu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-menu-2"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke="#000000"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </div>
        {/* <!---More Small Screen Navigation: Drop Down--> */}
      </nav>
      <div className="hidden ease-linear" id="navLinks">
        <div className="bg-lightGreen flex flex-col items-end">
          <a
            href="#"
            className="w-40 p-4 text-black text-right hover:bg-lightPink"
          >
            Register
          </a>
          <a
            href="#"
            className="w-40 p-4 text-black text-right hover:bg-lightPink"
          >
            Login
          </a>
        </div>
      </div>
    </>
  );
}

export default function Page() {
  return LandingLayout({ children: Landing() });
}
