import fs from 'fs';
import { arweave } from './config/arweaveLocal';

// Generate wallet key
(async () => {
  const key = await arweave.wallets.generate();
  fs.writeFileSync('./wallet.json', JSON.stringify(key));

  const walletAddress = await arweave.wallets.jwkToAddress(key);

  console.log(walletAddress);

  await arweave.api.get(`/mint/${walletAddress}/1000000000000`);
})();

