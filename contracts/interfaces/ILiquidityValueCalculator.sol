//SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.6.0;

interface ILiqudityValueCalculator {
    function computeLiquidityShareValue(uint liquidity, address tokenA, address tokenB) external returns (uint tokenAAmount, uint tokenBAmount);
}