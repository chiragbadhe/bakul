"use client"; // for Next.js app router
import { verify } from "@/actions/verify";
import {
  IDKitWidget,
  VerificationLevel,
  ISuccessResult,
  verifyCloudProof,
  IVerifyResponse,
  useIDKit,
} from "@worldcoin/idkit";

const app_id = process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID as `app_${string}`;
const action = process.env.NEXT_PUBLIC_WORLDCOIN_ACTION_ID;

if (!app_id) {
  throw new Error("app_id is not set in environment variables!");
}
if (!action) {
  throw new Error("action is not set in environment variables!");
}

const OnSuccess = (result: ISuccessResult) => {
  // This is where you should perform frontend actions once a user has been verified, such as redirecting to a new page
  window.alert(
    "Successfully verified with World ID! Your nullifier hash is: " +
      result.nullifier_hash
  );
};

const handleProof = async (result: ISuccessResult) => {
  console.log(
    "Proof received from IDKit, sending to backend:\n",
    JSON.stringify(result)
  ); // Log the proof from IDKit to the console for visibility
  const data = await verify(result);
  if (data.success) {
    console.log("Successful response from backend:\n", JSON.stringify(data)); // Log the response from our backend for visibility
  } else {
    console.log(data);

    throw new Error(`Verification failed: ${data.detail}`);
  }
};

export default function VerifyWorldcoin() {
  return (
    <IDKitWidget
      app_id={process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID as `app_${string}`} // obtained from the Developer Portal
      action={process.env.NEXT_PUBLIC_WORLDCOIN_ACTION_ID as string} // obtained from the Developer Portal
      verification_level={VerificationLevel.Device}
      handleVerify={handleProof}
      onSuccess={OnSuccess}
    >
      {({ open }) => <button onClick={open}>Verify with World ID</button>}
    </IDKitWidget>
  );
}
