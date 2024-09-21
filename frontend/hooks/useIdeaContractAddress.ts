import { useEffect, useState } from "react";
import { ethers } from "ethers"; // Ensure you have ethers installed
import { contractAddresses } from "@/utils/ideasContract";


function useIdeaContractAddress(): string | null {
  const [contractAddress, setContractAddress] = useState<string | null>(null);

  useEffect(() => {
    const fetchChainId = async () => {
      if (window.ethereum) {
        // Create a provider using the window.ethereum object
        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        const chainId = network.chainId.toString();
        setContractAddress(contractAddresses[chainId] || null);
      }
    };

    fetchChainId();
  }, []);

  return contractAddress;
}

export default useIdeaContractAddress;
