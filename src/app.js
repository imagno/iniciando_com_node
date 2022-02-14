const express = require('express');
const { randomUUID } = require('crypto');
const fs = require('fs');

const app = express();

app.use(express.json());

let products = new Array;

fs.readFile('products.json', 'utf-8', (err, data) => {
  if(err) {
    console.log(err);
  } else {
    products = JSON.parse(data);
  }
});

app.post('/products', (req, res) => {
  const { name, price } = req.body;

  const product = {
    name,
    price,
    id: randomUUID()
  }
  
  products.push(product);

  fs.writeFile('products.json', JSON.stringify(products), err => {
    if(err) {
      console.log(err);
    } else {
      console.log('Produto inserido com sucesso')
    }
  });

  return res
    .json(product);
});

app.get('/products', (_, res) => {
  return res
    .json(products);
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find( product => product.id === id);

  return res
    .json(product);
});

app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const productIndex = products.findIndex(product => product.id === id);
  products[productIndex] = {
    ...products[productIndex],
    name,
    price
  }

  return res
    .json({
      message: "Produto alterado com sucesso"
    });
});

app.delete('/products/:id', (req, res) => {
  const { id } = req.params;

  const productIndex = products.findIndex(product => product.id === id);

  products.splice(productIndex, 1);

  return res
    .json({
      message: 'Produto removido com sucesso'
    });
});

app.listen(4001, () => console.log('Servidor rodando na porta 4001'));