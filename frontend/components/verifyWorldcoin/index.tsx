"use client"; // for Next.js app router
import {
  IDKitWidget,
  VerificationLevel,
  ISuccessResult,
  verifyCloudProof,
  IVerifyResponse,
} from "@worldcoin/idkit";
import { useCallback } from "react";

const verifyProof = async (proof: any): Promise<void> => {
  console.log("Verifying proof...");

  const app_id = process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID as
    | `app_${string}`
    | undefined;
  const action = process.env.NEXT_PUBLIC_WORLDCOIN_ACTION_ID;

  // Check if app_id and action are defined, otherwise log an error
  if (!app_id || !action) {
    console.error("App ID and Action ID are required");
    throw new Error("App Id Need");
  }

  try {
    const verifyRes = (await verifyCloudProof(
      proof,
      app_id,
      action
    )) as IVerifyResponse;

    if (verifyRes.success) {
      console.log("Verification successful:", verifyRes);
    } else {
      console.warn("Verification failed:", verifyRes);
    }
  } catch (error) {
    console.error("Error during verification:", error);
    throw new Error("Verification failed");
  }
};

const onSuccess = () => {
  console.log("Success");
};

export default function VerifyWorldcoin() {
  return (
    <IDKitWidget
      app_id={process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID as `app_${string}`} // obtained from the Developer Portal
      action={process.env.NEXT_PUBLIC_WORLDCOIN_ACTION_ID as string} // obtained from the Developer Portal
      verification_level={VerificationLevel.Device}
      handleVerify={verifyProof}
      onSuccess={onSuccess}
    >
      {({ open }) => <button onClick={open}>Verify with World ID</button>}
    </IDKitWidget>
  );
}
