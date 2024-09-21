"use client";
import { useState } from "react";
import { SignProtocolClient, SpMode, EvmChains } from "@ethsign/sp-sdk";
import { ethers } from "ethers";
import { privateKeyToAccount } from "viem/accounts";

const AttestPage = () => {
  const [blinkHash, setBlinkHash] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAttest = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const privateKey = process.env.NEXT_PUBLIC_OPERATOR_ACCOUNT_PRIVATE_KEY;
      const adminWallet = privateKeyToAccount(privateKey as any);
      const client = new SignProtocolClient(SpMode.OnChain, {
        chain: EvmChains.sepolia,
        account: adminWallet,
      });

      const signAttestationResult = await client.createAttestation({
        schemaId: "0x246",
        data: {
          user: "0x91Df2C0E91e07b97Cac550dEcf7b5F43266F51EF",
          blinkHash,
          timestamp: new Date().toISOString(),
        },
        indexingValue: "0x91Df2C0E91e07b97Cac550dEcf7b5F43266F51EF",
      });

      console.log("Blink Attestation Result:", signAttestationResult);
      setSuccess("Attestation completed successfully!");
    } catch (err: any) {
      setError(err.message || "An error occurred during attestation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Attest User Blink</h1>

      <input
        type="text"
        value={blinkHash}
        onChange={(e) => setBlinkHash(e.target.value)}
        placeholder="Enter Blink Hash"
        className="border px-4 py-2 mb-4 w-full"
      />

      <button
        onClick={handleAttest}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Attesting..." : "Submit Blink Attestation"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
};

export default AttestPage;
