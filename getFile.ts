
import fs from "fs";
import { arweave } from "./config/arweaveLocal";

const getFileData = async () => {
    const fileData = await arweave.transactions.getData("brApEsvk20RKM2Tbmq6F5XmyDQz2_i4UaZDVgRkLm3o", {
        decode: true, 
        string: false,
      });

      fs.writeFileSync('retrieved_image.png', Buffer.from(fileData))
}

getFileData();