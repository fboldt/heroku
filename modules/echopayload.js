const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

exports.handler = function (req, res) {
    if (req.method.toUpperCase() == 'GET') {
        retornaFormulario(req, res);
    } else {
        retornaConteudoRequisicao(req, res);
    }
};

function getRota(req) {
    const parsedUrl = url.parse(req.url, true);
    return parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
}

function retornaFormulario(req, res) {
    const rota = getRota(req);
    const formulario = `
<!doctype html>
<html>
<body>
    <form action="${rota}" method="post">
        <input type="text" name="somefield" placeholder="some text">
        <input type="submit">
    </form>
</body>
</html>
    `;
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(formulario);
}

function retornaConteudoRequisicao(req, res) {
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', function (data) {
        buffer += decoder.write(data);
    });
    req.on('end', function () {
        buffer += decoder.end();
        res.end(buffer);
    });
}
