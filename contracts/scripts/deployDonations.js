// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  console.log("Starting the deployment script...");

  // Get the contract factory
  const Donations = await hre.ethers.getContractFactory("Donations");
  console.log("Deploying Donations contract...");

  // Deploy the contract
  const donations = await Donations.deploy();
  console.log(`Waiting for the Donations contract to be deployed...`);

  await donations.deployed();
  console.log(
    `Donations contract successfully deployed to: ${donations.address}`
  );

  console.log(`Contract Address: ${donations.address}`);
  console.log(`Transaction Hash: ${donations.deployTransaction.hash}`);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error during deployment:");
    console.error(error);
    process.exit(1);
  });
