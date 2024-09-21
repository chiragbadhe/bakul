import { useEffect, useState } from "react";
import { Addressable, BrowserProvider, Contract } from "ethers";
import { chainId, contractABI, contractAddresses } from "@/utils/ideasContract";

// Define the type for Idea and Interest to improve type safety
interface Idea {
  id: number;
  title: string;
  description: string;
  publisher: string;
  voteCount: number; // Added voteCount to Idea type
}

interface Interest {
  user: string;
  isAccepted: boolean;
}

const IdeaList: React.FC = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [interestedUsers, setInterestedUsers] = useState<Interest[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const contractAddress = contractAddresses[chainId]; // Use square brackets for indexing

  const fetchIdeas = async () => {
    if (!window.ethereum) {
      setError("Please install MetaMask to interact with the ideas.");
      setLoading(false);
      return;
    }

    const provider = new BrowserProvider(window.ethereum);
    const contract = new Contract(contractAddress, contractABI, provider);

    try {
      const ideaCount = await contract.ideaCounter();
      const fetchedIdeas: Idea[] = [];

      for (let i = 1; i <= ideaCount; i++) {
        const idea = await contract.ideas(i);
        fetchedIdeas.push({
          id: Number(idea.id),
          title: idea.title,
          description: idea.description,
          publisher: idea.publisher,
          voteCount: Number(idea.voteCount),
        });
      }

      setIdeas(fetchedIdeas);
    } catch (err) {
      console.error("Error fetching ideas", err);
      setError("Failed to fetch ideas. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch interested users for a specific idea
  const fetchInterestedUsers = async (ideaId: number) => {
    if (!window.ethereum) {
      setError("Please install MetaMask to view interested users.");
      return;
    }

    const provider = new BrowserProvider(window.ethereum);
    const contract = new Contract(contractAddress, contractABI, provider);

    try {
      const usersAddresses = await contract.getInterestedUsers(ideaId);
      const users: Interest[] = [];
      for (const user of usersAddresses) {
        const isAccepted = await contract.isCollaboratorAccepted(ideaId, user);
        users.push({ user, isAccepted });
      }
      setInterestedUsers(users);
    } catch (err) {
      console.error("Error fetching interested users", err);
      setError("Failed to fetch interested users. Please try again.");
    }
  };

  const vote = async (ideaId: number) => {
    if (!window.ethereum) {
      setError("Please install MetaMask to vote.");
      return;
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(contractAddress, contractABI, signer);

    try {
      const tx = await contract.vote(ideaId);
      await tx.wait();
      alert("Vote cast successfully!");
      fetchIdeas(); // Refresh the idea list or update vote count locally
    } catch (err) {
      console.error("Error voting", err);
      setError("Failed to cast vote. Please try again.");
    }
  };

  // Function to express interest in an idea
  const expressInterest = async (ideaId: number) => {
    if (!window.ethereum) {
      setError("Please install MetaMask to express interest.");
      return;
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(contractAddress, contractABI, signer);

    try {
      const tx = await contract.expressInterest(ideaId);
      await tx.wait();
      alert("Interest expressed successfully!");
    } catch (err) {
      console.error("Error expressing interest", err);
      setError("Failed to express interest. Please try again.");
    }
  };

  // Function to accept a user for a specific idea
  const acceptUser = async (ideaId: number, user: string) => {
    if (!window.ethereum) {
      setError("Please install MetaMask to accept users.");
      return;
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(contractAddress, contractABI, signer);

    try {
      const tx = await contract.acceptCollaborator(ideaId, user);
      await tx.wait();
      alert("User accepted successfully!");
      await fetchInterestedUsers(ideaId); // Refresh the list
    } catch (err) {
      console.error("Error accepting user", err);
      setError("Failed to accept user. Please try again.");
    }
  };

  // Function to reject a user for a specific idea
  const rejectUser = async (ideaId: number, user: string) => {
    if (!window.ethereum) {
      setError("Please install MetaMask to reject users.");
      return;
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(contractAddress, contractABI, signer);

    try {
      const tx = await contract.rejectCollaborator(ideaId, user);
      await tx.wait();
      alert("User rejected successfully!");
      await fetchInterestedUsers(ideaId); // Refresh the list
    } catch (err) {
      console.error("Error rejecting user", err);
      setError("Failed to reject user. Please try again.");
    }
  };

  // Function to open the modal and fetch interested users for a specific idea
  const openModal = async (idea: Idea) => {
    setSelectedIdea(idea);
    await fetchInterestedUsers(idea.id);
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedIdea(null);
    setInterestedUsers([]);
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Ideas List</h2>

      {loading && (
        <div className="flex justify-center items-center">
          <p className="text-gray-500">Loading ideas...</p>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center mb-4">
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className="bg-[#1F1F21] shadow-md rounded-xs border border-white/10 p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          >
            <p className="flex flex-col mb-2">
              <span className="text-[14px]">Title:</span>{" "}
              <span className="text-[16px]">{idea.title}</span>
            </p>
            <p className="flex flex-col mb-2">
              <span className="text-[14px]">Description:</span>{" "}
              <span className="text-[16px]">{idea.description}</span>
            </p>
            <p className="flex flex-col mb-2">
              <span className="text-[14px]">Published By:</span>{" "}
              <span className="text-[14px]">{idea.publisher}</span>
            </p>

            <p className="flex flex-col mb-2">
              <span className="text-[14px]">Vote Count:</span>{" "}
              <span className="text-[14px]">{idea.voteCount}</span>
            </p>
            <div className="flex space-y-2 flex-col">
              <button
                onClick={() => vote(idea.id)}
                className="border border-yellow-500 text-[12px] text-white py-2 px-4 rounded hover:bg-yellow-600/30 transition-colors"
              >
                Vote this idea
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent modal from opening when clicking the button
                  expressInterest(idea.id);
                }}
                className="w-full border border-blue-500 text-[12px] text-white py-2 rounded-xs hover:bg-blue-600/30 transition duration-200"
              >
                Express Interest
              </button>

              <button
                className="px-4 w-full py-2 border text-[12px]  border-green-500 text-white hover:bg-green-600/30 transition duration-200"
                onClick={() => openModal(idea)}
              >
                Collaborators
              </button>

              {/* {idea.publisher.toLowerCase() === address && (
                <button
                  className="px-4 w-full py-2 border text-[12px]  border-green-500 text-white hover:bg-green-600/30 transition duration-200"
                  onClick={() => openModal(idea)}
                >
                  Collaborators
                </button>
              )} */}
            </div>
          </div>
        ))}
      </div>

      {/* className="relative w-full max-w-lg p-6 mx-4 bg-white/30 backdrop-blur-md border border-gray-300 rounded-lg" */}

      {modalOpen && selectedIdea && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-[#1F1F21]/40 p-6 border border-white/10 backdrop-blur-md  shadow-lg  w-[700px]">
            <h3 className="text-xl font-semibold mb-4">
              Manage Collaborators for {selectedIdea.id}
            </h3>

            {ideas.map((idea) => (
              <div key={idea.id} className="]">
                <p className="flex flex-col mb-2">
                  <span className="text-[14px]">Title:</span>{" "}
                  <span className="text-[16px]">{idea.title}</span>
                </p>
                <p className="flex flex-col mb-2">
                  <span className="text-[14px]">Description:</span>{" "}
                  <span className="text-[16px]">{idea.description}</span>
                </p>
                <p className="flex flex-col mb-2">
                  <span className="text-[14px]">Published By:</span>{" "}
                  <span className="text-[14px]">{idea.publisher}</span>
                </p>
              </div>
            ))}
            <img className="py-[20px]" src="/line.svg" alt="" />
            <ul className="list-disc mb-4 flex flex-col">
              <span>Intrested Users</span>
              {interestedUsers.length === 0 ? (
                <span className="text-gray-500">No interested users yet.</span>
              ) : (
                interestedUsers.map((interest) => (
                  <li
                    key={interest.user}
                    className="flex justify-between items-center mb-2"
                  >
                    <span>{interest.user}</span>
                    <div>
                      {!interest.isAccepted ? (
                        <>
                          <button
                            className="px-2 py-1 border border-green-500 text-green-500 mr-2"
                            onClick={() =>
                              acceptUser(selectedIdea.id, interest.user)
                            }
                          >
                            Accept
                          </button>
                          <button
                            className="px-2 py-1 border border-red-500  text-red-500"
                            onClick={() =>
                              rejectUser(selectedIdea.id, interest.user)
                            }
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-green-500">Accepted</span>
                      )}
                    </div>
                  </li>
                ))
              )}
            </ul>
            <button
              className="px-4 py-2 border-blue-700 border text-blue-700"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdeaList;
