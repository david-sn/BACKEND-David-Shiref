const crypto = require('crypto');

// Create hash and salt for the password using Password Based Key Derivative Function 2 (PBKDF2)
function hashPassword (password) {
    if (!password) {
        return { salt: undefined, hash: undefined };
    }
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('base64');
    return { salt: salt, hash: hash };
}

// Verify if the stored hash and salt match the given password
function verifyHash (password, originalHash, salt) {
    const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('base64');
    return hash === originalHash;
}

module.exports = {
    hashPassword,
    verifyHash
};
