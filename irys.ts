import * as fs from 'fs';
import Irys from "@irys/sdk"

const getIrysClient = () => {
    const irys = new Irys({
        url: "https://devnet.irys.xyz",
        token: "matic",
        key: '0xa3063f3f653dfc48764a89aeda9d25b58102440a1daf29606cf1ba46f8859885',
        config: {
            providerUrl: "https://zkevm-rpc.com",
        }
    });
    return irys;
};

const lazyFundNode = async (size: any) => {
    const irys = getIrysClient();
    const price = await irys.getPrice(size);
    console.log(price)
    await irys.fund(price);
};

const uploadFileToArweave = async (filepath: any, tags: any) => {
    const irys = getIrysClient();
    const file = fs.readFileSync(filepath);
    const stats = fs.statSync(filepath);
    await lazyFundNode(stats.size);
    const { id } = await irys.upload(file, { tags });
    console.log("file uploaded to ", `https://arweave.net/${id}`);
    return id;
};

uploadFileToArweave('./images/myImage.png', [
    { name: "Content-Type", value: "image/png" },
    { name: "caption", value: "My Image Caption" },
    { name: "description", value: "A beautiful image uploaded to Arweave" }
  ])

getIrysClient();

