import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();

  console.error({
    owner: owner.address,
    balance: (await owner.getBalance()).toString()
  });

  const Token2 = await ethers.getContractFactory('Token2');
  const token2 = await Token2.deploy();

  await token2.deployed();

  const Token3 = await ethers.getContractFactory('Token3');
  const token3 = await Token3.deploy()

  await token3.deployed();

  

  console.log("token2 deployed at:", token2.address);
  console.log('token3 deployed at:', token3.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
