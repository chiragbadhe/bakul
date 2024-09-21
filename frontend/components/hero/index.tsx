import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="container mx-auto ">
      <div className="flex items-center justify-center flex flex-col mt-[150px]">
        <span className="text-[32px]">
          Welcome to <span className="text-blue-600">Bakul!</span>{" "}
        </span>

        <span className="text-[72px]">Create. Customize. Captivatve</span>

        <span className="max-w-[700px] text-center text-[20px]">
          Bakul is a cutting-edge Web3 solution that seamlessly integrates
          blockchain capabilities into any web environment. Inspired by Solana
          Actions and Blinks, Bakul transforms everyday web interactions into
          dynamic, on-chain experiences, making decentralized technology more
          accessible and intuitive for users.
        </span>

        <div className="flex space-x-[14px] mt-[35px]">
          <Link legacyBehavior href="/select-blinks" passHref>
            <a className="px-[42px] py-[12px] border-blue-500 border-2 hover:bg-blue-600/40 text-[18px]  text-white">
              Go To App
            </a>
          </Link>
          <Link legacyBehavior href="/community" passHref>
            <a className="px-[42px] py-[12px]  text-[18px] duration-200 hover:bg-blue-600/40 border-2 border-white text-white">
              Community
            </a>
          </Link>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Hero;
