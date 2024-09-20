const { publishToIPFS } = require("../services/pinataService");

async function storeToIpfsCtrl(req, res, next) {
  const iframe = req.body;
  try {
    const ipfsHash = await publishToIPFS(iframe);
    console.log(ipfsHash);
    res.send(ipfsHash);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
  next();
}

module.exports = { storeToIpfsCtrl };
