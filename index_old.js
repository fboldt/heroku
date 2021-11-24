const http = require('http');
const { parse } = require('querystring');

const formulario = `
<!doctype html>
<html>
<body>
    <h1>Francisco de Assis Boldt</h1>
    <form action="/" method="post">
        <input type="text" name="somefield" placeholder="some text">
        <input type="submit">
    </form>
</body>
</html>
`;

function mostraDadosFormulario(req, res) {
    collectRequestData(req, result => {
        console.log(result);
        res.end(`
                <!doctype html>
                <html>
                <body>
                    response: ${JSON.stringify(result)}
                <br>
                <a href="/">new request</a>
                </body>
                </html>
            `);
    });

}

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        mostraDadosFormulario(req, res);
    }
    else {
        console.log(req.method.toLowerCase());
        res.end(formulario);
    }
});

const porta = process.env.PORT || 3000;
server.listen(porta, () => {
    console.log("Servidor onvindo na porta: ", porta);
});

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if (request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            const result = parse(body);
            callback(result);
        });
    }
    else {
        callback(null);
    }
}