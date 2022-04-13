const http = require('http');
const roteamento = require('./roteamento');

exports.novoServidor = function () {
    return new Servidor();
};

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
            if (this.httpServer.address().address == "::") {
                console.log(`http://127.0.0.1:${porta}`);
            } else {
                console.log(`http://${this.httpServer.address().address}:${porta}`);
            }
        });
    }
    addRota(rota, callback) {
        roteador.addRota(rota, callback);
    }
}
