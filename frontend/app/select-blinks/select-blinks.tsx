"use client";
import React, { useState } from "react";
import { templates } from "@/utils/templates";

interface CreateBlinkProps {
  currentBlinkObject: { templateId?: number; templateName?: string };
  setCurrentBlinkObject: React.Dispatch<
    React.SetStateAction<{ templateId?: number; templateName?: string }>
  >;
  handleNextClick: () => void;
}

const CreateBlink: React.FC<CreateBlinkProps> = ({
  currentBlinkObject,
  setCurrentBlinkObject,
  handleNextClick,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const updateBlinkObjectTemplate = (id: number, name: string) => {
    setCurrentBlinkObject({ templateId: id, templateName: name });
    setSelectedTemplate(name);
    handleNextClick(); // Call handleNextClick when a template is clicked
  };

  const isTemplateSelected = (template: string) =>
    selectedTemplate === template;

  return (
    <div className="h-screen flex flex-col items-center zoom-75 container mx-auto">
      <div className="mt-12 text-[22px] font-normal flex items-center flex-col text-center ">
        <span className="text-[33px]">
          Choose, Customize, and Activate Your Perfect Blinks
        </span>
        <span className="max-w-[800px] text-center text-[16px] opacity-70 mt-[12px]">
          Choose from a range of ready-made blink templates, customize them to
          fit your unique needs, and seamlessly launch interactive blockchain
          experiences across any platform—no coding required!
        </span>
      </div>
      <div className="grid grid-cols-3 gap-[10px] mt-[25px]">
        {Object.keys(templates).map((templateKey, index) => (
          <div
            key={index}
            className={` p-5 rounded-[4px] cursor-pointer flex flex-col items-center justify-center transition-all duration-300 ${
              isTemplateSelected(templateKey)
                ? "border-2 border-green-700"
                : "border-2 border-blue-700"
            }`}
            onClick={() => updateBlinkObjectTemplate(index + 1, templateKey)}
            role="button"
            aria-pressed={isTemplateSelected(templateKey)}
          >
            <div
              dangerouslySetInnerHTML={{ __html: templates[templateKey].html }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateBlink;
