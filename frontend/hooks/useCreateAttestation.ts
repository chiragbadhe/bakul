import { useState } from "react";
import { SignProtocolClient, SpMode, EvmChains } from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";

// Hook to create an attestation
export const useCreateAttestation = (privateKey: string) => {
  const [attestationId, setAttestationId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");

  // Initialize the client
  const client = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.sepolia,
    account: privateKeyToAccount(privateKey as any),
  });

  // Function to create an attestation
  const createAttestation = async (blinkHash: string) => {
    try {
      const createAttestationRes = await client.createAttestation({
        schemaId: "0x284", // Default schemaId if not provided
        data: {
          user: "0x91Df2C0E91e07b97Cac550dEcf7b5F43266F51EF", // Replace with the actual user address
          blinkHash, // Using the provided blinkHash
          timestamp: new Date().toISOString(), // Current timestamp
        },
        indexingValue: "Blink Attestation",
      });
      setAttestationId(createAttestationRes.attestationId);
      setStatus("Attestation created successfully.");
    } catch (error) {
      console.error(error);
      setStatus("Failed to create attestation.");
    }
  };

  return { createAttestation, attestationId, status };
};


//https://testnet-scan.sign.global/attestation/onchain_evm_11155111_0x35e
