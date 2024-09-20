import React from "react";
import Link from "next/link"; // Import Link from Next.js for navigation
import VerifyWorldcoin from "../verifyWorldcoin";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

const Header = () => {
  return (
    <div className="w-full border-b border-white/10 h-full bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10">
      <header className="w-full py-4 flex justify-between items-center container mx-auto">
        <div className="flex items-center justify-center">
          <Link legacyBehavior href="/" passHref>
            <a>
              <img
                src="/noadz-shape-dotted.svg"
                alt="logo"
                className="w-12 h-12 mr-2"
              />
            </a>
          </Link>
          <div className="hidden sm:inline text-[28px] font-normal">
            <Link legacyBehavior href="/" passHref>
              <a>Bakul</a>
            </Link>
          </div>
        </div>
        <div className="flex space-x-[12px]">
          <Link legacyBehavior href="/" passHref>
            <a>Home</a>
          </Link>
          <Link legacyBehavior href="/community" passHref>
            <a>Community</a>
          </Link>
          <Link legacyBehavior href="/select-blinks" passHref>
            <a>Discover</a>
          </Link>
          <Link
            legacyBehavior
            href="https://github.com/chiragbadhe/Bakul"
            passHref
          >
            <a target="_blank" rel="noopener noreferrer">
              Repo
            </a>
          </Link>
        </div>
        <div className="flex items-center space-x-[12px]">
          <div className="border border-blue-600 z-50">
            <DynamicWidget />
          </div>

          <div className="px-4 py-2 font-bold border text-white border-white/5 transition-all duration-300 ease-in-out transform bg-[#1F1F21]">
            <VerifyWorldcoin />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
