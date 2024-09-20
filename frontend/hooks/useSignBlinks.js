import { useState } from "react";
import { SignProtocolClient, SpMode, EvmChains } from "@ethsign/sp-sdk";
import { BrowserProvider, Contract, ethers } from "ethers";

export const useAttestUserBlink = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const attest = async (blinkHash) => {
    setLoading(true);
    setError(null);

    if (!blinkHash) {
      setError("Blink hash is required.");
      setLoading(false);
      return;
    }

    try {
      // Check if Ethereum is available in window object
      if (!window.ethereum) {
        throw new Error("Please install MetaMask.");
      }

      // Create a new provider instance using Ethers.js
      const provider = new BrowserProvider(window.ethereum);

      // Get connected user's account
      const accounts = await provider.send("eth_requestAccounts", []);
      const userAddress = accounts[0]; // Get the first account (user's address)

      if (!userAddress) {
        throw new Error("User address is missing.");
      }

      // Create a signer from the provider
      const signer = provider.getSigner();

      // Initialize Sign Protocol client using the connected user's wallet
      const client = new SignProtocolClient(SpMode.OnChain, {
        chain: EvmChains.sepolia, // Set the appropriate chain (Sepolia in this case)
        signer, // Use the signer for signing
      });

      const addr = "0x91Df2C0E91e07b97Cac550dEcf7b5F43266F51EF";
      // Create Attestation for Blink using Blink Hash
      const signAttestationResult = await client.createAttestation({
        schemaId: "0x246", // Replace with correct schema ID for Blinks
        data: {
          user: addr, // The connected user's address
          blinkHash: blinkHash, // Hash of the Blink content
          timestamp: new Date().toISOString(), // Add optional metadata (timestamp)
        },
        indexingValue: addr.toLowerCase(), // Index using user address
      });

      console.log(signAttestationResult);

      // Output result for logging
      console.log("Blink Attestation Result with Hash:", signAttestationResult);
    } catch (err) {
      setError(err.message || "An error occurred during attestation.");
    } finally {
      setLoading(false);
    }
  };

  return { attest, loading, error };
};
