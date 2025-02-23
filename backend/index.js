const Web3 = require('web3');
const express = require('express');
const app = express();
const port = 5000;

const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');

app.get('/balance/:address', async (req, res) => {
  const address = req.params.address;
  try {
    const balance = await web3.eth.getBalance(address);
    res.send({ address, balance: web3.utils.fromWei(balance, 'ether') });
  } catch (error) {
    res.status(400).send({ error: 'Invalid address' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
