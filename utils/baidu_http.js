const https = require('https');

module.exports = qs => {
    return new Promise((resolve, reject) => {
        const req = https.get('https://api.fanyi.baidu.com/api/trans/vip/translate?' + qs, res => {
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
    });
}