const http = require('http');
const { parse } = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            console.log(result);
            res.end(`
                <!doctype html>
                <html>
                <body>
                    response: ${JSON.stringify(result)}
                <br>
                <a href="/">new request</a>
                </body>
                </html>
            `);
        });
    } 
    else {
        res.end(`
            <!doctype html>
            <html>
            <body>
                <form action="/" method="post">
                    <input type="text" name="somefield" placeholder="some text">
                    <input type="submit">
                </form>
            </body>
            </html>
        `);
    }
});
server.listen(process.env.PORT || 3000);

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}