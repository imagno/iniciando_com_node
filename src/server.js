const http = require('http');

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'Application/json' });

    if(req.url === '/produto') {
      res.end(
        JSON.stringify({
          message: 'Rota de produto'
        })
      );
    }

    if(req.url === '/usuario') {
      res.end(
        JSON.stringify({
          message: 'Rota de usuário'
        })
      );
    }
  })
  .listen(4001, () => console.log('Servidor rodando na porta 4001'));