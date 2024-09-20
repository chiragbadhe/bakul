const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const IdeaCollaboration = await hre.ethers.getContractFactory("IdeaCollaboration");
  const contract = await IdeaCollaboration.deploy();

  console.log("IdeaCollaboration deployed to:", contract.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
