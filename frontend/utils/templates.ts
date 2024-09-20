

interface Template {
  html: string;
  js: string;
  name: string;
}

export const templates: { [key: string]: Template } = {
  swap: {
    html: '<style>\n#dugme {\ntext-align: center;\n}\n\n.swap-naslovcek {\ntext-align: center;\n}\n.swap-card {\nborder-radius: 4px;\npadding: 10px;\nwidth: 96%;\nmin-width: 430px;\nmargin\nmin-height: 420px;\n}\n#referrerWarning {\ntext-align: center;\nmargin-right: 20%;\nmargin-left: 20%;\nborder-radius: 4px;\n}\n.swap-content {\ndisplay: flex;\nalign-items: center;\njustify-content: center;\nbackground-color: #1F1F21;\nborder-radius: 4px;\npadding: 10px;\ndisplay: flex;\nflex-direction: column;\ngap: 10px;\n}\n.swap-row {\nwidth: 100%;\ndisplay: flex;\ngap: 10px;\nalign-items: center;\n}\n.swap-select-container {\nwidth: 100%;\ndisplay: flex;\nflex-direction: column;\nflex: 1;\n}\n.select-label {\nfont-size: 12px;\ncolor: #555;\nmargin-bottom: 3px;\n}\n.input{\nwidth: 98%;\n}\n.input, .select {\ndisplay: flex;\nalign-items: center;\nbackground-color: #1F1F21;\nborder: 1px solid #ccc;\nborder-radius: 4px;\npadding: 5px;\nflex: 1;\n}\n.input img, .select img {\nwidth: 24px;\nheight: 24px;\nmargin-right: 8px;\n}\ninput, select {\nborder: none;\nbackground-color: transparent;\nfont-size: 14px;\nwidth: 100%;\npadding: 5px;\n}\nselect {\nappearance: none;\n-moz-appearance: none;\n-webkit-appearance: none;\nbackground: transparent;\ncursor: pointer;\n}\ninput::-webkit-outer-spin-button,\ninput::-webkit-inner-spin-button {\n-webkit-appearance: none;\nmargin: 0;\n}\ninput[type=\"number\"] {\n-moz-appearance: textfield;\n}\n@keyframes gradient-animation {\n0% { background-position: 100% 0; }\n100% { background-position: -100% 0; }\n}\nbutton {\nbackground-color: #1da1f2;\ncolor: white;\nborder: none;\npadding: 12px 20px;\nborder-radius: 4px;\nfont-size: 16px;\nfont-weight: bold;\ncursor: pointer;\nwidth: 100%;\ntransition: background-color 0.3s ease;\n}\nbutton:disabled {\ncursor: not-allowed;\n}\nbutton.loading {\nbackground-image: linear-gradient(\n90deg,\n#0099ff 0%, /* Brighter blue */\n#ff66cc 50%, /* Vibrant pink for contrast */\n#0099ff 100% /* Brighter blue */\n);\nbackground-size: 200% 100%;\nanimation: gradient-animation 1s linear infinite; /* Increase speed to 1s */\n}\nbutton.success {\nbackground-color: #4CAF50;\n}\n.swap-checkmark {\ncolor: white;\nfont-size: 24px;\nmargin-right: 8px;\n}\n.my-banner{\nwidth: 70%;\ndisplay: flex;\nflex-direction: row;\njustify-content: space-around;\nalign-items: center;\nmargin: auto;\nmargin-bottom: -10px;\n}\n#expectedOutputAmount{\ntext-align: center;\n}\n\n</style>\n<div class=\"swap-card\">\n<div class=\"my-banner\">\n</div>\n<div class=\"swap-content\">\n<div class=\"swap-row\">\n<div class=\"swap-select-container\">\n<div class=\"select-label\">From Token</div>\n<div class=\"select\">\n<img\nsrc=\"https://cryptologos.cc/logos/ethereum-eth-logo.png\"\nalt=\"From Token\"\n/>\n<select id=\"fromTokenS\">\n<option id=\"tokenDAI\" value=\"DAI\">DAI</option>\n<option id=\"tokenWETH\" value=\"WETH\">WETH</option>\n<option id=\"tokenUSDC\" value=\"USDC\">USDC</option>\n<option id=\"tokenWBTC\" value=\"WBTC\">WBTC</option>\n</select>\n</div>\n</div>\n</div>\n<div class=\"input\">\n<img\nsrc=\"https://cryptologos.cc/logos/usd-coin-usdc-logo.png\"\nalt=\"USDC\"\n/>\n<input id=\"input\" type=\"number\" placeholder=\"Input token amount\" />\n</div>\n<p id=\"expectedOutputAmount\"></p>\n<button id=\"dugme\">Buy USDC</button>\n</div>\n</div>',
    js: 'if(typeof destinationToken === \'undefined\')\nvar destinationToken;\ndestinationToken = { // HARDCODE BY GENERATOR\nname: "USDC",\naddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",\ndecimals: 6,\nimage: "https://cdn3d.iconscout.com/3d/premium/thumb/usdc-10229270-8263869.png?f=webp"\n}\n\nif(destinationToken.address==\'0x6B175474E89094C44Da98b954EedeAC495271d0F\')\ndocument.getElementById("tokenDAI")?.parentNode.removeChild(document.getElementById("tokenDAI"));\nif(destinationToken.address==\'0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2\')\ndocument.getElementById("tokenWETH")?.parentNode.removeChild(document.getElementById("tokenWETH"));\nif(destinationToken.address==\'0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48\')\ndocument.getElementById("tokenUSDC")?.parentNode.removeChild(document.getElementById("tokenUSDC"));\nif(destinationToken.address==\'0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599\')\ndocument.getElementById("tokenWBTC")?.parentNode.removeChild(document.getElementById("tokenWBTC"));\n\nif(typeof sourceTokens === \'undefined\')\nvar sourceTokens;\n\nsourceTokens = {\n"DAI": {\naddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",\ndecimals: 18\n},\n"WETH": {\naddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",\ndecimals: 18\n},\n"USDC": {\naddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",\ndecimals: 6\n},\n"WBTC": {\naddress: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",\ndecimals: 8\n},\n}\nif(typeof referrer === \'undefined\')\nvar referrer;\nreferrer = null\nif(!referrer){\ndocument.getElementById("referrerWarning").style.display = \'none\';\n}\n\ndocument.getElementById("naslovchek").innerHTML = "Buy "+ destinationToken.name + " on UniswapV2";\nconsole.log(\'USDC Bridge\');\ndocument.getElementById("fromTokenS").addEventListener(\'click\', function(event) {\nevent.stopPropagation();\n});\n\nasync function doSwap() {\nconst dugme = document.getElementById("dugme")\nconst amount = document.getElementById("input").value;\nconst expectedOutputAmountP = document.getElementById("expectedOutputAmount");\nif (!amount) {\nexpectedOutputAmountP.innerText = "Please enter an amount.";\nreturn;\n}\n\n// UniswapV2 Router contract address\nconst uniswapV2RouterAddress = "0x83eafF3C19083B03A8E0708F7637D0c4638E9FC9";\n\n// ABI for UniswapV2 Router swapExactTokensForTokens function\nconst swapExactTokensForTokensAbi = [\n{\n"type": "constructor",\n"inputs": [\n{\n"name": "router",\n"type": "address",\n"internalType": "contract IUniswapV2Router"\n}\n],\n"stateMutability": "nonpayable"\n},\n{\n"type": "function",\n"name": "swapWithReferral",\n"inputs": [\n{\n"name": "referrer",\n"type": "address",\n"internalType": "address"\n},\n{\n"name": "amountIn",\n"type": "uint256",\n"internalType": "uint256"\n},\n{\n"name": "amountOutMin",\n"type": "uint256",\n"internalType": "uint256"\n},\n{\n"name": "path",\n"type": "address[]",\n"internalType": "address[]"\n},\n{\n"name": "",\n"type": "address",\n"internalType": "address"\n},\n{\n"name": "deadline",\n"type": "uint256",\n"internalType": "uint256"\n}\n],\n"outputs": [\n{\n"name": "amounts",\n"type": "uint256[]",\n"internalType": "uint256[]"\n}\n],\n"stateMutability": "nonpayable"\n},\n{\n"type": "event",\n"name": "ReferralShare",\n"inputs": [\n{\n"name": "amount",\n"type": "uint256",\n"indexed": false,\n"internalType": "uint256"\n},\n{\n"name": "referrer",\n"type": "address",\n"indexed": false,\n"internalType": "address"\n},\n{\n"name": "referee",\n"type": "address",\n"indexed": false,\n"internalType": "address"\n},\n{\n"name": "timestamp",\n"type": "uint256",\n"indexed": false,\n"internalType": "uint256"\n}\n],\n"anonymous": false\n}\n];\n\ntry {\nconst selectedTokenName = document.getElementById("fromTokenS").value;\nconst selectedToken = sourceTokens[selectedTokenName];\nconst fromToken = selectedToken.address;\nconst fromDecimals = selectedToken.decimals;\ndugme.disabled = true;\ndugme.classList.add(\'loading\');\ndugme.innerHTML = \'Executing swap...\';\n\nawait ethereum.request({ method: \'eth_requestAccounts\' });\nconst provider = new ethers.providers.Web3Provider(window.ethereum);\nconst signer = provider.getSigner();\nconst fromAddress = await signer.getAddress();\nconst uniswapV2Router = new ethers.Contract(uniswapV2RouterAddress, swapExactTokensForTokensAbi, signer);\nconst amountInWei = ethers.utils.parseUnits(amount, fromDecimals);\nconsole.log("OVOLIKO USDT")\nconsole.log(amountInWei)\nconst path = [fromToken, destinationToken.address];\nconst deadline = Math.floor(Date.now() / 1000) + 1200;\nconst amountOutMin = 0;\nconst fromTokenContract = new ethers.Contract(fromToken, [\n"function approve(address spender, uint256 amount) public returns (bool)"\n], signer);\nconst approvalTx = await fromTokenContract.approve(uniswapV2RouterAddress, amountInWei);\nawait approvalTx.wait();\n\nconst swapTx = await uniswapV2Router.swapWithReferral(\nreferrer || "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",\namountInWei,\namountOutMin,\npath,\n"0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",\ndeadline\n);\nconst receipt = await swapTx.wait();\n\n\ndugme.classList.remove(\'loading\');\ndugme.classList.add(\'success\');\ndugme.innerHTML = \'<span class="swap-checkmark">✓</span> Swap Successful\';\n\nsetTimeout(() => {\ndugme.disabled = false;\ndugme.classList.remove(\'success\');\ndugme.innerHTML = \'Buy USDC\';\n}, 3000);\n} catch (error) {\nconsole.error(error);\nexpectedOutputAmountP.innerText = `Error: ${error.message}`;\n\ndugme.disabled = false;\ndugme.classList.remove(\'loading\');\ndugme.innerHTML = \'Buy USDC\';\n}\n\n}\n\nfunction debounce(func, delay) {\n\nif(document.getElementById("input").value){\nconst expectedOutputAmountP = document.getElementById("expectedOutputAmount");\nexpectedOutputAmountP.innerText = "Getting a quote...";\n}\n\nlet timeoutId;\nreturn function(...args) {\nif (timeoutId) {\nclearTimeout(timeoutId);\n}\ntimeoutId = setTimeout(() => {\nfunc.apply(this, args);\n}, delay);\n};\n}\n\nasync function updateAmount(event) {\nconst amount = this.value;\nconst expectedOutputAmountP = document.getElementById("expectedOutputAmount");\nif (!amount) {\nexpectedOutputAmountP.innerText = "";\nreturn;\n}\nexpectedOutputAmountP.innerText = "Getting a quote...";\n\n// UniswapV2 Router contract address\nconst uniswapV2RouterAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";\n\n// ABI for UniswapV2 Router (only the functions you need)\nconst uniswapV2RouterAbi = [\n"function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)"\n];\n\n// Tokens\nconst selectedTokenName = document.getElementById("fromTokenS").value;\nconst selectedToken = sourceTokens[selectedTokenName];\nconst fromToken = selectedToken.address;\nconst fromDecimals = selectedToken.decimals;\n\ntry {\n// Connect to Ethereum using ethers.js and MetaMask provider\nawait ethereum.request({ method: \'eth_requestAccounts\' });\nconst provider = new ethers.providers.Web3Provider(window.ethereum);\nconst signer = provider.getSigner();\nconst uniswapV2Router = new ethers.Contract(uniswapV2RouterAddress, uniswapV2RouterAbi, signer);\n\n// Convert amount to wei\nconst amountInWei = ethers.utils.parseUnits(amount, fromDecimals);\n\n// Define the path for the swap\nconst path = [fromToken, destinationToken.address];\n\n// Get the expected output amount\nconst amountsOut = await uniswapV2Router.getAmountsOut(amountInWei, path);\nconst expectedOutputAmount = ethers.utils.formatUnits(amountsOut[1], destinationToken.decimals);\n\n// Update the UI\nexpectedOutputAmountP.innerText = "~" + expectedOutputAmount + " USDC";\n} catch (error) {\nconsole.error(error);\nexpectedOutputAmountP.innerText = "Error fetching expected output amount";\n}\n}\n\ndocument.getElementById("dugme").addEventListener(\'click\', doSwap);\ndocument.getElementById("input").addEventListener(\'keyup\', debounce(updateAmount, 200));',
    name: "Swap Template",
  },
  bridge: {
    html: '<style>\n.bridge-card {\nbackground-color: #1F1F21;\nborder-radius: 4px;\npadding: 10px;\nwidth: 100%;\nbox-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\nalign-self: center;\nmin-width: 350px;\n}\n.bridge-card img {\nwidth: 100%;\nheight: auto;\nmax-height: 250px;\n min-width: 340px\nobject-fit: contain;\nborder-radius: 4px;\nmargin-bottom: 10px;\n}\n.bridge-content {\nbackground-color: #1F1F21;\nborder-radius: 4px;\npadding: 10px;\ndisplay: flex;\nflex-direction: column;\ngap: 10px;\n}\n.bridge-row {\ndisplay: flex;\ngap: 10px;\nalign-items: center;\n}\n.bridge-select-container {\ndisplay: flex;\nflex-direction: column;\nflex: 1;\n}\n.bridge-select-label {\nfont-size: 12px;\ncolor: #555;\nmargin-bottom: 3px;\n}\n.bridge-input, .bridge-select {\ndisplay: flex;\nalign-items: center;\nbackground-color: #1F1F21;\nborder: 1px solid #ccc;\nborder-radius: 4px;\npadding: 5px;\nflex: 1;\n}\n.bridge-input img, .bridge-select img {\nwidth: 24px;\nheight: 24px;\nmargin-right: 8px;\n}\ninput, select {\nborder: none;\nbackground-color: transparent;\nfont-size: 14px;\nwidth: 100%;\npadding: 5px;\n}\nselect {\nappearance: none;\n-moz-appearance: none;\n-webkit-appearance: none;\nbackground: transparent;\ncursor: pointer;\n}\ninput::-webkit-outer-spin-button,\ninput::-webkit-inner-spin-button {\n-webkit-appearance: none;\nmargin: 0;\n}\ninput[type="number"] {\n-moz-appearance: textfield;\n}\n@keyframes gradient-animation {\n0% { background-position: 100% 0; }\n100% { background-position: -100% 0; }\n}\nbutton {\nbackground-color: #015FF9;\ncolor: #1F1F21;\nborder: none;\npadding: 12px 20px;\nborder-radius: 4px;\nfont-size: 16px;\nfont-weight: bold;\ncursor: pointer;\nwidth: 100%;\ntransition: background-color 0.3s ease;\ndisplay: flex;\nalign-items: center;\njustify-content: center;\n}\nbutton:disabled {\ncursor: not-allowed;\n}\nbutton.loading {\nbackground-image: linear-gradient(90deg, #0099ff 0%, #ff66cc 50%, #0099ff 100%);\nbackground-size: 200% 100%;\nanimation: gradient-animation 1s linear infinite;\n}\nbutton.success {\nbackground-color: #4CAF50;\n}\n.checkmark {\ncolor: #1F1F21;\nfont-size: 24px;\nmargin-right: 8px;\n}\n</style>\n<div class="bridge-card">\n<div class="bridge-content">\n<div class="bridge-row">\n<div class="bridge-select-container">\n<div class="bridge-select-label">From Network</div>\n<div class="bridge-select">\n<img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" alt="From Network"/>\n<select id="fromNetwork">\n<option value="eth">Ethereum</option>\n<option value="avax">Avalanche</option>\n<option value="bsc">Binance Smart Chain</option>\n</select>\n</div>\n</div>\n<div class="bridge-select-container">\n<div class="bridge-select-label">To Network</div>\n<div class="bridge-select">\n<img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" alt="To Network"/>\n<select id="toNetwork">\n<option value="eth">Ethereum</option>\n<option value="avax">Avalanche</option>\n<option value="bsc">Binance Smart Chain</option>\n</select>\n</div>\n</div>\n</div>\n<div class="bridge-input">\n<img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" alt="USDC"/>\n<input id="amountInput" type="number" placeholder="Amount"/>\n</div>\n<button id="bridgeButton">Bridge USDC</button>\n</div>\n</div>',
    js: "console.log('USDC Bridge');\ndocument.getElementById('fromNetwork').addEventListener('click', function(event) {\nevent.stopPropagation();\n});\ndocument.getElementById('toNetwork').addEventListener('click', function(event) {\nevent.stopPropagation();\n});\ndocument.getElementById('bridgeButton').addEventListener('click', async () => {\nconst button = document.getElementById('bridgeButton');\nconst fromNetwork = document.getElementById('fromNetwork').value;\nconst toNetwork = document.getElementById('toNetwork').value;\nconst amount = document.getElementById('amountInput').value;\nbutton.disabled = true;\nbutton.classList.add('loading');\nbutton.innerHTML = 'Bridging...';\nawait new Promise(resolve => setTimeout(resolve, 5000));\nbutton.classList.remove('loading');\nbutton.classList.add('success');\nbutton.innerHTML = '<span class=\"checkmark\">✓</span> Bridging Successful';\nsetTimeout(() => {\nbutton.disabled = false;\nbutton.classList.remove('success');\nbutton.innerHTML = 'Bridge USDC';\n}, 3000);\nconsole.log(`Bridged ${amount} USDC from ${fromNetwork} to ${toNetwork}`);\n});",
    name: "Bridge Template",
  },
  donation: {
    html: '<style>\n.card {\nposition: relative; \n padding-top: 100px\nbackground-color: #1F1F21;\nborder-radius: 4px;\npadding: 10px;\nwidth: 100%;\nmax-width: 600px;\nbox-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\nmargin-top: -20px;\n}\n.card img {\nwidth: 100%;\nmax-width: 600px;\nheight: auto;\n min-width: 340px  object-fit: cover;\nborder-radius: 4px;\nmargin-bottom: -5px;\n}\n.content {\nbackground-color: #1F1F21;\nborder-radius: 4px;\npadding: 10px;\ndisplay: flex;\nflex-direction: column;\ngap: 5px;\nmargin-top: 5px;\n}\n.input {\ndisplay: flex;\nalign-items: center;\nbackground-color: #1F1F21;\nborder: 1px solid #ccc;\nborder-radius: 4px;\npadding: 8px;\ngap: 5px;\n}\n.input img {\nwidth: 24px;\nheight: 24px;\n}\ninput[type=\'number\'] {\nborder: none;\nbackground-color: transparent;\nfont-size: 16px;\nflex: 1;\npadding: 8px;\n}\nbutton {\nbackground-color: #015FF9;\ncolor: #1F1F21;\nborder: none;\npadding: 10px 18px;\nborder-radius: 4px;\nfont-size: 14px;\nfont-weight: bold;\ncursor: pointer;\nwidth: 100%;\ntransition: background-color 0.3s ease;\ndisplay: flex;\nalign-items: center;\njustify-content: center;\n}\nbutton:hover {\nbackground-color: #0f8de8;\n}\nbutton:disabled,\n.predefined-button:disabled {\ncursor: not-allowed;\nbackground-color: #ccc;\n}\nbutton.loading,\n.predefined-button.loading {\nbackground-image: linear-gradient(90deg, #0099ff 0%, #ff66cc 50%, #0099ff 100%);\nbackground-size: 200% 100%;\nanimation: gradient-animation 1s linear infinite;\n}\nbutton.success {\nbackground-color: #4caf50;\n}\n.checkmark {\ncolor: #1F1F21;\nfont-size: 24px;\nmargin-right: 8px;\n}\n.predefined-buttons {\ndisplay: flex;\njustify-content: space-between;\nmargin-top: 10px;\n}\n.predefined-button {\nflex: 1;\nmargin: 0 5px;\n}\n\n@keyframes gradient-animation {\n0% {\nbackground-position: 100% 0;\n}\n100% {\nbackground-position: -100% 0;\n}\n}\n</style>\n<div class="card">\n<div class="content">\n<div class="input">\n<img src="https://etherscan.io/token/images/apecoin_32.png" alt="APE" />\n<input id="donationAmount" type="number" placeholder="Enter donation amount" />\n</div>\n<button id="donateButton">Donate APE</button>\n<div class="predefined-buttons">\n<button class="predefined-button" value="10"">Donate 10 APE</button>\n<button class="predefined-button" value="50">Donate 50 APE</button>\n<button class="predefined-button" value="100">Donate 100 APE</button>\n</div>\n</div>\n</div>',
    js: "const predefinedButtons = document.querySelectorAll('.predefined-button')\nconst donationAmountInput = document.getElementById('donationAmount')\nconst mainButton = document.getElementById('donateButton')\n\n// Function to set predefined donation amounts and handle button states\nfunction setAmount(amount, clickedButton) {\ndonationAmountInput.value = amount\n\npredefinedButtons.forEach((button) => {\nbutton.disabled = true\n})\n\nmainButton.classList.add('loading')\nmainButton.disabled = true\nmainButton.innerHTML = 'Donating...'\n}\n\nasync function sendDonation(amount) {\nconst recipient = '0x53FA684bDd93da5324BDc8B607F8E35eC79ccF5A'\nconst tokenAddress = '0x4d224452801ACEd8B2F0aebE155379bb5D594381' // replace with token address\nconst decimals = 18 // replace with token decimals\nif (typeof window.ethereum !== 'undefined') {\ntry {\nconsole.log('Sending transaction')\nconst accounts = await ethereum.request({ method: 'eth_requestAccounts' })\nconst publicKey = accounts[0]\nconst amountToSend = (amount * Math.pow(10, decimals)).toString(16)\n\nconsole.log(amountToSend)\n\nconst data = '0xa9059cbb' + recipient.substring(2).padStart(64, '0') + amountToSend.padStart(64, '0')\nconst transactionParameters = {\nto: tokenAddress,\nfrom: publicKey,\ndata: data,\n}\n\nconsole.log(transactionParameters)\n\nconst txHash = await ethereum.request({\nmethod: 'eth_sendTransaction',\nparams: [transactionParameters],\n})\n\nconst checkTransactionStatus = async (hash) => {\nconst receipt = await ethereum.request({\nmethod: 'eth_getTransactionReceipt',\nparams: [hash],\n})\nif (receipt && receipt.blockNumber) {\npredefinedButtons.forEach((button) => {\nbutton.disabled = false\nbutton.classList.remove('loading')\n})\nmainButton.classList.remove('loading')\nmainButton.classList.add('success')\nmainButton.innerHTML = '<span class=\"checkmark\">✓</span> Donation Successful'\nsetTimeout(() => {\nmainButton.classList.remove('success')\nmainButton.disabled = false\nmainButton.innerHTML = 'Donate USDC'\n}, 3000)\n} else {\nsetTimeout(() => checkTransactionStatus(hash), 1000)\n}\n}\n\ncheckTransactionStatus(txHash)\n} catch (error) {\nconsole.error(error)\n}\n} else {\nalert('MetaMask is not installed')\n}\n}\n\ndocument.getElementById('donateButton').addEventListener('click', async () => {\nconst button = document.getElementById('donateButton')\nconst amount = document.getElementById('donationAmount').value\n\n// Validate input\nif (isNaN(amount) || amount <= 0) {\nalert('Please enter a valid donation amount.')\nreturn\n}\n\n// Disable the button and add loading class\nbutton.disabled = true\nbutton.classList.add('loading')\nbutton.innerHTML = 'Donating...'\n\n// Simulate a delay for the donation process\n// Send the donation to the blockchain\nsendDonation(amount)\nawait new Promise((resolve) => setTimeout(resolve, 3000)) // Simulate a 3 seconds delay\n\n// Show success message\nbutton.disabled = false\nbutton.classList.remove('loading')\nbutton.classList.add('success')\nbutton.innerHTML = '<span class=\"checkmark\">✓</span> Donation Successful'\n\n// Reset button after 3 seconds\nsetTimeout(() => {\nbutton.classList.remove('success')\nbutton.innerHTML = 'Donate USDC'\n}, 3000)\n\nconsole.log('Donated USDC')\n})\npredefinedButtons.forEach((button) => {\nbutton.addEventListener('click', () => {\nsetAmount(button.value, button)\nconst amount = document.getElementById('donationAmount').value\nsendDonation(amount)\n})\n})",
    name: "Donation Template",
  },
};

