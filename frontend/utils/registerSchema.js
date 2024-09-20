import { SignProtocolClient, SpMode, EvmChains } from "@ethsign/sp-sdk";
import { ethers } from "ethers";

// Register the schema using the Sign Protocol Client
export async function registerSchema(provider) {
  const signer = provider.getSigner();

  const client = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.sepolia,
    signer,
  });

  const schema = {
    schemaId: "0x1a6", // Unique schema ID
    name: "Blink Attestation",
    description: "Schema for Blink attestation",
    properties: {
      user: {
        type: "string",
        description: "Address of the user attesting the blink",
      },
      blinkHash: {
        type: "string",
        description: "Hash of the Blink content",
      },
      timestamp: {
        type: "string",
        format: "date-time",
        description: "Timestamp of the attestation",
      },
    },
    required: ["user", "blinkHash", "timestamp"],
  };

  const schemaRegistrationResult = await client.createSchema(schema);
  console.log("Schema Registration Result:", schemaRegistrationResult);
}

//https://testnet-scan.sign.global/schema/onchain_evm_11155111_0x246