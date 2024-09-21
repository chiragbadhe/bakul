import React, { useState, useEffect } from "react";
import { templates } from "@/utils/templates";
import { useAttestUserBlink } from "@/hooks/useSignBlinks";
import { useSubmitMessageToTopic } from "@/hooks/useSubmitMessageToTopic";

interface CreateBlink3Props {
  currentBlinkObject: {
    templateName?: string;
  };
  setCurrentBlinkObject: React.Dispatch<React.SetStateAction<any>>;
  handleNextClick: () => void;
  newIPFShash: string;
}

const CreateBlink3: React.FC<CreateBlink3Props> = ({
  currentBlinkObject,
  setCurrentBlinkObject,
  handleNextClick,
  newIPFShash,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [socialLinkCopied, setSocialLinkCopied] = useState(false);
  const [hederaLink, setHederaLink] = useState();

  const { attest, loading, error } = useAttestUserBlink();

  const {
    isSubmitting,
    error: errSubmitMessage,
    txId,
    submitMessage,
  } = useSubmitMessageToTopic();

  useEffect(() => {
    if (currentBlinkObject.templateName) {
      setSelectedTemplate(currentBlinkObject.templateName);
    }
  }, [currentBlinkObject]);

  const copyLink = async () => {
    try {
      const url = `ipfs://${newIPFShash}`; // The IPFS link you want to copy
      await navigator.clipboard.writeText(url);
      await attest("test"); // Replace with your actual Blink hash
      console.log("clicked", error, loading);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      console.error("Error copying link:", error);
    }
  };

  const copySocialLink = async () => {
    try {
      const url = `<blk ipfs://${newIPFShash} blk>`;
      await navigator.clipboard.writeText(url);

      try {
        await submitMessage(`ipfs://${newIPFShash}`);
        setHederaLink(txId as any);
        // alert("Message submitted successfully.");
      } catch (err) {
        alert("Failed to submit message.");
      }

      setSocialLinkCopied(true);
      setTimeout(() => setSocialLinkCopied(false), 2000);
    } catch (error) {
      console.error("Error copying social link:", error);
    }
  };

  console.log(hederaLink);

  return (
    <div className="p-5 zoom-75">
      <h4 className="text-lg font-semibold">Your Blink Is Ready</h4>
      <p className="text-base mt-2">
        It has been deployed and can be accessed via IPFS using the link below
      </p>
      <a
        className="text-green-600"
        target="_blank"
        href={`https://hashscan.io/testnet/transaction/${hederaLink}`}
      >
        Hedera Scan Message : {hederaLink}
      </a>
      <div className="mt-3 flex gap-3">
        <button
          onClick={copyLink}
          className={`py-2 px-4 rounded-md text-white text-lg ${
            linkCopied ? "bg-green-500" : "bg-sky-500"
          } transition-colors duration-300`}
        >
          {linkCopied ? "IPFS Link Copied To Clipboard" : "Copy Link"}
        </button>
        <button
          onClick={copySocialLink}
          className={`py-2 px-4 rounded-md text-white text-lg ${
            socialLinkCopied ? "bg-green-500" : "bg-blue-600"
          } transition-colors duration-300`}
        >
          {socialLinkCopied
            ? "Social Link Copied To Clipboard"
            : "Post To Socials"}
        </button>
      </div>
      {selectedTemplate && (
        <div className="flex flex-row rounded-lg shadow-md mt-12 mb-5">
          <div
            className="flex-1 rounded-lg p-5 mr-5"
            dangerouslySetInnerHTML={{
              __html: templates[selectedTemplate].html,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CreateBlink3;
