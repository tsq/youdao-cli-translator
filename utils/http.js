const https = require('https');

module.exports = data => {
    const options = {
        hostname: 'openapi.youdao.com',
        port: 443,
        path: '/api',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': data.length
        }
    };
    return new Promise((resolve, reject) => {

        const req = https.request(options, res => {
            let body = '';
            res.on('data', d => {
                body += d;
            });
            res.on('end', () => {
                resolve(body);
            })
        });
        req.on('error', error => {
            reject(error);
        });
        req.write(data);
        req.end();
    });
}
