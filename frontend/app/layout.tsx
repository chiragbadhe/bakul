// app/layout.js or pages/_app.js (depending on your Next.js version)
import type { Metadata } from "next";
import { Inter, Balsamiq_Sans, Galindo } from "next/font/google";
import "./globals.css";

// Load Inter, Balsamiq Sans, and Galindo fonts
const inter = Inter({ subsets: ["latin"] });
const balsamiqSans = Balsamiq_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-balsamiq",
});

const galindo = Galindo({
  subsets: ["latin"],
  variable: "--font-galindo",
  weight: "400",
});

import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { config } from "@/config";
import Header from "@/components/header";
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

export const metadata: Metadata = {
  title: "AppKit Example App",
  description: "Powered by WalletConnect",
};

// const evmNetworks = [
//   {
//     blockExplorerUrls: ['https://etherscan.io/'],
//     chainId: 1,
//     chainName: 'Ethereum Mainnet',
//     iconUrls: ['https://app.dynamic.xyz/assets/networks/eth.svg'],
//     name: 'Ethereum',
//     nativeCurrency: {
//       decimals: 18,
//       name: 'Ether',
//       symbol: 'ETH',
//     },
//     networkId: 1,

//     rpcUrls: ['https://mainnet.infura.io/v3/'],
//     vanityName: 'ETH Mainnet',
//   },
// {
//     blockExplorerUrls: ['https://etherscan.io/'],
//     chainId: 5,
//     chainName: 'Ethereum Goerli',
//     iconUrls: ['https://app.dynamic.xyz/assets/networks/eth.svg'],
//     name: 'Ethereum',
//     nativeCurrency: {
//       decimals: 18,
//       name: 'Ether',
//       symbol: 'ETH',
//     },
//     networkId: 5,
//     rpcUrls: ['https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],

//     vanityName: 'Goerli',
//   },
//   {
//     blockExplorerUrls: ['https://polygonscan.com/'],
//     chainId: 137,
//     chainName: 'Matic Mainnet',
//     iconUrls: ["https://app.dynamic.xyz/assets/networks/polygon.svg"],
//     name: 'Polygon',
//     nativeCurrency: {
//       decimals: 18,
//       name: 'MATIC',
//       symbol: 'MATIC',
//     },
//     networkId: 137,
//     rpcUrls: ['https://polygon-rpc.com'],
//     vanityName: 'Polygon',
//   },
// ];
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en" className={`${balsamiqSans.variable} ${galindo.variable}`}>
      <body className={`${inter.className} font-balsamiq`}>
        <DynamicContextProvider
          theme="dark"
          settings={{
            // overrides: { evmNetworks },
            environmentId: "f5412ec4-853a-474a-811b-52c274a9ffc9",
            walletConnectors: [EthereumWalletConnectors],
          }}
        >
          {/* <Web3ModalProvider initialState={initialState}> */}
          <Header />
          {children}
          {/* </Web3ModalProvider> */}
        </DynamicContextProvider>
      </body>
    </html>
  );
}
