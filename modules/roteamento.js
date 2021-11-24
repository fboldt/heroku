const url = require('url');

class Roteador {
    constructor() {
        this.rotas = {};
    }
    handler(rota) {
        if (Object.keys(this.rotas).includes(rota)) {
            return this.rotas[rota];
        }
        return function (req, res) {
            res.writeHead(404);
            res.write("Not Found");
            res.end();
        };
    }
    getRota(req) {
        const parsedUrl = url.parse(req.url, true);
        return parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
    }
    getRotas() {
        return Object.keys(this.rotas);
    }
    addRota(rota, callback) {
        this.rotas[rota] = callback;
    }
    listaRotas() {
        let links = '';
        this.getRotas().forEach( rota => {
            links += `<a href='${rota}'>${rota}</a><br>`;
        });
        return links;
    }
}
exports.roteador = new Roteador();
