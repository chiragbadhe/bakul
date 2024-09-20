"use client"
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { registerSchema } from "../../utils/registerSchema";
import { BrowserProvider } from "ethers";

export default function Home() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);

  // Initialize provider (MetaMask or any injected provider)
  useEffect(() => {
    if (window.ethereum) {
      const newProvider = new BrowserProvider(window.ethereum);
      setProvider(newProvider);
    }
  }, []);

  const handleRegisterSchema = async () => {
    if (provider) {
      try {
        await provider.send("eth_requestAccounts", []); // Request account access
        await registerSchema(provider); // Call the registerSchema function
      } catch (error) {
        console.error("Error registering schema:", error);
      }
    } else {
      console.error("No provider found");
    }
  };

  return (
    <div>
      <h1>Sign Protocol Schema Registration</h1>
      <button onClick={handleRegisterSchema}>Register Schema</button>
    </div>
  );
}
