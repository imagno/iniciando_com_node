const http = require('http');

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'Application/json' });
    
    res.end(JSON.stringify({
      message: 'Hello Node!'
    }));
  })
  .listen(4001, () => console.log('Servidor rodando na porta 4001'));