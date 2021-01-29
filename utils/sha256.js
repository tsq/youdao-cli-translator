const crypto = require('crypto');

module.exports = payload => {
    const hash = crypto.createHash("sha256");
    hash.update(payload);
    const code = hash.digest("hex");
    return code;
}