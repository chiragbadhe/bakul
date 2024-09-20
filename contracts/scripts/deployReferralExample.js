// scripts/deployReferralExample.js
const hre = require("hardhat");

async function main() {
  console.log("Starting the deployment script for ReferralExample...");

  // Define the address of the Uniswap V2 Router (example for Ethereum mainnet)
  // Replace with the appropriate router address for your network
  const UNISWAP_V2_ROUTER_ADDRESS =
    "0x5C69bEe701ef814a2B6a6A9F8CaaB86e09fC4F1F";

  // Get the contract factory
  const ReferralExample = await hre.ethers.getContractFactory(
    "ReferralExample"
  );
  console.log("Deploying ReferralExample contract...");

  // Deploy the contract
  const referralExample = await ReferralExample.deploy(
    UNISWAP_V2_ROUTER_ADDRESS
  );
  console.log("Waiting for the ReferralExample contract to be deployed...");

  await referralExample.deployed();
  console.log(
    `ReferralExample contract successfully deployed to: ${referralExample.address}`
  );


  console.log(`Contract Address: ${referralExample.address}`);
  console.log(`Transaction Hash: ${referralExample.deployTransaction.hash}`);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error during deployment:");
    console.error(error);
    process.exit(1);
  });
