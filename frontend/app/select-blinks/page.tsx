"use client";
import React, { useState } from "react";
import SelectBlink from "@/app/select-blinks/select-blinks";
import EditBlink from "@/app/select-blinks/edit-blinks";
import UseBlink from "@/app/select-blinks/use-blinks";
import Modal from "@/components/modal";

interface BlinkObject {
  templateId?: number;
  templateName?: string;
}

const Home: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [currentBlinkObject, setCurrentBlinkObject] = useState<BlinkObject>({});
  const [newIPFShash, setNewIPFShash] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentSection(0); // Reset section when closing modal
  };

  const handleNextClick = () => {
    setCurrentSection((prevSection) =>
      Math.min(prevSection + 1, modalSections.length - 1)
    );
  };

  const handlePreviousClick = () => {
    setCurrentSection((prevSection) => Math.max(prevSection - 1, 0));
  };

  const modalSections: JSX.Element[] = [
    <EditBlink
      key="edit-blink"
      currentBlinkObject={currentBlinkObject}
      setCurrentBlinkObject={setCurrentBlinkObject}
      handleNextClick={handleNextClick}
      setNewIPFShash={setNewIPFShash}
    />,
    <UseBlink
      key="use-blink"
      currentBlinkObject={currentBlinkObject}
      setCurrentBlinkObject={setCurrentBlinkObject}
      handleNextClick={handleNextClick}
      newIPFShash={newIPFShash}
    />,
  ];

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <SelectBlink
        key="select-blink"
        currentBlinkObject={currentBlinkObject}
        setCurrentBlinkObject={setCurrentBlinkObject}
        handleNextClick={openModal}
      />
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <div className="w-full h-full flex flex-col items-center justify-center">
            {modalSections[currentSection]}
            <div className=" flex justify-between w-full px-4 space-x-10">
              <button
                onClick={handlePreviousClick}
                disabled={currentSection === 0}
                className="px-4 py-2 bg-green-500 text-white rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={handleNextClick}
                disabled={currentSection === modalSections.length - 1}
                className="px-4 py-2 -red-500 text-white rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Home;
