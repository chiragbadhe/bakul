import * as hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Referral = await hre.ethers.getContractFactory("ReferralExample");

  const UNISWAP_V2_ROUTER_ADDRESS =
    "0x86dcd3293C53Cf8EFd7303B57beb2a3F671dDE98"; // Replace with the actual address

  const contract = await Referral.deploy(UNISWAP_V2_ROUTER_ADDRESS);

  console.log("IdeaCollaboration deployed to:", contract.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
