import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();

  console.error({
    owner: owner.address,
    balance: (await owner.getBalance()).toString()
  });

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
