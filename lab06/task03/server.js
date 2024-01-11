const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname === '/') {
        fs.readFile('index.html', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error: cannot read html file');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
        });
  } else if (pathname === '/z' || pathname === '/o') {
        const a = parseFloat(parsedUrl.query.a);
        const b = parseFloat(parsedUrl.query.b);

        if (isNaN(a) || isNaN(b)) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Bad Request: Invalid numbers');
        return;
        }

        let result;

        if (pathname === '/z') {
        result = a + b;
        } else {
        result = a - b;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ result }));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});