import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Token contract", function () {
  async function deployTokenFixture() {
    const Token = await ethers.getContractFactory('Token');
    const [owner, address1, address2] = await ethers.getSigners();
    const hardhatToken = await Token.deploy();

    await hardhatToken.deployed();

    return {Token, hardhatToken, owner, address1, address2}
  }

  describe("Deployment", function () {
    it("test1", async function () {
      const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
  
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    })
  })
});
