const rota = "echopayload";
exports.echopayload = function (data, callback) {
    if (data.httpMethod == 'get') {
        retornaFormulario(callback);
    } else {
        retornaConteudoRequisicao(data, callback);
    }
};

function retornaFormulario(callback) {
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
    callback(200, formulario);
}

function retornaConteudoRequisicao(data, callback) {
    callback(200, data.payload);
}