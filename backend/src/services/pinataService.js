const pinataSdk = require("@pinata/sdk");
const { pinataApiKey, pinataSecretApiKey } = require("../config");

const pinata = new pinataSdk(pinataApiKey, pinataSecretApiKey);

async function publishToIPFS(iframe) {
  try {
    const ipfsFile = await pinata.pinJSONToIPFS(iframe);
    return ipfsFile.IpfsHash;
  } catch (error) {
    throw new Error("Failed to publish to IPFS: " + error.message);
  }
}

module.exports = { publishToIPFS };
