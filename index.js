const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

const roteador = {};
roteador.hello = function (data, callback) {
    callback(200, 'Hello World!');
};

roteador.echopayload = require('./echopayload').echopayload;

roteador.notFound = function (data, callback) {
    callback(404,listaDeRotas(roteador));
};

function listaDeRotas(roteador) {
    let rotas = Object.keys(roteador);
    let links = '';
    for (rota of rotas) {
        links += `<a href='${rota}'>${rota}</a><br>`;
    }
    return links;
}

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
        if (Object.keys(roteador).includes(trimmedPathName)) {
            return roteador[trimmedPathName];
        }
        return roteador.notFound;
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

