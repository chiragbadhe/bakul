import { type IVerifyResponse, verifyCloudProof } from "@worldcoin/idkit";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const proof = req.body;

  // Ensure APP_ID and ACTION_ID are set in the environment
  const app_id = process.env.APP_ID as `app_${string}` | undefined;
  const action = process.env.ACTION_ID;

  // Check if app_id and action are defined, otherwise return an error
  if (!app_id || !action) {
    return res
      .status(500)
      .json({ error: "Missing required environment variables." });
  }

  try {
    const verifyRes = (await verifyCloudProof(
      proof,
      app_id,
      action
    )) as IVerifyResponse;

    if (verifyRes.success) {
      // Backend action on successful verification (e.g., update user in DB)
      res.status(200).send(verifyRes);
    } else {
      // Handle errors from the World ID /verify endpoint (e.g., already verified)
      res.status(400).send(verifyRes);
    }
  } catch (error) {
    res.status(500).json({ error: "Verification failed", details: error });
  }
}
