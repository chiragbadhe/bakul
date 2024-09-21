import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { cookieStorage, createStorage, http } from "wagmi";
import {
  sepolia,
  flowTestnet,
  hederaTestnet,
  morphHolesky,
} from "wagmi/chains";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
if (!projectId) throw new Error("Project ID is not defined");

export const metadata = {
  name: "appkit-example-app",
  description: "AppKit Example",
  url: "http://localhost:3000/verifier",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
const chains = [flowTestnet, hederaTestnet, morphHolesky, sepolia] as const;

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  auth: {
    email: true, // default to true

    socials: ["github", "google", "x", "discord", "apple"],
    // showWallets: true, // default to true
    // walletFeatures: true, // default to true
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [sepolia.id]: http(),
  },
});
