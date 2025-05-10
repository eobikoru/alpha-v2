// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CreatorModule = buildModule("CreatorModule", (m) => {
  const creator = m.contract("Creator");

  return { creator };
});

export default CreatorModule;
