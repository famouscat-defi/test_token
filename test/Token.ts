import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Token contract", function () {
  async function deployTokenFixture() {
    const Token = await ethers.getContractFactory('GLDToken');
    const [owner, address1, address2] = await ethers.getSigners();
    const hardhatToken = await Token.deploy();

    await hardhatToken.deployed();

    return {Token, hardhatToken, owner, address1, address2}
  }

  describe("Deployment", function () {
    it("Should assign the total supply of tokens to the owner", async function () {
      const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
  
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    })
  })
 
  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      const { hardhatToken, owner, address1, address2 } = await loadFixture(deployTokenFixture);
  
      await expect(
        hardhatToken.transfer(address1.address, 50)
      ).to.changeTokenBalances(hardhatToken, [owner, address1], [-50, 50]);
  
      await expect(
        hardhatToken.connect(address1).transfer(address2.address, 50)
      ).to.changeTokenBalances(hardhatToken, [address1, address2], [-50, 50]);
    })

    it("should emit Transfer events", async function () {
      const { hardhatToken, owner, address1, address2 } = await loadFixture(
        deployTokenFixture
      );

      await expect(hardhatToken.transfer(address1.address, 50))
      .to.emit(hardhatToken, "Transfer")
      .withArgs(owner.address, address1.address, 50);

      await expect(hardhatToken.connect(address1).transfer(address2.address, 50))
      .to.emit(hardhatToken, "Transfer")
      .withArgs(address1.address, address2.address, 50);
    })

    it("Should fail if sender doesn't have enough tokens", async function () {
      const { hardhatToken, owner, address1 } = await loadFixture(
        deployTokenFixture
      );

      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

      await expect(
        hardhatToken.connect(address1).transfer(owner.address, 1)
      ).to.be.revertedWith('ERC20: transfer amount exceeds balance');

      expect(await hardhatToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    })
  })

  // it("Should transfer tokens between accounts", async function () {
  //   const [owner, address1, address2] = await ethers.getSigners();

  //   const Token = await ethers.getContractFactory("Token");

  //   const hardhatToken = await Token.deploy();

  //   await hardhatToken.transfer(address1.address, 100);
  //   expect(await hardhatToken.balanceOf(address1.address)).to.equal(100);

  //   await hardhatToken.connect(address1).transfer(address2.address, 100);
  //   expect(await hardhatToken.balanceOf(address2.address)).to.equal(100);
  // })
});
