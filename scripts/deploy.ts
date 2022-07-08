import { ethers } from "hardhat";

async function main() {

  const Token = await ethers.getContractFactory('GLDToken');
  const GLD = await Token.deploy();

  await GLD.deployed();

  console.log("deployed at:", GLD.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
