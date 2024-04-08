// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {ERC20} from "solady/tokens/ERC20.sol";

contract MockUSDC is ERC20 {
 
  function name() public pure override returns (string memory) {
    return "USD Coin";
  }

  function symbol() public pure override returns (string memory) {
    return "USDC";
  }

  function faucet(address to) external {
    _mint(to, 1000e6);
  }
}
