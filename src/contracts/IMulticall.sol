// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IMulticall {
    /**
     * @dev Receives and executes a batch of function calls on this contract.
     */
    function multicall(bytes[] calldata data) external returns (bytes[] memory results);
}