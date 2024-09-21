"use client";
import {
  Client,
  Hbar,
  PrivateKey,
  AccountId,
  TopicCreateTransaction,
  TopicMessageSubmitTransaction,
} from "@hashgraph/sdk";
import { useState } from "react";

export default function Home() {
  const [topicId, setTopicId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  // Hedera Topic creation logic, triggered only on button click
  const createTopic = async () => {
    console.log("clickled");
    if (isCreating) return; // Prevent multiple clicks while creating the topic
    setIsCreating(true);

    try {
      // Validate environment variables
      const operatorIdStr = process.env.NEXT_PUBLIC_OPERATOR_ACCOUNT_ID;
      const operatorKeyStr =
        process.env.NEXT_PUBLIC_OPERATOR_ACCOUNT_PRIVATE_KEY;

      if (!operatorIdStr || !operatorKeyStr) {
        throw new Error(
          "Must set NEXT_PUBLIC_OPERATOR_ACCOUNT_ID and NEXT_PUBLIC_OPERATOR_ACCOUNT_PRIVATE_KEY environment variables"
        );
      }

      // Hedera operator credentials
      const operatorId = AccountId.fromString(operatorIdStr);
      const operatorKey = PrivateKey.fromStringECDSA(operatorKeyStr);

      // Initialize Hedera Client for testnet
      const client = Client.forTestnet().setOperator(operatorId, operatorKey);

      // Set transaction and query fees
      client.setDefaultMaxTransactionFee(new Hbar(100)); // 100 HBAR
      client.setDefaultMaxQueryPayment(new Hbar(50)); // 50 HBAR

      // Create a new topic with a memo
      const topicCreateTx = await new TopicCreateTransaction()
        .setTopicMemo("Hello From Bakul")
        .freezeWith(client); // Prepare for signing

      // Sign the transaction
      const topicCreateTxSigned = await topicCreateTx.sign(operatorKey);

      // Submit the transaction to Hedera Testnet
      const topicCreateTxSubmitted = await topicCreateTxSigned.execute(client);

      // Get the transaction receipt and topic ID
      const topicCreateTxReceipt = await topicCreateTxSubmitted.getReceipt(
        client
      );
      const topicId = topicCreateTxReceipt.topicId;

      if (!topicId) {
        throw new Error("Failed to retrieve topic ID.");
      }

      // Set the topic ID in the state to display
      setTopicId(topicId.toString());

      console.log("New Topic ID:", topicId.toString());
    } catch (error) {
      console.error("Error creating topic:", error);
      setErrorMessage("err");
    } finally {
      setIsCreating(false); // Reset to allow future clicks
    }
  };

  const submitMessageToTopic = async (
    client: Client,
    topicId: string,
    message: string,
    operatorKey: PrivateKey
  ) => {
    try {
      const topicMsgSubmitTx = await new TopicMessageSubmitTransaction()
        .setTransactionMemo(
          `Hello Future World topic message - ${new Date().toISOString()}`
        )
        .setTopicId(topicId) // Use the created topic ID
        .setMessage(message) // Set the message content
        .freezeWith(client); // Prepare for signing

      // Get the transaction ID
      const topicMsgSubmitTxSigned = await topicMsgSubmitTx.sign(operatorKey);
      const topicMsgSubmitTxSubmitted = await topicMsgSubmitTxSigned.execute(
        client
      );

      // Transaction ID of the message submission
      const topicMsgSubmitTxId = topicMsgSubmitTxSubmitted.transactionId;

      console.log("Message submitted with transaction ID:", topicMsgSubmitTxId);
    } catch (error) {
      console.error("Error submitting message:", error);
      throw error;
    }
  };

  return (
    <div>
      <h1>HCS Topic Creator</h1>

      {topicId ? (
        <p>The new topic ID is: {topicId}</p>
      ) : errorMessage ? (
        <p>Error: {errorMessage}</p>
      ) : (
        <button onClick={createTopic} disabled={isCreating}>
          {isCreating ? "Creating..." : "Create Topic"}
        </button>
      )}
    </div>
  );
}
