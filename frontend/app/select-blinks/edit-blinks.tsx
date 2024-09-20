import React, { useState, useEffect } from "react";
import EditElement from "@/components/editBlinks";
import { templates } from "@/utils/templates";
// import { saveAs } from "file-saver";

interface CreateBlink2Props {
  currentBlinkObject: {
    templateName?: string;
    [key: string]: any;
  };
  setCurrentBlinkObject: React.Dispatch<React.SetStateAction<any>>;
  handleNextClick: () => void;
  setNewIPFShash: (hash: string) => void;
}

const CreateBlink2: React.FC<CreateBlink2Props> = ({
  currentBlinkObject,
  setCurrentBlinkObject,
  handleNextClick,
  setNewIPFShash,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [editingElement, setEditingElement] = useState<HTMLElement | null>(
    null
  );
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [textColor, setTextColor] = useState<string>("#333333");
  const [text, setText] = useState<string>("Your text here");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [tokenName, setTokenName] = useState<string>("");
  const [referrer, setReferrer] = useState<string>("");
  const [destinationAddress, setDestinationAddress] = useState<string>("");
  const [destinationDecimals, setDestinationDecimals] = useState<string>("");
  const [recipient, setRecipient] = useState<string>(
    "0x000000000000000000000000000000000"
  );

  useEffect(() => {
    if (currentBlinkObject.templateName) {
      setSelectedTemplate(currentBlinkObject.templateName);
    }
  }, [currentBlinkObject]);

  const handleTemplateSelect = (templateName: string) => {
    setSelectedTemplate(templateName);
    setEditingElement(null); // Reset editing element when a new template is selected
  };

  const handleElementClick = (element: HTMLElement) => {
    setEditingElement(element);
    setBgColor((element as any).style.backgroundColor || "#ffffff");
    setTextColor((element as any).style.color || "#333333");
    setText((element as any).textContent || "Your text here");

    if (element.tagName === "IMG") {
      setShowTooltip(true);
      setImageUrl((element as HTMLImageElement).src);
    } else {
      setShowTooltip(false);
    }
  };

  const handleBgColorChange = (newColor: string) => {
    setBgColor(newColor);
    if (editingElement) {
      (editingElement as any).style.backgroundColor = newColor;
    }
  };

  const handleTextColorChange = (newColor: string) => {
    setTextColor(newColor);
    if (editingElement) {
      (editingElement as any).style.color = newColor;
    }
  };

  const handleTextChange = (newText: string) => {
    setText(newText);
    if (editingElement) {
      (editingElement as any).textContent = newText;
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const updateImageUrl = () => {
    if (editingElement && editingElement.tagName === "IMG") {
      (editingElement as HTMLImageElement).src = imageUrl;
    }
    setShowTooltip(false);
  };

  const cancelImageUpdate = () => {
    setShowTooltip(false);
  };

  const createBlink = async () => {
    try {
      const editedHtml =
        document.querySelector(".templateContainer")?.innerHTML || "";
      const htmlContent = `
        ${editedHtml}
      `;

      const modifiedJs = (templates[selectedTemplate!] as any).js
        .replace("referrer = null", `referrer = "${referrer}";`)
        .replace(
          /destinationToken = \{[\s\S]*?\}/,
          `destinationToken = { // HARDCODE BY GENERATOR
            name: "${tokenName}",
            address: "${destinationAddress}",
            decimals: "${destinationDecimals}",
            image: "https://cdn3d.iconscout.com/3d/premium/thumb/usdc-10229270-8263869.png?f=webp"
          };`
        )
        .replace(
          /const recipient = '0x53FA684bDd93da5324BDc8B607F8E35eC79ccF5A';/,
          `const recipient = '${recipient}';`
        );

      const iFrame = { iframe: { html: htmlContent, js: modifiedJs } };
      const res = await fetch("http://localhost:8000/storeToIpfs", {
        method: "POST",
        body: JSON.stringify(iFrame),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to store to IPFS");
      }

      let ipfsText = await res.text();
      setNewIPFShash(ipfsText);
      handleNextClick();
    } catch (error) {
      console.error("Error creating blink:", error);
    }
  };

  const handleDeployClick = async () => {
    setIsLoading(true);
    await createBlink();
    await new Promise((resolve) => setTimeout(resolve, 4000)); // Simulate 4 seconds delay
    setIsLoading(false);
  };

  const handleEditClick = () => {
    const editedHtml =
      document.querySelector(".templateContainer")?.innerHTML || "";
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Custom Component</title>
  <style>
    body {}
    .templateContainer {}
  </style>
</head>
<body>
  <div class="templateContainer">
    ${editedHtml}
  </div>
</body>
</html>
    `;

    const modifiedJs = (templates[selectedTemplate!] as any).js
      .replace("var referrer;", `var referrer = '${referrer}';`)
      .replace(
        /destinationToken = \{(.|\n)*?\};/,
        `destinationToken = { // HARDCODE BY GENERATOR
          name: "${tokenName}",
          address: "${destinationAddress}",
          decimals: ${destinationDecimals},
          image: "https://cdn3d.iconscout.com/3d/premium/thumb/usdc-10229270-8263869.png?f=webp"
        };`
      );

    const iFrame = { iframe: { html: htmlContent, js: modifiedJs } };
    const blob = new Blob([JSON.stringify(iFrame, null, 2)], {
      type: "application/json",
    });
    // saveAs(blob, "blinkTemplate.json");
  };

  return (
    <div className="p-4 max-w-5xl mx-auto text-center">
      <h4 className="text-xl font-semibold mb-2">Edit Your Blink</h4>
      <p className="text-sm text-gray-500 mb-4">
        Click On Element You Want To Edit And Change Its Color, Text or Image
      </p>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-52 text-lg text-gray-700">
          <span>Deploying Your Ethereum Blink To IPFS</span>
        </div>
      ) : (
        <>
          <div className="flex space-x-[14px]  items-center justify-center">
            <span
              onClick={handleEditClick}
              className="border-2 border-blue-600 px-[28px] py-[8px] cursor-pointer"
            >
              Edit
            </span>
            <span
              onClick={handleDeployClick}
              className="border-2 border-green-600 px-[36px] py-[8px] cursor-pointer"
            >
              Deploy
            </span>
          </div>
          {selectedTemplate && (
            <div className="relative mt-[26px]">
              <div
                className=" p-4 min-h-[200px] templateContainer"
                dangerouslySetInnerHTML={{
                  __html: (templates[selectedTemplate!] as any).html,
                }}
                onClick={(e) => handleElementClick(e.target as HTMLElement)}
              />
              
              {editMode && (
                <EditElement
                  bgColor={bgColor}
                  textColor={textColor}
                  text={text}
                  onBgColorChange={handleBgColorChange}
                  onTextColorChange={handleTextColorChange}
                  onTextChange={handleTextChange}
                  createBlink={createBlink}
                />
              )}
              {showTooltip && (
                <div className="absolute top-2 right-2 bg-white border border-gray-300 p-3 shadow-lg z-10">
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={handleImageUrlChange}
                    placeholder="Enter image URL"
                    className="w-full p-2 border border-gray-300 mb-2"
                  />
                  <div className="flex justify-between">
                    <button
                      onClick={updateImageUrl}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Post
                    </button>
                    <button
                      onClick={cancelImageUpdate}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CreateBlink2;
