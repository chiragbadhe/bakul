import { useEffect, useState, useMemo } from "react";
import { ethers } from "ethers";

const useChainId = () => {
  const [chainId, setChainId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getChainId = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider._detectNetwork();
        const fetchedChainId = Number(network.chainId); // Convert bigint to number
        setChainId(fetchedChainId);
      } catch (error) {
        console.error("Error detecting network:", error);
        setError("Failed to fetch chain ID");
      }
    };

    if (window.ethereum) {
      getChainId();
    } else {
      setError("Ethereum provider not found");
    }
  }, []);

  // Memoize the chainId to prevent unnecessary recalculations
  const memoizedChainId = useMemo(() => chainId, [chainId]);

  return { chainId: memoizedChainId, error };
};

export default useChainId;
