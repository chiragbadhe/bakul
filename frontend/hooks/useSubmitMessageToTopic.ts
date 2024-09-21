import {
  Client,
  TopicMessageSubmitTransaction,
  PrivateKey,
  AccountId,
} from "@hashgraph/sdk";
import { useState } from "react";

// Custom hook to handle message submission to a Hedera Consensus Service topic
export const useSubmitMessageToTopic = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txId, setTxId] = useState<string | null>(null);

  // Helper function to load Hedera operator credentials
  const getOperatorCredentials = () => {
    const operatorIdStr = process.env.NEXT_PUBLIC_OPERATOR_ACCOUNT_ID;
    const operatorKeyStr = process.env.NEXT_PUBLIC_OPERATOR_ACCOUNT_PRIVATE_KEY;
    const topicId = process.env.NEXT_PUBLIC_BAKUL_TOPIC_ID;

    if (!operatorIdStr || !operatorKeyStr || !topicId) {
      throw new Error(
        "NEXT_PUBLIC_OPERATOR_ACCOUNT_ID, NEXT_PUBLIC_OPERATOR_ACCOUNT_PRIVATE_KEY, and NEXT_PUBLIC_BAKUL_TOPIC_ID must be set in environment variables."
      );
    }

    return {
      operatorId: AccountId.fromString(operatorIdStr),
      operatorKey: PrivateKey.fromStringECDSA(operatorKeyStr),
      topicId,
    };
  };

  // Function to submit a message to a specific topic
  const submitMessage = async (message: string) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const { operatorId, operatorKey, topicId } = getOperatorCredentials();

      // Initialize Hedera Client for testnet
      const client = Client.forTestnet().setOperator(operatorId, operatorKey);

      // Create and sign a transaction to submit a message
      const topicMsgSubmitTx = new TopicMessageSubmitTransaction()
        .setTransactionMemo(`Message submission - ${new Date().toISOString()}`)
        .setTopicId(topicId)
        .setMessage(message)
        .freezeWith(client);

      // Sign and execute the transaction
      const signedTx = await topicMsgSubmitTx.sign(operatorKey);
      const result = await signedTx.execute(client);

      // Get the transaction ID
      const transactionId = result.transactionId.toString();
      setTxId(transactionId);

      console.log(
        "Message submitted successfully with transaction ID:",
        transactionId
      );

      return transactionId;
    } catch (err: any) {
      console.error("Error submitting message:", err);
      setError(err.message || "An unknown error occurred.");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, error, txId, submitMessage };
};
