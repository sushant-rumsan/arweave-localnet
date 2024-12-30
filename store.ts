import fs from 'fs';
import { arweave } from './config/arweaveLocal';

(async () => {

  // Replace with your file location
  const imageData = fs.readFileSync(`images/myImage.png`);

  let key = JSON.parse(fs.readFileSync("wallet.json", "utf-8"));

  const dataTransaction = await arweave.createTransaction({
    data: imageData,
  }, key)
  
  await arweave.transactions.sign(dataTransaction, key)

  const statusBeforePost = await arweave.transactions.getStatus(dataTransaction.id)
  console.log(statusBeforePost)
  await arweave.transactions.post(dataTransaction)
  const statusAfterPost = await arweave.transactions.getStatus(dataTransaction.id)
  console.log(statusAfterPost)
  let transaction = await arweave.createTransaction({
    data: imageData
  }, key);

  transaction.addTag('Content-Type', 'image/png');

  await arweave.transactions.sign(transaction, key);

  let uploader = await arweave.transactions.getUploader(transaction);

  while (!uploader.isComplete) {
    await uploader.uploadChunk();
    console.log(`Uploading chunk: ${uploader.uploadedChunks}/${uploader.totalChunks}`);
  }

  console.log("Upload complete! Transaction ID:", transaction.id);
})();
