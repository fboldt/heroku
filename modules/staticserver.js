const url = require('url');
const fs = require('fs');

exports.handler = function (req, res) {
    const path = url.parse(req.url, true).pathname.replace(/^\/+|\/+$/g, '');
    fs.readFile("static/"+path, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
};