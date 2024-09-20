"use client"; // for Next.js app router
import {
  IDKitWidget,
  VerificationLevel,
  ISuccessResult,
} from "@worldcoin/idkit";
import { useCallback } from "react";

const verifyProof = async (proof: any) => {
  throw new Error("TODO: verify proof server route");
};

// TODO: Functionality after verifying
const onSuccess = () => {
  console.log("Success");
};

export default function VerifyWorldcoin() {
  return (
    <IDKitWidget
      app_id={process.env.WORLDCOIN_APP_ID as `app_${string}`} // obtained from the Developer Portal
      action={process.env.WORLDCOIN_ACTION_ID as string} // obtained from the Developer Portal
      verification_level={VerificationLevel.Device}
      handleVerify={verifyProof}
      onSuccess={onSuccess}
    >
      {({ open }) => <button onClick={open}>Verify with World ID</button>}
    </IDKitWidget>
  );
}
