const url = require('url');

const rotas = {};

function rotaDefault(req, res) {
    res.writeHead(404, {'Content-Type': 'text/html'});
    let links = '';
    Object.keys(rotas).forEach( rota => {
        links += `<a href='${rota}'>${rota}</a><br>`;
    });
    res.end(links);
};

class Roteador {
    handler(rota) {
        if (Object.keys(rotas).includes(rota)) {
            return rotas[rota];
        }
        return rotaDefault;
    }
    getRota(req) {
        const parsedUrl = url.parse(req.url, true);
        return parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
    }
    addRota(rota, callback) {
        rotas[rota] = callback;
    }
}
exports.novoRoteador = function () {
    return new Roteador();
};
