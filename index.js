const servidor = require('./modules/servidor');

const app = servidor.novoServidor();

app.addRota('hello', require('./modules/hello').handler);
app.addRota('echopayload', require('./modules/echopayload').handler);

const porta = process.env.PORT || 3000;
app.ativar(porta);
