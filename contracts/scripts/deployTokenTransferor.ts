// scripts/deployTokenTransferor.js
const hre = require("hardhat");

async function main() {
  console.log("Starting the deployment script for TokenTransferor...");

  // Define the addresses of the Chainlink Router and LINK token (example addresses)
  // Replace with the appropriate addresses for your network
  const ROUTER_ADDRESS = "0xYourRouterAddressHere"; // Chainlink Router address
  const LINK_TOKEN_ADDRESS = "0xYourLinkTokenAddressHere"; // Chainlink LINK token address

  // Get the contract factory
  const TokenTransferor = await hre.ethers.getContractFactory(
    "TokenTransferor"
  );
  console.log("Deploying TokenTransferor contract...");

  // Deploy the contract
  const tokenTransferor = await TokenTransferor.deploy(
    ROUTER_ADDRESS,
    LINK_TOKEN_ADDRESS
  );
  console.log("Waiting for the TokenTransferor contract to be deployed...");

  await tokenTransferor.deployed();
  console.log(
    `TokenTransferor contract successfully deployed to: ${tokenTransferor.address}`
  );

  // Optionally verify the deployment
  console.log("Deployment verification:");
  console.log(`Contract Name: TokenTransferor`);
  console.log(`Contract Address: ${tokenTransferor.address}`);
  console.log(`Transaction Hash: ${tokenTransferor.deployTransaction.hash}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error during deployment:");
    console.error(error);
    process.exit(1);
  });
