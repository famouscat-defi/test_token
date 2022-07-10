import { ethers } from "hardhat";

// async function main() {}
async function main() {
  const [owner] = await ethers.getSigners();

  console.error({
    owner: owner.address,
    balance: (await owner.getBalance()).toString()
  });

  const Flashloan = await ethers.getContractAt('Flashloan', "0x1a89aABaAF780d595F303DCF5104B544A8Cc0B14");
  
  const i =  BigInt("1000000000000000000");
  const res = await Flashloan.flashloan("0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD", i, 
  { 
    from: owner.address,
    gasLimit: 30000000,
    // gasPrice: 20_000_000_000,
    gasPrice: 20000000000,
    // nonce: 85,
 })

 console.error({res, i})

  console.log("token2 deployed at:", Flashloan.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
