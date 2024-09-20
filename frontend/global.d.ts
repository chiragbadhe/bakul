// global.d.ts
export {};

declare global {
  interface Window {
    ethereum: any; // You can also type it more strictly if needed, e.g., EthereumProvider.
  }
}
