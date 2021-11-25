const http = require('http');
const roteamento = require('./roteamento');

const roteador = roteamento.novoRoteador();

function rotearReq(req, res) {
    const rota = roteador.getRota(req);
    roteador.handler(rota)(req, res);
}

class Servidor {
    constructor() {
        this.httpServer = http.createServer(rotearReq);
    }
    ativar(porta) {
        this.httpServer.listen(porta, () => {
            console.log("Servidor onvindo na porta: ", porta);
        });
    }
    addRota(rota, callback) {
        roteador.addRota(rota, callback);
    }
}

exports.novoServidor = function () {
    return new Servidor();
};
