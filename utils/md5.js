var crypto = require('crypto');

module.exports = str => {
    return crypto.createHash('md5').update(str).digest("hex");
}