"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";

export default function CustomButton() {
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  const baseStyle = `px-4 py-2 font-bold border text-white border-white/5 transition-all duration-300 ease-in-out transform bg-[#1F1F21] ${
    isConnected ? "border-red-500" : "border-[#015FF9]"
  } animate focus:outline-none`;

  if (isConnected)
    return (
      <div className="space-x-[12px] flex items-center">
        <button onClick={() => disconnect()} className={baseStyle}>
          Disconnect
        </button>
      </div>
    );

  return (
    <button onClick={() => open()} className={baseStyle}>
      Connect Wallet
    </button>
  );
}
