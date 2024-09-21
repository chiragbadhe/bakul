"use client"
import React, { useState } from "react";
import { useSubmitMessageToTopic } from "@/hooks/useSubmitMessageToTopic";

const SubmitMessageComponent = () => {
  const [message, setMessage] = useState<string>("");
  const { isSubmitting, error, txId, submitMessage } = useSubmitMessageToTopic();

  const handleSubmit = async () => {
    if (message.trim() === "") {
      alert("Please enter a message.");
      return;
    }

    try {
      await submitMessage(message);
      alert("Message submitted successfully.");
    } catch (err) {
      alert("Failed to submit message.");
    }
  };

  return (
    <div>
      <h1>Submit a Message to Hedera Topic</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
        rows={5}
        disabled={isSubmitting}
      />
      <button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Message"}
      </button>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {txId && <p>Transaction ID: {txId}</p>}
    </div>
  );
};

export default SubmitMessageComponent;
 