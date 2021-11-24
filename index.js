const http = require('http');
const roteador = require('./modules/roteamento').roteador;

roteador.addRota('hello', require('./modules/hello').handler);
roteador.addRota('echopayload', require('./modules/echopayload').handler);

const server = http.createServer(main);

function main(req, res) {
    roteador.addRota('', function(req, res) {
        res.end(roteador.listaRotas());
    });
    const rota = roteador.getRota(req);
    handler = roteador.handler(rota);
    handler(req, res);
}

const porta = process.env.PORT || 3000;
server.listen(porta, () => {
    console.log("Servidor onvindo na porta: ", porta);
});

