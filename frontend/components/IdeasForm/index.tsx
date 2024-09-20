import { useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import { contractABI, contractAddress } from "@/utils/ideasContract";

const IdeaForm: React.FC = () => {
  const [idea, setIdea] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const submitIdea = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask to submit ideas");
      return;
    }

    if (!idea.title || !idea.description) {
      setError("Both title and description are required.");
      return;
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(contractAddress, contractABI, signer);

    setLoading(true);
    setError("");

    try {
      const tx = await contract.submitIdea(idea.title, idea.description);
      await tx.wait();
      alert("Idea submitted successfully!");
      setIdea({ title: "", description: "" }); // Clear the form after submission
    } catch (error) {
      console.error("Error submitting idea:", error);
      setError("There was an error submitting your idea. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex  container mx-auto w-full">
      <div className="w-1/2 flex flex-col">
        <div className="text-[18px] font-bold text-blue-600 ">
          Share Your Vision for the Next Blink!
        </div>

        <div className="mt-[16px]">
          Got an idea for a new blink? Here’s your chance to shape the future of
          blockchain interactions! Use this space to propose innovative concepts
          for blinks that can transform web experiences. Whether it's a new use
          case, a unique functionality, or an improvement to existing blinks, we
          want to hear your creative ideas.
        </div>

        <div className="mt-[18px] text-blue-600">How It Works: </div>

        <div className="mt-[16px]">
          Submit Your Idea: Share your thoughts on what kind of blink you'd like
          to see built. Be as detailed or as simple as you like—every idea is
          valuable.
        </div>

        <div className="mt-[12px]">
          Collaborate and Build: Once submitted, your idea will be reviewed, and
          it could be developed into a real, interactive blink.
        </div>

        <div className="mt-[12px]">
          Innovate Together: Join the community in expanding the possibilities
          of blockchain by contributing your vision. Let your creativity flow
          and help shape the next big thing in blockchain with Bakul!
        </div>
      </div>

      <div className="ml-[42px] w-1/2 justify-right mx-auto p-6 bg-[#1F1F21] border border-white/10 rounded-xs shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">
          Submit an Idea
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-xs mb-4 text-center">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter your idea title"
            value={idea.title}
            onChange={(e) => setIdea({ ...idea, title: e.target.value })}
            className="w-full px-4 py-2 border border-white/10 rounded-xs bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Describe your idea"
            value={idea.description}
            onChange={(e) => setIdea({ ...idea, description: e.target.value })}
            className="w-full px-4 py-2 border bg-transparent border-white/10 rounded-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <button
          onClick={submitIdea}
          disabled={loading}
          className={`w-full border border-blue-500 text-white py-2 rounded-xs hover:bg-blue-600/20 transition-colors ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {loading ? "Submitting..." : "Submit Idea"}
        </button>
      </div>
    </div>
  );
};

export default IdeaForm;
