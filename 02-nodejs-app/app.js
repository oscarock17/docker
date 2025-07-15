const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
  res.end('Hola desde Node.js en Docker!');
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});