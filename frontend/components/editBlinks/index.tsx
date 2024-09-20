import React, { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";

interface EditElementProps {
  bgColor: string;
  textColor: string;
  text: string;
  onBgColorChange: (color: string) => void;
  onTextColorChange: (color: string) => void;
  onTextChange: (text: string) => void;
  createBlink: () => void;
}

const EditElement: React.FC<EditElementProps> = ({
  bgColor: initialBgColor,
  textColor: initialTextColor,
  text: initialText,
  onBgColorChange,
  onTextColorChange,
  onTextChange,
  createBlink,
}) => {
  const [bgColor, setBgColor] = useState<string>(initialBgColor);
  const [textColor, setTextColor] = useState<string>(initialTextColor);
  const [text, setText] = useState<string>(initialText);
  const [hexInput, setHexInput] = useState<string>(initialBgColor);
  const [colorTarget, setColorTarget] = useState<"background" | "text">(
    "background"
  );

  useEffect(() => {
    setBgColor(initialBgColor);
    setTextColor(initialTextColor);
    setText(initialText);
  }, [initialBgColor, initialTextColor, initialText]);

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setHexInput(newColor);
    if (/^#[0-9A-F]{6}$/i.test(newColor)) {
      if (colorTarget === "background") {
        setBgColor(newColor);
        onBgColorChange(newColor);
      } else {
        setTextColor(newColor);
        onTextColorChange(newColor);
      }
    }
  };

  const handleColorChange = (newColor: string) => {
    setHexInput(newColor);
    if (colorTarget === "background") {
      setBgColor(newColor);
      onBgColorChange(newColor);
    } else {
      setTextColor(newColor);
      onTextColorChange(newColor);
    }
  };

  const toggleColorTarget = () => {
    setColorTarget((prevTarget) =>
      prevTarget === "background" ? "text" : "background"
    );
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    onTextChange(e.target.value);
  };

  return (
    <div className="flex flex-row p-5 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex-1 flex flex-col justify-between mr-4">
        <div className="flex flex-col items-center mb-5">
          <label className="text-lg font-semibold mb-2">
            Change {colorTarget === "background" ? "Background" : "Text"} Color
          </label>
          <HexColorPicker
            color={colorTarget === "background" ? bgColor : textColor}
            onChange={handleColorChange}
            className="w-full mb-4"
          />
          <input
            type="text"
            value={hexInput}
            onChange={handleHexInputChange}
            className="w-full p-2 border border-gray-300 rounded-md text-center mb-2"
            placeholder="#000000"
          />
          <button
            onClick={toggleColorTarget}
            className="bg-gray-200 p-2 rounded-md w-full text-black"
          >
            {colorTarget === "background"
              ? "Switch to Text Color"
              : "Switch to Background Color"}
          </button>
        </div>
        <div className="flex flex-col items-center">
          <label className="text-lg font-semibold mb-2">Edit Text:</label>
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default EditElement;
