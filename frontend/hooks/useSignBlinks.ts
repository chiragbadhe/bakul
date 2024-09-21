import { useState } from "react";
import { SignProtocolClient, SpMode, EvmChains } from "@ethsign/sp-sdk";
import { ethers } from "ethers";
import { privateKeyToAccount } from "viem/accounts";

export const useAttestUserBlink = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const attest = async (blinkHash: string) => {
    setLoading(true);
    setError(null);

    if (!blinkHash) {
      setError("Blink hash is required.");
      setLoading(false);
      return;
    }

    try {
      // Ensure private key is defined
      const privateKey = process.env.NEXT_PUBLIC_OPERATOR_ACCOUNT_PRIVATE_KEY;
      if (!privateKey) {
        throw new Error(
          "Operator private key is missing from environment variables."
        );
      }

      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error("Please install MetaMask.");
      }

      // Initialize provider with ethers
      const provider = new ethers.BrowserProvider(window.ethereum);

      // Request user accounts from MetaMask
      const accounts = await provider.send("eth_requestAccounts", []);
      const userAddress = accounts[0]; // Get the first account (user's address)

      if (!userAddress) {
        throw new Error("User address is missing.");
      }

      // Create a signer from the provider
      const signer = provider.getSigner();

      // Initialize Sign Protocol client
      const client = new SignProtocolClient(SpMode.OnChain, {
        chain: EvmChains.sepolia, // Sepolia Testnet
        account: privateKeyToAccount(privateKey as `0x${string}`), // Cast to the expected type
      });

      console.log(client);

      try {
        const addr = "0x91Df2C0E91e07b97Cac550dEcf7b5F43266F51EF"; // Example user address
        // Create attestation for Blink
        const signAttestationResult = await client.createAttestation({
          schemaId: "0x246", // Replace with your schema ID
          data: {
            user: addr, // The connected user's address
            blinkHash, // Blink content hash
            timestamp: "tets", // Metadata (timestamp)
          },
          indexingValue: addr, // Index using the user's address
        });

        console.log("Blink Attestation Result:", signAttestationResult);
      } catch (err) {
        console.log(err);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during attestation.");
    } finally {
      setLoading(false);
    }
  };

  return { attest, loading, error };
};
