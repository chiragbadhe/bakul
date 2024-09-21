const { publishToIPFS } = require("../services/pinataService");

const makeId = () => Math.floor(Math.random() * 100000000);

//eth transfer blinks 
async function generateEthTransferBlinkCtrl(req, res, next) {
  const id = makeId();
  const iframe = {
    html: `
      <h1>Send ether</h1>
      <p>Send 1 ether to the following address:</p>
      <input placeholder="Type the address..." value="0x679a9aa509A85EeA7912D76d85b0b9195972B211" type="text" id="input${id}">
      <button id="dugme${id}">Send ether</button>`,
    js: `
      async function showAlert() {
        const recipient = document.getElementById("input${id}").value;
        if (typeof window.ethereum !== 'undefined') {
          try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const publicKey = accounts[0];
            const amount = "0x" + (1e18).toString(16);
            const transactionParameters = {
              to: recipient,
              from: publicKey,
              value: amount,
            };
            const txHash = await ethereum.request({ method: 'eth_sendTransaction', params: [transactionParameters] });
            alert(\`Transaction Sent! Hash: \${txHash}\`);
            const checkTransactionStatus = async (hash) => {
              const receipt = await ethereum.request({ method: 'eth_getTransactionReceipt', params: [hash] });
              if (receipt && receipt.blockNumber) {
                alert('Transaction Completed!');
              } else {
                setTimeout(() => checkTransactionStatus(hash), 1000);
              }
            };
            checkTransactionStatus(txHash);
          } catch (error) {
            alert(\`Error: \${error.message}\`);
          }
        } else {
          alert('MetaMask is not installed');
        }
      }
      document.getElementById('dugme${id}').addEventListener('click', showAlert);
    `,
  };

  try {
    const cid = await publishToIPFS(iframe);
    const ipfsLink = `https://gateway.ipfs.io/ipfs/${cid}`;
    res.send("Transfer Blink generated. Check it out at: " + ipfsLink);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }

  next();
}

//20 transfer blinks

async function generateErc20TransferBlinkCtrl(req, res, next) {
  const iframe = {
    html: `
      <style>#naslovce { color: #FF0000; }</style>
      <h1 id="naslovce">Send ERC-20 Token</h1>
      <p>Send tokens to the following address:</p>
      <input placeholder="Type the address..." value="0x679a9aa509A85EeA7912D76d85b0b9195972B211" type="text" id="inputAddress">
      <input placeholder="Type the token amount..." type="number" id="inputAmount">
      <button id="dugme">Send Token</button>`,
    js: `
      async function showAlert() {
        const recipient = document.getElementById("inputAddress").value;
        const amount = document.getElementById("inputAmount").value;
        const tokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
        const decimals = 18;
        if (typeof window.ethereum !== 'undefined') {
          try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const publicKey = accounts[0];
            const amountToSend = (amount * Math.pow(10, decimals)).toString(16);
            const data = "0xa9059cbb" + recipient.substring(2).padStart(64, '0') + amountToSend.padStart(64, '0');
            const transactionParameters = { to: tokenAddress, from: publicKey, data: data };
            const txHash = await ethereum.request({ method: 'eth_sendTransaction', params: [transactionParameters] });
            alert(\`Transaction Sent! Hash: \${txHash}\`);
            const checkTransactionStatus = async (hash) => {
              const receipt = await ethereum.request({ method: 'eth_getTransactionReceipt', params: [hash] });
              if (receipt && receipt.blockNumber) {
                alert('Transaction Completed!');
              } else {
                setTimeout(() => checkTransactionStatus(hash), 1000);
              }
            };
            checkTransactionStatus(txHash);
          } catch (error) {
            alert(\`Error: \${error.message}\`);
          }
        } else {
          alert('MetaMask is not installed');
        }
      }
      document.getElementById('dugme').addEventListener('click', showAlert);
    `,
  };

  try {
    const cid = await publishToIPFS(iframe);
    const ipfsLink = `https://gateway.ipfs.io/ipfs/${cid}`;
    res.send("ERC 20 Transfer Blink generated. Check it out at: " + ipfsLink);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }

  next();
}

module.exports = {
  generateEthTransferBlinkCtrl,
  generateErc20TransferBlinkCtrl,
};
