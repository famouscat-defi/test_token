import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();

  console.error({
    owner: owner.address,
    balance: (await owner.getBalance()).toString()
  });

  const Flashloan = await ethers.getContractFactory('Flashloan');
  const token2 = await Flashloan.deploy("0x506B0B2CF20FAA8f38a4E2B524EE43e1f4458Cc5");
  
  
  console.log("token2 deployed at:", token2.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
