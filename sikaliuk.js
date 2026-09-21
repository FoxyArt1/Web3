import { ethers } from "ethers";

const RPC_URL = "https://sepolia.infura.io/v3/c8af3723e40a420aac8d91f9f1958ccf";
const PRIVATE_KEY = "0x844a8559f9948013285a2a9ebcaa2610d281acd00ea173c0ff66610bd57f85d3";
const RECIPIENT_ADDRESS = "0x21eE31cD6f03208533499571D427Cb5c9fEf42C9";

async function main() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  console.log(`Робоча адреса: ${wallet.address}`);

  const balanceWei = await provider.getBalance(wallet.address);
  const balanceEth = ethers.formatEther(balanceWei);
  console.log(`Баланс: ${balanceEth} SepoliaETH (${balanceWei.toString()} Wei)`);

  if (balanceWei === 0n) {
    throw new Error("Баланс 0. Поповніть гаманець");
  }

  const txAmount = ethers.parseEther("0.0001"); 
  console.log(`\nВідправка 0.0001 ETH на адресу: ${RECIPIENT_ADDRESS}...`);

  const txResponse = await wallet.sendTransaction({
    to: RECIPIENT_ADDRESS,
    value: txAmount,
  });

  console.log(`Hash: ${txResponse.hash}`);
  console.log("Чекаєм підтвердження");

  const receipt = await txResponse.wait();

  console.log("\nТранзакцію підтверджено");
  console.log(`Статус: ${receipt.status === 1 ? "Успіх (1)" : "Помилка (0)"}`);
  console.log(`Номер блоку: ${receipt.blockNumber}`);
  console.log(`Витрачено газу: ${receipt.gasUsed.toString()}`);
  console.log(`Посилання на Etherscan: https://sepolia.etherscan.io/tx/${txResponse.hash}`);
}

main().catch(console.error);
