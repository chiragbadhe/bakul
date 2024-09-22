"use client";
import { useState } from "react";
import {
  SignProtocolClient,
  SpMode,
  EvmChains,
  delegateSignAttestation,
  delegateSignRevokeAttestation,
  delegateSignSchema,
} from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";

const BlockchainComponent = () => {
  const [schemaId, setSchemaId] = useState<string | null>(null);
  const [attestationId, setAttestationId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");

  // Replace with actual private keys
  const privateKey = process.env.NEXT_PUBLIC_OPERATOR_ACCOUNT_PRIVATE_KEY; // Optional
  const delegationPrivateKey = "0xaaaaa"; // Delegation key

  // Initialize SignProtocolClient
  const client = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.sepolia,
    account: privateKeyToAccount(privateKey as any),
  });

  // Create Schema
  const createSchema = async () => {
    try {
      const createSchemaRes = await client.createSchema({
        name: "Blink Attestation",
        description: "Schema for Blink attestation",
        data: [
          { name: "user", type: "string", description: "Address of the user attesting the blink" },
          { name: "blinkHash", type: "string", description: "Hash of the Blink content" },
          { name: "timestamp", type: "string", format: "date-time", description: "Timestamp of the attestation" },
        ],
      });
      setSchemaId(createSchemaRes.schemaId);
      setStatus("Schema created successfully.");
    } catch (error) {
      console.error(error);
      setStatus("Failed to create schema.");
    }
  };

  // Create Attestation
  const createAttestation = async () => {
    try {
      const createAttestationRes = await client.createAttestation({
        schemaId: schemaId || "0x1a6", // Use created schemaId or default
        data: {
          user: "0x123456789", // Replace with actual user address
          blinkHash: "0xabc123", // Replace with actual blink content hash
          timestamp: new Date().toISOString(),
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

  return (
    <div>
      <h1>Blockchain Operations</h1>
      <p>Status: {status}</p>

      <button onClick={createSchema}>Create Schema</button>
      <button onClick={createAttestation}>Create Attestation</button>

      {schemaId && <p>Schema ID: {schemaId}</p>}
      {attestationId && <p>Attestation ID: {attestationId}</p>}
    </div>
  );
};

export default BlockchainComponent;
