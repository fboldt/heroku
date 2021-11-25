const servidor = require('./modules/servidor');
const hello = require('./modules/hello');
const echopayload = require('./modules/echopayload');

const app = servidor.novoServidor();

app.addRota('hello', hello.handler);
app.addRota('echopayload', echopayload.handler);

const porta = process.env.PORT || 3000;
app.ativar(porta);
