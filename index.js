/*
 * Ativa servidor
*/

const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

const server = http.createServer(main);

function main(req, res) {

    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', function (data) {
        buffer += decoder.write(data);
    });

    req.on('end', function () {
        buffer += decoder.end();

        const data = getData(req);
        data['payload'] = buffer;
        const chosenHandler = getHandler(data['trimmedPathName']);

        chosenHandler(data, function (statusCode, payload) {
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
            payload = typeof (payload) !== 'undefined' ? payload : {};
            const payloadString = typeof (payload) == 'string' ? payload : JSON.stringify(payload);
            res.writeHead(statusCode);
            res.end(payloadString);
        });

    });

    // Funções auxiliares
    function getHandler(trimmedPathName) {
        if (Object.keys(handlers).includes(trimmedPathName)) {
            return handlers[trimmedPathName];
        }
        return handlers.notFound;
    }
    function getData(req) {
        const data = {};
        const parsedUrl = url.parse(req.url, true);
        data['trimmedPathName'] = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
        data['queryStringObject'] = JSON.stringify(parsedUrl.query);
        data['httpMethod'] = req.method.toLowerCase();
        data['httpHeaders'] = JSON.stringify(req.headers);
        return data;
    }
}

const porta = process.env.PORT || 3000;
server.listen(porta, () => {
    console.log("Servidor onvindo na porta: ", porta);
});


const handlers = {};

handlers.sample = function (data, callback) {
    callback(406, { 'name': 'sample handler' });
};

handlers.formulario = function (data, callback) {
    const formulario = `
<!doctype html>
<html>
<body>
    <form action="/" method="post">
        <input type="text" name="somefield" placeholder="some text">
        <input type="submit">
    </form>
</body>
</html>
`;
    callback(200, formulario);
};

handlers.notFound = function (data, callback) {
    let rotas = Object.keys(handlers);
    rotas.pop('notFound');
    let links = '';
    for (rota of rotas) {
        links += `<a href='${rota}'>${rota}</a><br>`;
    }
    callback(404,links);
};
