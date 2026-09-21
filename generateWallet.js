import { ethers } from "ethers";

const BIRTH_DAY = "08";
const TARGET_PREFIX = `0x${BIRTH_DAY}`.toLowerCase();

console.log(`Пошук адреси з префіксом: ${TARGET_PREFIX}...`);

let attempts = 0;
let wallet;

while (true) {
  attempts++;
  wallet = ethers.Wallet.createRandom();
  if (wallet.address.toLowerCase().startsWith(TARGET_PREFIX)) {
    break;
  }
}

console.log(`\nГаманець знайдено за ${attempts} спроб!`);
console.log(`Адреса: ${wallet.address}`);
console.log(`Приватний ключ: ${wallet.privateKey}`);
