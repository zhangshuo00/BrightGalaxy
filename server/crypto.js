const crypto = require('crypto');

function getShaKey(data){
    return crypto.createHash('sha1').update(data, 'utf8').digest('hex');
}

module.exports = getShaKey;