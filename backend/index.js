require('dotenv').config();
const Web3 = require('web3');
const express = require('express');
const app = express();
const port = 5000;

const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);

app.get('/balance/:address', async (req, res) => {
  const address = req.params.address;
  try {
    if (!web3.utils.isAddress(address)) {
      throw new Error('Invalid address');
    }
    const balance = await web3.eth.getBalance(address);
    res.send({ address, balance: web3.utils.fromWei(balance, 'ether') });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
