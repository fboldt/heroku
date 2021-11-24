const StringDecoder = require('string_decoder').StringDecoder;

const rota = "echopayload";

exports.handler = function (req, res) {
    if (req.method.toUpperCase() == 'GET') {
        retornaFormulario(res);
    } else {
        retornaConteudoRequisicao(req, res);
    }
};

function retornaFormulario(res) {
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
